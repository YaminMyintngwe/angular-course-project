import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponnt {
  constructor(private authService : AuthService, private router : Router, private componentFactoryResolver : ComponentFactoryResolver) {}
  isLoginMode = true;
  isLoading = false;
  error : string = '';
  @ViewChild(PlaceholderDirective, {static: false}) alertHost : PlaceholderDirective;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form : NgForm) {
    //console.log(form.value);
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs : Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode) {
      // this.authService.login(email, password).subscribe({
      //   next : resData => {
      //     console.log(resData);
      //     this.isLoading = false;
      //   },
      //   error : errorMessage => {
      //     console.log(errorMessage);
      //     this.error = errorMessage;
      //     this.isLoading = false;
      //   }
      // })
      authObs = this.authService.login(email, password);
    } else {
      // this.authService.signup(email, password).subscribe({
      //   next : resData => {
      //     console.log(resData);
      //     this.isLoading = false;
      //   },
      //   error : errorMessage => {
      //     console.log(errorMessage);
      //     // switch (errorRes.error.error.message) {
      //     //   case 'EMAIL_EXISTS':
      //     //     this.error = 'This email exists already';
      //     // }
      //     //this.error = 'An error occured!'
      //     this.error = errorMessage;
      //     this.isLoading = false;
      //   }
      // })
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      next : resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error : errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    })

    form.reset();
  }

  onHandleError() {
    this.error = '';
  }

  private showErrorAlert(message : string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    hostViewContainerRef.createComponent(alertCmpFactory);
  }
}
