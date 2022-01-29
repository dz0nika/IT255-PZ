import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup
  emailInfoValue = ''
  passwordInfoValue = ''
  rePasswordInfoValue = ''

  constructor(private formBuidler: FormBuilder, private router: Router, private userService: UserService) {
    this.signUpForm = this.formBuidler.group({
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      re_password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      this.clearInfo()
      if (this.signUpForm.get("password")?.value === this.signUpForm.get("re_password")?.value) {
        let user = {
          email: this.signUpForm.get("email")?.value,
          username: this.signUpForm.get("username")?.value,
          password: this.signUpForm.get("password")?.value
        }
        this.userService.signup(user).subscribe(result => {
          if (result.message == "Successfully registered!") {
            this.router.navigate(["/signin"])
          } else {
            this.emailInfoValue= result.message
          }
        })
      } else {
        this.rePasswordInfoValue = "Passwords don't match."
      }
    }
  }

  clearInfo(): void {
    this.emailInfoValue= ''
    this.passwordInfoValue = ''
    this.rePasswordInfoValue = ''
  }

}
