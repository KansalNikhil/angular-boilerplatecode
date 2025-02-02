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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-forgotpassword',
    imports: [
      FormsModule, 
      MatSlideToggleModule, 
      MatButtonModule,
      MatCardModule, 
      MatInputModule, 
      MatFormFieldModule,
      ReactiveFormsModule,
      MatIconModule
    ],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
loginForm: FormGroup;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userIdFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      userid: this.emailFormControl,
      emailId: this.userIdFormControl
    });
   }

   ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      console.log(this.loginForm.value.userid);
      console.log(this.loginForm.value.emailId);
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
