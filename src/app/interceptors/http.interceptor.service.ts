import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, filter, map, Observable, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../interfaces/IUser.modal";

@Injectable()
export class DataInterceptor implements HttpInterceptor {
    
    constructor(private authService:AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
        return this.authService.user$.asObservable()
        .pipe(
            exhaustMap((user:User) => {                                  
                let newReq = req         
                if(user && user.token) {
                    let params = new HttpParams()
                    newReq = req.clone({
                    params: params.set('auth',(user.token as string))
                })
            }
            return next.handle(newReq)
        }),
        filter((event:any) => event instanceof HttpResponse && !!event.body))
    }
    
}