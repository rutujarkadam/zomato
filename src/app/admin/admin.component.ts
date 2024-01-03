import { Component } from '@angular/core';
import { ZomatoService } from '../zomato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
hotelInfo:any;
foodItem : FormGroup;
  currentHotel: any;
constructor(private service : ZomatoService,
  private fb : FormBuilder,
  private toastr : ToastrService){
    this.foodItem = this.fb.group({
      hotelName: ['',Validators.required],
      foodName: ['', Validators.required],
      foodPrice: ['', Validators.required],
      foodType: ['', Validators.required],
      foodCategory : ['', Validators.required]
    });
}
ngOnInit(){
  this.getHotelInfo();
}
getHotelInfo(){
  this.service.getHotelInfo().subscribe((res:any) => {
    this.hotelInfo = res.data;
    console.log(res);
  }, error => {
    console.log('error', error);
  });
}
onHotelSelect(){
  this.hotelInfo.filter((item:any) => {
    if(item.name == this.foodItem.controls['hotelName'].value){
      this.currentHotel = item
    };
  });
}
submit(){
  let id;
  let data = this.foodItem.value;
  this.hotelInfo.forEach((item:any) => {
    if(item.name == this.foodItem.controls['hotelName'].value){
      id = item._id
    }
  });
  let body = {
    hotelId : id,
    ...data
  };
  this.service.listFoodItem(body).subscribe((res:any) => {
    console.log('Post Food', res);
    this.toastr.success(res.message);
  }, error => {
    console.log('error', error)
  });
  this.foodItem.reset();
  this.currentHotel='';
}
}
