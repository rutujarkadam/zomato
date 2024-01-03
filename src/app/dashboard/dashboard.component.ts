import { Component } from '@angular/core';
import { ZomatoService } from '../zomato.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
location:any;
hotelInfo:any;
searchText:any;
allHotelInfo:any;
locationOptions:any = [];
constructor(private service : ZomatoService,
  private router : Router){
  this.getHotelInfo();
}
getHotelInfo(){
  this.service.getHotelInfo().subscribe((res:any) => {
    this.hotelInfo = res.data;
    this.allHotelInfo = res.data;
    res.data.forEach((item:any) => {
      this.locationOptions.push(item.location);     
    });
    this.locationOptions = [...new Set(this.locationOptions)];
    console.log(res);
  }, error => {
    console.log('error', error);
  });
}
logOut(){}
search(){
  this.hotelInfo = this.hotelInfo.filter((item:any) => {
    return item.name.toLowerCase().includes(this.searchText.toLowerCase());
  });
}
clearSearch(){
  this.hotelInfo = this.allHotelInfo;
  this.searchText='';
}
locationSelect(){
  this.hotelInfo = this.allHotelInfo;
  this.hotelInfo = this.hotelInfo.filter((item:any) => {
    return item.location == this.location;
  });
}
clearLocation(){
  this.hotelInfo = this.allHotelInfo;
  this.location = '';
}
goToFoodPage(id:any){
  // this.service.hotelId.next(id);
  localStorage.setItem('currentHotelId',id);
  this.router.navigateByUrl('foodsDash');
}
}
