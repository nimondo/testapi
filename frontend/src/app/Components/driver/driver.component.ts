import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import {
  debounceTime,
  Subscription,
} from 'rxjs';
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
  ngOnInit(): void {
    this.filterFormSubsription = this.filterForm.valueChanges
      .pipe(debounceTime(400))
      .subscribe((changes) => {
        this.searchFilter = changes.searchFilter;
        this.deliveryService.get(this.searchFilter).subscribe({
          next: (res) => {
            console.log('changes', res);
            this.packages = res.delivery?.package_id;
            this.delivery = res.delivery;
          },
        });
      });
  }
}
