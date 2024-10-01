import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink,FooterComponent,FormsModule,NgIf],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private router: Router) {}

  public txtEmailV:String="";
  public txtPasswordV:String="";

  public txtLogin:any={
    email:"",
    password:""
  }

  Login():void{
    const header=new Headers();
    header.append("Content-Type","application/json");

    const body=JSON.stringify({
      "email":this.txtLogin.email,
      "password":this.txtLogin.password
    })
    const req={
      method:"POST",
      headers:header,
      body:body
    }

    fetch("http://localhost:8080/get-AccountInfo",req)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
        this.txtEmailV= data.existsEmail ? "" :"* Invalid email address";
        this.txtPasswordV=data.existsPassword ? "" : "* Invalid password";
        if(this.txtEmailV=="" && this.txtPasswordV==""){
          this.router.navigate(['/movieList']);
        }
    })
  }

}
