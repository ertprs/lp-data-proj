import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  @Input()
  ngClass: any;
  loginForm: FormGroup;
  disabled: boolean = true;

  formErrors = {
    'account': '',
    'username': '',
    'password': ''
  };
  
  validationMessages = {
    'account': {
      'required': 'Account Number is required'
    },
    'username': {
      'required': 'Username is required'
    },
    'password': {
      'required': 'Password is required',
    }
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm()
    
  }

  createForm() {
    this.loginForm = this.fb.group({
      account: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    this.loginForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any): void {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for(const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if(control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
    this.disabled = this.loginForm.invalid;
  }

  async onSubmit(){
    console.log(this.loginService)
    this.loginService.login(this.loginForm.value)
    .subscribe((bearer: string) => {
      console.log(bearer);
      return bearer;
    },
    err => `Observer received an error`)
    console.log(this.loginForm.value)
    this.loginForm.reset({
      account: '',
      username: '',
      password: ''
    })
    this.router.navigate(['/dashboard']);
  }
}
