import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  GoogleMap,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  loading = false;

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  mapZoom = 12;
  mapCenter!: google.maps.LatLng;
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

  showLocation() {
    this.loading = true;
    const point = {
      lat: 6.13365,
      lng: 1.22311,
    };
    this.mapCenter = new google.maps.LatLng(point);
    this.map.panTo(point);

    this.markerInfoContent = "I'm here!";

    this.markerOptions = {
      draggable: false,
      animation: google.maps.Animation.DROP,
    };
  }
  openInfoWindow(marker: MapMarker) {
    // this is called when the marker is clicked.
    this.infoWindow.open(marker);
  }
  ngOnInit() {
    this.showLocation();
  }
}
