import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import { Subscription } from 'rxjs';
import { DeliveryService } from 'src/app/Services/delivery.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverComponent {
  packages: any;
  delivery: any;
  filterForm: FormGroup = new FormGroup({
    searchFilter: new FormControl<string>(''),
  });
  searchFilter: string = '';
  filterFormSubsription!: Subscription;
  constructor(private deliveryService: DeliveryService) {}
  ngOnDestroy(): void {
    this.filterFormSubsription.unsubscribe();
  }

  //get all Form Fields
  get search() {
    return this.filterForm.get('searchFilter');
  }
  ngOnInit(): void {
    // this.filterFormSubsription = this.filterForm.valueChanges
    //   .pipe(debounceTime(400))
    //   .subscribe((changes) => {
    //     this.searchFilter = changes.searchFilter;
    //     this.deliveryService.get(this.searchFilter).subscribe({
    //       next: (res) => {
    //         console.log('changes', res);
    //         this.packages = res.delivery?.package_id;
    //         this.delivery = res.delivery;
    //       },
    //     });
    //   });
  }
  // submit fntc
  onSubmit() {
    console.log('search', this.search?.value);
    this.deliveryService.get(this.search?.value).subscribe({
      next: (res) => {
        this.packages = res.delivery?.package_id;
        this.delivery = res.delivery;
      },
    });
  }
}
