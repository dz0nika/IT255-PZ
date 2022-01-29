import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup
  emailInfoValue = ''
  passwordInfoValue = ''

  constructor(private formBuidler: FormBuilder, private router: Router, private userService: UserService) {
    this.signInForm = this.formBuidler.group({
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
  }

  signIn(): void {
    if (this.signInForm.valid) {
      this.clearInfo()
      let user = {
        email: this.signInForm.get("email")?.value,
        password: this.signInForm.get("password")?.value
      }
      this.userService.signin(user).subscribe(result => {
        if (result.user) {
          window.sessionStorage.setItem("user", JSON.stringify(result.user))
          this.router.navigate(["/home"])
        } else {
          if (result.message == "Email not found!") {
            this.emailInfoValue= result.message
          } else {
            this.passwordInfoValue = result.message
          }
        }
      })
    }
  }

  clearInfo(): void {
    this.emailInfoValue= ''
    this.passwordInfoValue = ''
  }

}
