import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule , NgFor} from '@angular/common';
import { PropertyService } from '../../services/property';
import { Property } from '../../../models/property';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, RouterModule,NgFor],
  templateUrl: './property-list.html',
  styleUrls: ['./property-list.css'],
})
export class PropertyListComponent implements OnInit {

  properties: Property[] = [];

  constructor(private service: PropertyService,
              private router: Router,
           private cd:ChangeDetectorRef
           ) {}

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.service.getAll().subscribe({
      next:(res)=>{
      this.properties =res ? [...res] : [];
      this.cd.detectChanges();
      }
    });
  }

edit(id: number) {
  this.router.navigate(['/property/edit', id]);
}

delete(id: number) {

  Swal.fire({
    title: 'Are you sure?',
    text: 'This property will be deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {

    if (result.isConfirmed) {

      this.service.delete(id).subscribe(() => {

        // ✅ Success Alert
        Swal.fire({
          icon: 'success',
          title: 'Deleted Successfully',
          timer: 1500,
          showConfirmButton: false
        });

        this.loadProperties();
      });

    }

  });
}
}
