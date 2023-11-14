import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  hide: boolean = true;
  reactiveForm!: FormGroup;
  credentials = {
    email: '',
    password: ''
  };
  returnUrl: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      // password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), this.validatorService.noWhitespaceValidator])
      password: new FormControl('', [Validators.required])
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    console.log(this.reactiveForm.value.email);
    console.log(this.reactiveForm.value.password);
    this.credentials.email = this.reactiveForm.value.email;
    this.credentials.password = this.reactiveForm.value.password;
    console.log(this.reactiveForm.valid);

    this.authService.generateToken(this.credentials).subscribe(
      (response: any) => {
        // console.log('response,',response);
        this.toastr.success('Login Successfull');

        this.authService.logIn(response.jwtToken);
        this.router.navigate([this.returnUrl]);
        // this.router.navigateByUrl('/products');
      },
      error => {
        this.toastr.error(error.error.text ? error.error.text : error.error);
        console.log('error,',error);
      },
      () => {
        this.reactiveForm.reset();
      }
    );
  }
}
