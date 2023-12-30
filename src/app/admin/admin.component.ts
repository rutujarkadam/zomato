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
foodOptions:any;
hotelInfo:any;
foodItem : FormGroup;
typeOptions:any;
dishOptions: any;
currentCategory:any = [];
constructor(private service : ZomatoService,
  private fb : FormBuilder,
  private toastr : ToastrService){
    this.foodItem = this.fb.group({
      hotelName: ['',Validators.required],
      foodName: ['', Validators.required],
      foodPrice: ['', Validators.required],
      foodType: ['', Validators.required],
    });
}
ngOnInit(){
  this.getOptions();
  this.getHotelInfo();
}
getOptions(){
  this.service.getFoodOptions().subscribe((res:any) => {
    this.foodOptions = res.data[0].menu;
    console.log(res);
    console.log('foodOptions', this.foodOptions);
  });
}
getHotelInfo(){
  this.service.getHotelInfo().subscribe((res:any) => {
    this.hotelInfo = res.data;
    console.log(res);
  }, error => {
    console.log('error', error);
  });
}
// onCategorySelect(){
//   this.foodOptions.forEach((item:any) => {
//     if(item.category == this.foodItem.controls['foodCategory'].value){
//       this.typeOptions = item.foodType;
//       this.currentCategory.push(item);
//     }    
//   });
// }
// onTypeSelect(){
//   this.currentCategory.forEach((item:any) => {
//     if(this.foodItem.controls['foodType'].value == 'starter'){
//       this.dishOptions = item.starter;
//     } else if(this.foodItem.controls['foodType'].value == 'mainCourse'){
//       this.dishOptions = item.mainCourse;
//     } else {
//       this.dishOptions = item.dessert;
//     }
//   });
// }
// onDishSelect(){
//   this.dishOptions.forEach((item:any) => {
//     if(item.name == this.foodItem.controls['foodName'].value){
//       this.foodItem.controls['foodPrice'].setValue(item.price);
//     }
//   });
// }
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
}
}
