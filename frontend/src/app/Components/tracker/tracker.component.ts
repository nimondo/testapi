import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';

import {
  debounceTime,
  Subscription,
} from 'rxjs';
import { PackageService } from 'src/app/Services/package.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'],
})
export class TrackerComponent {
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
    this.filterFormSubsription = this.filterForm.valueChanges
      .pipe(debounceTime(400))
      .subscribe((changes) => {
        console.log('changes', changes);
        this.searchFilter = changes.searchFilter;
        this.packageService.get(this.searchFilter).subscribe({
          next: (res) => {
            console.log('res', res);
          },
        });
      });
  }
}
