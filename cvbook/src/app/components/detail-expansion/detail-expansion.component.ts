import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { User } from '../../models/User';


@Component({
  selector: 'app-user-expansion',
  templateUrl: './detail-expansion.component.html',
  styleUrls: ['./detail-expansion.component.css']
})

export class DetailExpansionComponent implements OnInit, AfterViewInit {

  panelOpenState = false;
  @Input() public user: User;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // if (this.isDriver === false && this.isFavourite === true) {
    //   const pickupCoords = {
    //     lat: this.client.currentLat,
    //     lng: this.client.currentLng,
    //     mode: 'location'
    //   };
    //   const destinationCoords = {
    //     lat: this.ride.destinationLat,
    //     lng: this.ride.destinationLng
    //   };
    // }
  }

  receiveRouteParams($event) {
    // this.distance = $event.distance;
  }

  onMap() {
    // console.log(this.driver);
    // const msg = {
    //   driverID: this.driver.driverID,
    //   currentLat: this.driver.currentLat,
    //   currentLng: this.driver.currentLng,
    //   currentLocation: this.driver.currentLocation
    // };
    // this.mapParams.emit(msg);
  }

  onAssign() {
    this.router.navigate(['/']);
  }

  onRequest() {
    // const msg = {
    //   pickupLocation: this.ride.pickupLocation,
    //   destinationLocation: this.ride.destinationLocation
    // };
    // this.mapParams.emit(msg);
  }
}
