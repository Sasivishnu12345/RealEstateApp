import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property';
import { Property } from '../../../models/property';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './property-form.html'
})
export class PropertyFormComponent implements OnInit {

  property: Property = {
    id: 0,
    propertyName: '',
    plotNo: '',
    location: '',
    ownerName: ''
  };

  isEdit = false;

  constructor(private service: PropertyService,
              private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef
            ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.service.getById(+id).subscribe(res => {
        this.property = res;
        this.cd.detectChanges();
      });
    }
  }

  save() {

  if (!this.property.propertyName ||
      !this.property.plotNo ||
      !this.property.location ||
      !this.property.ownerName) {

    // ❌ Validation Alert
    Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      text: 'All fields required'
    });

    return;
  }

  if (this.isEdit) {

    this.service.update(this.property).subscribe(() => {

      // ✅ Update Success
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/property/list']);
      });

    });

  } else {

    this.service.create(this.property).subscribe(() => {

      // ✅ Create Success
      Swal.fire({
        icon: 'success',
        title: 'Property Created Successfully',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/property/list']);
      });

    });

  }
}
}