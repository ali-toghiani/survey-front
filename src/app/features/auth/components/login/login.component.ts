import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {Subscription} from "rxjs";

import {RoutesEnum} from "@enums";
import {TokenService} from "@services";
import {AuthHttpService} from "../../services/auth-http.service";
import {SignInReqModel} from "../../models/auth-shared.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoadingSubmitBtn= false;
  subscriptions = new Subscription();

  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    remember: new FormControl(true)
  })

  constructor(
    private authService: AuthHttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenSerice: TokenService
  ) {}

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.queryParams as {username:string, password:string};
    if (routeParams){
      this.loginForm.controls.username.setValue(routeParams.username);
      this.loginForm.controls.password.setValue(routeParams.password);
      this.submitForm();
    }
  }

  submitForm(): void {
    this.isLoadingSubmitBtn = true;
    const loginData: SignInReqModel = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.subscriptions.add(
      this.authService.signIn(loginData).subscribe(
        {
          next: loginRes => {
            this.isLoadingSubmitBtn = false;
            if(loginRes.success){
              this.tokenSerice.setToken(loginRes.data.access_token);
              this.router.navigate([RoutesEnum.DASHBOARD]);
            }
          },
          error: err => {
            this.isLoadingSubmitBtn = false;
          }
        }
      )
    )
  }

}
