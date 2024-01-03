import { Component } from '@angular/core';
import { ZomatoService } from '../zomato.service';

@Component({
  selector: 'app-foods-dash',
  templateUrl: './foods-dash.component.html',
  styleUrls: ['./foods-dash.component.scss']
})
export class FoodsDashComponent {
foodsData:any;
location: any;
searchText: any;
allFoodInfo: any;
currentHotelId:any;
constructor(private service : ZomatoService){
  this.currentHotelId = localStorage.getItem('currentHotelId');
}
ngOnInit(){
  this.getFoodsInfo();
}
getFoodsInfo(){
  // let id;
  // this.service.hotelId.subscribe(res=>{
  //   id = res;
  //   console.log(res);
  // },error => {
  //   console.log('error', error);
  // });
  if(this.currentHotelId){
    let body = {
      hotelId : this.currentHotelId
    }
    this.service.getFoodItemHotelId(body).subscribe((res:any) => {
      this.foodsData = res.data;
      this.allFoodInfo = res.data;
      console.log('food',res);
    }, error => {
      console.log('error', error);
    });
  }
}
search(){
  this.foodsData = this.foodsData.filter((item:any) => {
    return item.foodName.toLowerCase().includes(this.searchText.toLowerCase());
  });
}
clearSearch(){
  this.foodsData = this.allFoodInfo;
  this.searchText='';
}
locationSelect(){
  // this.foodsData = this.allFoodInfo;
  // this.foodsData = this.foodsData.filter((item:any) => {
  //   return item.location == this.location;
  // });
}
clearLocation(){
  this.foodsData = this.allFoodInfo;
  this.location = '';
}
logOut(){

}
onCategory(category:any){
  this.foodsData = this.allFoodInfo; 
  this.foodsData = this.foodsData.filter((item:any) => {
    if(item.foodCategory == category){
      return item;
    }
    if(category == 'All'){
      return item;
    }
  });
}
ontype(type:any){
  this.foodsData = this.allFoodInfo;
  this.foodsData = this.foodsData.filter((item:any) => {
    if(item.foodType == type){
      return item;
    }
    if(type == 'All'){
      return item;
    }
  });
}
}
