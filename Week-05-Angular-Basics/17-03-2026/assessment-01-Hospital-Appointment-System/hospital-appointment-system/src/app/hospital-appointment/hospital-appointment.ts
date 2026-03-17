import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hospital-appointment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './hospital-appointment.html',
  styleUrl: './hospital-appointment.css'
})
export class HospitalAppointment {

  patientName: string = "";
  doctor: string = "";
  appointmentDate: string = "";
  consultationType: string = "";
  symptoms: string = "";

  fee: number = 0;
  confirmed: boolean = false;

  today: string = new Date().toISOString().split('T')[0];

  calculateFee(){
    if(this.consultationType === "Online"){
      this.fee = 300;
    }
    else if(this.consultationType === "Offline"){
      this.fee = 500;
    }
    else{
      this.fee = 0;
    }
  }

  confirmBooking() {

  console.log("Button clicked");   // for testing

  if (
    this.patientName.trim() !== "" &&
    this.doctor.trim() !== "" &&
    this.appointmentDate.trim() !== "" &&
    this.consultationType.trim() !== ""
  ) {
    this.confirmed = true;
  } else {
    alert("Please fill all required fields");
  }

}

  resetForm(){
    this.patientName="";
    this.doctor="";
    this.appointmentDate="";
    this.consultationType="";
    this.symptoms="";
    this.fee=0;
    this.confirmed=false;
  }

}