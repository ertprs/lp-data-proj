import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Input
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../services/login.service";
import { Observable, interval, of } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { resetFakeAsyncZone } from "@angular/core/testing";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  @Input()
  ngClass: any;
  loginForm: FormGroup;
  disabled: boolean = true;
  validationErrorLogin: boolean = false;
  loginValidationMsg: string;
  // loggedIn: boolean = false;

  formErrors = {
    account: "",
    username: "",
    password: ""
  };

  validationMessages = {
    account: {
      required: "Account Number is required"
    },
    username: {
      required: "Username is required"
    },
    password: {
      required: "Password is required"
    }
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    console.log(this.validationErrorLogin)
  }

  createForm() {
    this.loginForm = this.fb.group({
      account: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
    
  }

  onValueChanged(data?: any): void {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
    this.disabled = this.loginForm.invalid;
    // if(this.validationErrorLogin){
    //   this.loginValidationMsg = "Credentials are Invalid!"
    // }
  }

  async onSubmit() {
    console.log(this.loginService);

    this.loginService.login(this.loginForm.value).subscribe((bearer: any) => {
      console.log(bearer);
      if (typeof bearer.bearer == "string") {
        sessionStorage.setItem("bearer", bearer.bearer);
        sessionStorage.setItem("accountId", this.loginForm.value.account);
        this.loginForm.reset({
          account: "",
          username: "",
          password: ""
        });
        this.router.navigate(["/dashboard"]);
      } 
      else {
        sessionStorage.setItem("bearer", "");
        this.validationErrorLogin = true;
        this.loginValidationMsg = "Credentials are Invalid!";
      }
    },
    err => {
        sessionStorage.setItem("bearer", "");
        this.validationErrorLogin = true;
        this.loginValidationMsg = "Credentials are Invalid!";
    });
  }
}
