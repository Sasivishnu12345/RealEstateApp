import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { HomeComponent } from './home/home';
import { PropertyListComponent } from './property/property-list/property-list';
import { PropertyFormComponent } from './property/property-form/property-form';
import { BookingListComponent } from './booking/booking-list/booking-list';
import { BookingFormComponent } from './booking/booking-form/booking-form';

export const routes: Routes = [
    {path: 'login', component:LoginComponent },
    {path: '', redirectTo:'login', pathMatch:'full'},
    {path: 'register', component: RegisterComponent },
    {path: 'home', component: HomeComponent, canActivate: [authGuard] },

    // ✅ PROPERTY ROUTES
    {path: 'property/list', component: PropertyListComponent, canActivate: [authGuard] },
    {path: 'property/create', component: PropertyFormComponent, canActivate: [authGuard] },
    {path: 'property/edit/:id', component: PropertyFormComponent, canActivate: [authGuard] },
    
    // ✅ BOOKING ROUTES (ADD THESE)
    {path: 'booking/list', component: BookingListComponent, canActivate: [authGuard] },
    {path: 'booking/create', component: BookingFormComponent, canActivate: [authGuard] },
    {path: 'booking/edit/:id', component: BookingFormComponent, canActivate: [authGuard] },

];
