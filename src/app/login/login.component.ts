import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { 
  Validators,
  FormsModule,
  FormControl,
  FormBuilder,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/auth-model';
import { AuthService } from '../auth-service';
import { HttpService } from '../http-service';
import { LOGIN_URL } from '../../utils/constanturls';
import { apptitle } from '../../utils/appsettings';
import { error } from 'console';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule, 
    MatSlideToggleModule, 
    MatButtonModule,
    MatCardModule, 
    MatInputModule, 
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    ForgotpasswordComponent
  ],
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  emailFormControl = new FormControl('', 
    [
      Validators.required, 
      Validators.email
    ]);

  passwordControl = new FormControl('', 
    [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$')
    ]);

  matcher = new MyErrorStateMatcher();

  errorMessage: string = '';
  successMessage: string = '';
  passwordinput:string = 'password';
  passwordicon:string = 'visibility';
  page:string = "LOGIN";
  appTitle:string = apptitle;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      userid: this.emailFormControl,
      password: this.passwordControl
    });
   }

   ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      console.log(this.loginForm.value.userid);
      console.log(this.loginForm.value.password);

      const loginRequest: LoginRequest = {
        userid: this.loginForm.value.userid,
        password: this.loginForm.value.password
      };
      
      // this.authService.login(loginRequest).subscribe({
      //   next: (response) => {
      //     console.log('Login successful', response);
      //     this.router.navigate(['/dashboard']);
      //     // Handle successful login (e.g., storing token, redirecting)
      //   },
      //   error: (error) => {
      //     this.errorMessage = 'Login failed. Please try again.';
      //     console.error('Login error:', error);
      //   }
      // });

      // this.httpService.post(LOGIN_URL, loginRequest).subscribe({
      //   next:(response) => {
      //     console.log(response);
      //   },
      //   error:(error) => {
      //     console.log(error);
      //   }
      // })

      this.router.navigate(['/portal']);
    }

    // if (this.loginForm.valid) {
    //   const formData = this.loginForm.value;
    //   this.authService.login(formData).subscribe({
    //     next: (response) => {
    //       console.log('Login successful', response);
    //       // Handle successful login (e.g., storing token, redirecting)
    //     },
    //     error: (error) => {
    //       this.errorMessage = 'Login failed. Please try again.';
    //       console.error('Login error:', error);
    //     }
    //   });
    // } else {
    //   this.errorMessage = 'Please fill all required fields correctly.';
    // }
  }
}
