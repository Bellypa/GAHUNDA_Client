import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppConfig } from 'src/app/app.config';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-client-booking',
  templateUrl: './client-booking.component.html',
  styleUrls: ['./client-booking.component.scss']
})
export class ClientBookingComponent implements OnInit {
  @Output() backToDetail = new EventEmitter<boolean>();
  @Input() partnerService: any;
  time: string;
  date: string;
  barberId: string;
  barbers: any[] = [];
  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
    private datePipe: DatePipe,
    private configuration: AppConfig
  ) { }

  ngOnInit() {
    console.log(this.partnerService);
    this.loadBarbers(this.partnerService.partnerId);
  }



  loadBarbers(id) {
    this.reservationService.getBarbers(id)
      .subscribe(
        data => { this.barbers = data; }
      )

  }


  onBookingService(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      let dateconvert = this.datePipe.transform(new Date(this.date), 'yyyy-MM-dd');
      let bookData =
      {
        phone: jwt_decode(localStorage.getItem(this.configuration.JWT_Token)).ClientId,
        partnerServiceId: +this.partnerService.id,
        appointmentTime: dateconvert + 'T' + this.time,
        barberId: +this.barberId
      }
      console.log(bookData);
      this.reservationService.clientBooking(bookData)
        .subscribe(
          data => { this.cancelBooking(); },
          error => { })
    }
  }


  cancelBooking() {
    this.backToDetail.emit(false);
  }

}
