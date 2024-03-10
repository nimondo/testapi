import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrorsStateMatcher } from 'src/app/Error-state-matcher';
import { DeliveryService } from 'src/app/Services/delivery.service';
import { PackageService } from 'src/app/Services/package.service';
import { v4 as uuid4 } from 'uuid';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent {
  packages!: any;
  constructor(
    private deliveryService: DeliveryService,
    private packageService: PackageService,
    private _snackBar: MatSnackBar
  ) {}

  getAllPackages() {
    this.packageService.getAll().subscribe((response: any) => {
      this.packages = response.data.data;
      console.log(this.packages);
    });
  }
  ngOnInit(): void {
    this.getAllPackages();
  }

  //Declaration
  // check the form is submitted or not yet
  isSubmited: boolean = false;
  // hide attribute for the password input
  hide: boolean = true;

  //form group
  form: FormGroup = new FormGroup({
    package_id: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    // status: new FormControl('', [Validators.required]),
  });

  //get all Form Fields
  get package_id() {
    return this.form.get('package_id');
  }
  get location() {
    return this.form.get('location');
  }
  // get status() {
  //   return this.form.get('status');
  // }
  // match errors in the submition of form
  matcher = new ErrorsStateMatcher();

  // submit fntc
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.isSubmited = true;
    if (!this.form.invalid) {
      const deliveryData = {
        _id: uuid4(),
        package_id: this.package_id?.value,
        location: {
          lat: this.location?.value.split(',')[0],
          long: this.location?.value.split(',')[1],
        },
        status: 'open',
      };
      console.log('data', deliveryData);
      this.deliveryService.Create(deliveryData).subscribe((delivery) => {
        console.log('delivery', delivery);
        console.log('delivery id', deliveryData.package_id);
        for (const package_id of deliveryData.package_id) {
          this.packageService
            .Update(package_id, { active_delivery_id: delivery.id })
            .subscribe(() => {});
        }
      });

      setTimeout(() => {
        window.location.href = '/signin';
        this._snackBar.open(
          'Your delivery has been created successfully',
          '✔️'
        );
      }, 2000);
    } else {
      console.log(this.form);
      this._snackBar.open('Enter a valid informations !!!', '❌');
    }
  }
}
