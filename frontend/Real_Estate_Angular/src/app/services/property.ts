import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseUrl = 'https://localhost:7032/api/Property';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Property[]>(`${this.baseUrl}`);
  }

  getById(id: number) {
    return this.http.get<Property>(`${this.baseUrl}/${id}`);
  }

  create(property: Property) {
    return this.http.post(`${this.baseUrl}`, property);
  }

  update(property: Property) {
    return this.http.put(`${this.baseUrl}/${property.id}`, property);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}