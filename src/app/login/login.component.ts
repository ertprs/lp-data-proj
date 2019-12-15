import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Input
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../services/login.service";
// import { Observable, interval, of } from "rxjs";
import { Router } from "@angular/router";
// import { map } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
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
    password: "",
    invalid: ""
  };

  validationMessages = {
    account: {
      required: "Account Number is required",
      minlength: "Account number must be at least 7 characters"
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
  ) {
    this.createForm();
    this.onValueChanged();
  }

  ngOnInit() {
    
  }

  createForm() {
    this.loginForm = this.fb.group({
      account: ["", [Validators.required, Validators.minLength(7)]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any): void {
    if (!this.loginForm) {
      return;
    }

    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        console.log("Form Error Own Properties: ", this.formErrors)
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
    if (data == "invalid") {
      this.validationErrorLogin = true;
      this.formErrors.invalid = "Credentials are Invalid!";
      return;
    }
  }

  async onSubmit() {
    console.log(this.loginService);

    this.loginService.login(this.loginForm.value).subscribe(
      (bearer: any) => {
        console.log(bearer);
        sessionStorage.setItem("bearer", bearer.bearer);
        sessionStorage.setItem("accountId", this.loginForm.value.account);
        this.loginForm.reset({
          account: "",
          username: "",
          password: ""
        });
        this.router.navigate(["/dashboard/engagement-history"]);
      },
      error => {
        console.log(error);
        sessionStorage.setItem("bearer", "");
        this.onValueChanged("invalid");
      }
    );
  }
}
