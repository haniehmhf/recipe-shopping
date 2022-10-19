import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { iif, Subject, takeUntil } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  loading = false;
  error = null;
  destroy$ = new Subject()
  constructor(
    private authService:AuthService,
    private router:Router,
    private cd:ChangeDetectorRef
    ) { }

  ngOnInit(): void {
  }

  changeMode() {
    this.isLoginMode =  !this.isLoginMode
  }

  onSubmit(form:NgForm) {   
    this.loading = true
    const formValue = form.value;    
    const obs$ = iif(() => this.isLoginMode,this.authService.login(formValue),this.authService.signUp(formValue))
    obs$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.router.navigate(['/recpies'])
      this.loading = false;
    }, (err) => {   
      console.log(err);
      this.error = err;
      this.loading = false;
    })
    form.reset()
  }

  ngOnDestroy() {
    this.destroy$.next('')
  }

}
