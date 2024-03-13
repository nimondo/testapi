import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  GoogleMap,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';

import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { DeliveryService } from 'src/app/Services/delivery.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverComponent {
  loading = false;
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  markers: any[] = [];
  mapZoom = 12;
  point = {
    lat: 6.13365,
    lng: 1.22311,
  };
  mapCenter: google.maps.LatLng = new google.maps.LatLng(this.point);
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
  };

  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  openInfoWindow(marker: MapMarker) {
    // this is called when the marker is clicked.
    this.infoWindow.open(marker);
  }

  addMarker(markerData: any[]) {
    for (const marker of markerData) {
      console.log(typeof marker.position.lat);
      this.markers.push({
        position: marker.position,
        label: {
          color: marker.color,
          text: 'Marker label ' + (this.markers.length + 1),
        },
        title: 'Marker title ' + (this.markers.length + 1),
        options: {
          animation: google.maps.Animation.BOUNCE,
        },
        icon:
          marker.icon ||
          'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
        //icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      });
    }
    console.log(this.markers);
  }
  packages: any;
  delivery: any;
  markerdata: any[] = [];
  filterForm: FormGroup = new FormGroup({
    searchFilter: new FormControl<string>(''),
  });
  searchFilter: string = '';
  filterFormSubsription!: Subscription;
  constructor(
    private deliveryService: DeliveryService,
    private socket: Socket
  ) {}
  ngOnDestroy(): void {
    // this.filterFormSubsription.unsubscribe();
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
        console.log(this.delivery);
        this.markerdata = [
          {
            position: new google.maps.LatLngAltitude({
              lat: parseFloat(this.delivery?.location?.lat),
              lng: parseFloat(this.delivery?.location?.long),
            }),
            color: 'blue',
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          },
        ];
        for (const packageData of this.packages) {
          this.markerdata.push({
            position: {
              lat: Number(packageData?.from_location?.lat),
              lng: Number(packageData?.from_location?.long),
            },
            color: 'red',
          });
          this.markerdata.push({
            position: {
              lat: Number(packageData.to_location?.lat),
              lng: Number(packageData?.to_location?.long),
            },
            color: 'red',
          });
        }
        this.addMarker(this.markerdata);
      },
    });
  }
  onPickedUp(id: string = '') {
    console.log('id', id);
    if (id) {
      this.updateData(id, { status: 'picked-up', pickup_time: new Date() });
    }
  }
  onInTransit(id: string) {
    this.updateData(id, { status: 'in-transit', start_time: new Date() });
  }
  onDelivered(id: string) {
    this.updateData(id, { status: 'delivered', end_time: new Date() });
  }
  onFailed(id: string) {
    this.updateData(id, { status: 'failed', start_time: new Date() });
  }
  updateData(id: string, data: any) {
    this.deliveryService.Update(id, data).subscribe({
      next: (res) => {
        this.socket.emit('editDelivery', { id: id });
        this.socket.fromEvent<any>('documents').subscribe({
          next: (data) => {
            console.log('data', data);
          },
        });

        console.log('res data', res);

        delete this.delivery.status;
        this.delivery = { ...this.delivery, ...data };

        // console.log('after update', this.delivery);
      },
    });
  }
}
