import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './booking-list.html'
})
export class BookingListComponent implements OnInit {

  bookings: any[] = [];

  constructor(
    private service: BookingService,
    private router: Router,
    private cd:ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.load();
    this.cd.detectChanges()
  }

  load() {
    this.service.getAll().subscribe(res => {
      this.bookings = res;
      this.cd.detectChanges()
    });
  }

  edit(id: number) {
    this.router.navigate(['/booking/edit', id]);
  }

  delete(id: number) {

  Swal.fire({
    title: 'Are you sure?',
    text: 'This booking will be deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {

    if (result.isConfirmed) {

      this.service.delete(id).subscribe(() => {

        // Success Alert
        Swal.fire({
          icon: 'success',
          title: 'Deleted Successfully',
          timer: 1500,
          showConfirmButton: false
        });

        this.load();
      });

    }

  });
}
}