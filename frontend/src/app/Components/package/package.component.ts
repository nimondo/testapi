import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorsStateMatcher } from 'src/app/Error-state-matcher';
import { PackageService } from 'src/app/Services/package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent {
  constructor(
    private packageService: PackageService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  //Declaration
  // check the form is submitted or not yet
  isSubmited: boolean = false;
  // hide attribute for the password input
  hide: boolean = true;

  //form group
  form: FormGroup = new FormGroup(
    {
      role: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
      ]),
      cPassword: new FormControl('', [Validators.required]),
    },
   
  );

  //get all Form Fields
  get role() {
    return this.form.get('role');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get cPassword() {
    return this.form.get('cPassword');
  }

  // match errors in the submition of form
  matcher = new ErrorsStateMatcher();

  // submit fntc
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.isSubmited = true;
    if (!this.form.invalid) {
      const user = {
        email: this.email?.value,
        password: this.password?.value,
        role: this.role?.value,
      };
      console.log(user);
      this.packageService.Create(user).subscribe(() => {
        this._snackBar.open('Your account has been created successfully', '✔️');
        setTimeout(() => (window.location.href = '/signin'), 2000);
      });
    } else {
      console.log(this.form);
      this._snackBar.open('Enter a valid informations !!!', '❌');
    }
  }

}
