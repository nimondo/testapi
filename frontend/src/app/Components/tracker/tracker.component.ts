import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import { Subscription } from 'rxjs';
import { PackageService } from 'src/app/Services/package.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'],
})
export class TrackerComponent {
  package: any;
  delivery: any;

  filterForm: FormGroup = new FormGroup({
    searchFilter: new FormControl<string>(''),
  });
  searchFilter: string = '';
  filterFormSubsription!: Subscription;
  constructor(private packageService: PackageService) {}
  ngOnDestroy(): void {
    this.filterFormSubsription.unsubscribe();
  }
  ngOnInit(): void {
    // this.filterFormSubsription = this.filterForm.valueChanges
    //   .pipe(debounceTime(400))
    //   .subscribe((changes) => {
    //     this.searchFilter = changes.searchFilter;
    //     this.packageService.get(this.searchFilter).subscribe({
    //       next: (res) => {
    //         console.log('changes', res);
    //         this.package = res.package;
    //         this.delivery = res.package?.active_delivery_id;
    //       },
    //     });
    //   });
  }

  //get all Form Fields
  get search() {
    return this.filterForm.get('searchFilter');
  }

  // submit fntc
  onSubmit() {
    console.log('search', this.search?.value);
    this.packageService.get(this.search?.value).subscribe({
      next: (res) => {
        this.package = res.package;
        this.delivery = res.package?.active_delivery_id;
      },
    });
  }
}
