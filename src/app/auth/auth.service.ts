import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { IAuth } from '../interfaces/IAuth';
import { User } from '../interfaces/IUser.modal';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user$: any = new BehaviorSubject(null);
    timeout:any;
    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        const initUser: any = localStorage.getItem('userData')
        if (initUser) this.autoLogin(JSON.parse(initUser))
        this.user$.asObservable().subscribe((data: any) => {
            let duration = 0;            
            if (data) {
                duration = new Date(data.user.tokenExpirationDate).getTime() - new Date().getTime();                
                this.timeout = setTimeout(() => {
                    this.logout()
                }, duration)
            }
        })        
    }

    signUp(form: any) {
        return this.http
            .post<IAuth>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBap46oGZC486gKyNsEkN7KszIcgJzMcQ4',
                { ...form, returnSecureToken: true }
            )
            .pipe(catchError(this.handleError), tap((res) => this.handleUser(res)))
    }

    login(form: any) {                
        return this.http
            .post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBap46oGZC486gKyNsEkN7KszIcgJzMcQ4',
                { ...form, returnSecureToken: true }
            )
            .pipe(catchError(this.handleError), tap((res) => this.handleUser(res)));
    }

    private handleError(err: any) {
        let defMessage = 'An Unknown Error Occured!';
        if (!err && !err.error && !err.error.error && !err.error.error.message) return throwError(defMessage);

        switch (err.error.error.message) {
            case 'EMAIL_EXISTS':
                defMessage = 'This Email Exists Already';
                break;
            case 'OPERATION_NOT_ALLOWED':
                defMessage = 'Password sign-in is disabled for this project.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                defMessage =
                    'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                defMessage =
                    'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'USER_DISABLED':
                defMessage = 'The user account has been disabled by an administrator.';
                break;
            case 'INVALID_PASSWORD':
                defMessage = 'This password is Invalid';
        }

        return throwError(defMessage);
    }

    handleUser(user: any) {        
        const expDate: Date = new Date(new Date().getTime() + + user.expiresIn * 1000);
        const newUser: any = new User({
            email: user.email,
            id: user.localId,
            token: user.idToken,
            tokenExpirationDate: expDate,
        });
        this.user$.next(newUser);
        localStorage.setItem('userData', JSON.stringify(newUser))
    }

    autoLogin(data: any ) {          
        data.user = { ...data.user , tokenExpirationDate: new Date(data.user.tokenExpirationDate)}      
        const loadedUser = new User(data.user)
        this.user$.next(loadedUser)
    }

    logout() {
        this.user$.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.timeout) clearTimeout(this.timeout)
    }
}
