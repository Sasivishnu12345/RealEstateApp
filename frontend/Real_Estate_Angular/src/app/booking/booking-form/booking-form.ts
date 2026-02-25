import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './booking-form.html'
})
export class BookingFormComponent implements OnInit {

  booking: any = {
    id: 0,
    propertyName: '',
    plotNo: '',
    customerName: ''
  };

  properties: any[] = [];
  uniqueProperties: string[] = [];
  plots: string[] = [];
  isEdit = false;

  constructor(
    private service: BookingService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef 
  ) {}

  // ngOnInit() {
  //   this.service.getProperties().subscribe(res => {
  //     this.properties = [...res];

  //   this.uniqueProperties = [
  //     ...new Set(res.map(p => p.propertyName))
  //   ];
  //   this.cd.detectChanges();
  //   });

  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.isEdit = true;
  //     this.service.getById(+id).subscribe(res => {
  //       this.booking = res;
  //       this.filterPlots();
  //       this.cd.detectChanges();
  //     });
  //   }
  // }

  ngOnInit() {

  this.service.getProperties().subscribe(res => {
    this.properties = res;

    this.uniqueProperties = [
      ...new Set(res.map(p => p.propertyName))
    ];
    this.cd.detectChanges();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;

      this.service.getById(+id).subscribe(bookingData => {
        this.booking = bookingData;
        this.filterPlots();
        this.cd.detectChanges();
      });
    }
  });
}
  filterPlots() {
  this.plots = this.properties
    .filter(p => p.propertyName === this.booking.propertyName)
    .map(p => p.plotNo);
}

  save() {

  if (this.isEdit) {

    this.service.update(this.booking.id, this.booking)
      .subscribe(() => {

        Swal.fire({
          icon: 'success',
          title: 'Booking Updated Successfully',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/booking/list']);
        });
      });
  } else {

    this.service.create(this.booking)
      .subscribe(() => {

        Swal.fire({
          icon: 'success',
          title: 'Booking Created Successfully',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/booking/list']);
        });
      });
  }
}
}