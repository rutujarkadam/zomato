import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HotelComponent } from './hotel/hotel.component';
import { FoodsDashComponent } from './foods-dash/foods-dash.component';

const routes: Routes = [
  {path : 'admin',
    component : AdminComponent},
  {path : 'registration',
    component : RegistrationComponent},
  {path : 'login',
    component : LoginComponent},
  {path : 'dashboard',
    component : DashboardComponent
  },
  {path : 'hotel',
    component : HotelComponent},
  {path : 'foodsDash',
    component : FoodsDashComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
