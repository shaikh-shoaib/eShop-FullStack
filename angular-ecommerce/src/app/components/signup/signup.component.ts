import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  
  hide: boolean = true;
  reactiveForm!: FormGroup;
  credentials = {
    name: '',
    email: '',
    mobile: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router, private validatorService: ValidatorService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, [Validators.required, this.validatorService.noWhitespaceValidator]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobile: new FormControl(null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
    })
  }
  
  onSubmit() {
    this.credentials.name = this.reactiveForm.value.name;
    this.credentials.email = this.reactiveForm.value.email;
    this.credentials.password = this.reactiveForm.value.password;
    this.credentials.mobile = this.reactiveForm.value.mobile;

    this.authService.signup(this.credentials).subscribe(
      (response) => {
        // console.log('response,',response);
        this.toastr.success('Signup Successful')
        this.router.navigateByUrl('/login')
        // console.log('Signup Successfull!!!');
      },
      (error) => {
        this.toastr.error(error.error.text ? error.error.text : error.error)
        console.log('error, ',error);
      },
      () => {
        this.reactiveForm.reset();
      }
    );
  }
}
