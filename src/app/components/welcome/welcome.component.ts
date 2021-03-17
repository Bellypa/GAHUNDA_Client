import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  serviceDetail: any;

  ourService: any[] = [];
  isBooking: boolean;
  isLoggedIn: boolean;
  isServiceDetail: boolean;




  constructor(
    private authService: AuthService,
    private configuration: AppConfig
  ) {
    this.isLoggedIn = false;
    this.isServiceDetail = false;
    this.isBooking = false;
    this.serviceDetail = {};
  }

  ngOnInit() {
    this.loadServices();
  }



  loadServices() {
    this.authService.getPartnerService()
      .subscribe(
        data => { this.ourService = data; console.log(this.ourService); },
        error => { }
      );
  }


  // ouService = [
  //   {
  //     row: [
  //       {
  //         id: '1',
  //         serviceImage: 'assets/images/demo/nail.jpg',
  //         serviceName: 'Dean & Letter',
  //       },
  //       {
  //         id: '2',
  //         serviceImage: 'assets/images/demo/dread2.jpg',
  //         serviceName: 'Branding, Web Design',
  //       }
  //     ]
  //   },

  //   {
  //     row: [
  //       {
  //         id: '3',
  //         serviceImage: 'assets/images/demo/nail1.jpg',
  //         serviceName: 'Dean & Letter',
  //       },
  //       {
  //         id: '4',
  //         serviceImage: 'assets/images/demo/footnail.jpg',
  //         serviceName: 'Branding, Web Design',
  //       }
  //     ]
  //   },

  //   {
  //     row: [
  //       {
  //         id: '5',
  //         serviceImage: 'assets/images/demo/nail3.jpg',
  //         serviceName: 'Dean & Letter',
  //       },
  //       {
  //         id: '6',
  //         serviceImage: 'assets/images/demo/hand_nail.jpg',
  //         serviceName: 'Branding, Web Design',
  //       }
  //     ]
  //   }
  // ]



  getService(service, row) {
    this.serviceDetail.serviceName = row.serviceName;
    this.serviceDetail.serviceImage = row.serviceImage;
    this.serviceDetail.id = row.id;
    this.serviceDetail.partnerId = row.partnerId;
    this.isServiceDetail = true;
  }


  bookDetail() {
    // console.log('Hello');
    console.log(this.authService.getToken());
    this.isBooking = true;
    if (this.authService.getToken()) {
      console.log('Helo');
      this.isLoggedIn = true;
      this.isServiceDetail = false;
    } else {
      console.log('Login');
      this.isLoggedIn = false;
    }
  }


  closeBooking(event) {
    this.isServiceDetail = true;
    this.isBooking = false;
    this.isLoggedIn = false;
  }


  rateDetail() { }


  closelogin(event) {
    this.isLoggedIn = true;
    // this.isBooking = true;
    this.isBooking = false;
  }


  logout() {
    localStorage.removeItem(this.configuration.JWT_Token);
  }
}
