import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {

  currentYear!: number;
  expiryYears: number[] = [];
  months: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  states: string[] = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","New Delhi","Goa","Gujarat","Haryana","Himachal Pradesh",
  "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand","Uttar Pradesh","West Bengal"]

  constructor() { 
    this.currentYear = new Date().getFullYear();

    for(let year = this.currentYear; year < this.currentYear+10; year++) {
      this.expiryYears.push(year);
    }
  }

}
