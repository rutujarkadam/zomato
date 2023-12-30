import { Injectable } from '@angular/core';
import { DummyConstants } from './dummy.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZomatoService {

  constructor(private http : HttpClient) { }
  getFoodOptions(){
    const url = DummyConstants.getFoodOptions;
    return this.http.get(url);
  }
  createHotel(body:any){
    const url = DummyConstants.createHotel;
    return this.http.post(url, body);
  }
  getHotelInfo(){
    const url = DummyConstants.getHotelInfo;
    return this.http.get(url);
  }
  listFoodItem(body:any){
    const url = DummyConstants.listFoodItem;
    return this.http.post(url, body);
  }
}
