import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZomatoService } from '../zomato.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent {
newHotel : FormGroup;
constructor(private fb : FormBuilder,
  private service : ZomatoService,
  private toastr : ToastrService){
  this.newHotel = this.fb.group({
    name: ['',Validators.required],
    location: ['',Validators.required],
    type: ['',Validators.required],
    cuisines: ['',Validators.required],
    time: ['',Validators.required]
  });
}
add(){
  let body = this.newHotel.value;
  this.service.createHotel(body).subscribe((res:any) => {
    console.log(res);
    this.toastr.success(res.message);
    this.newHotel.reset();
  }, error => {
    console.log('error', error);
  });
}
}
