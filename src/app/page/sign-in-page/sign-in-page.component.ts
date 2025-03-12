import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NgFor, NgIf } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [FooterComponent,NgFor,FormsModule,NgIf],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent implements OnInit{
  public countrys:any=[];

  public txtEmailV:String=""
  public txtUserNameV:String=""
  public txtPasswordV:String=""
  public txtCountryV:String=""

  public textCName:String="";
  public userInfo:any={
    email:"",
    userName:"",
    password:"",
    country:""

  };

  emailValidation():void{
    if(!(/^\w{2,}@gmail.com$/.test(this.userInfo.email))){
      this.txtEmailV="* Invalid email address"
    }
    else{
      this.txtEmailV="";
    }
  }

  userNameValidation():void{
    if(this.userInfo.userName.trim().length<4){
      this.txtUserNameV="* Length must be more than 3"
   }
   else{
    this.txtUserNameV="";
   }
  }

  passwordValidation():void{
    let numbers=this.userInfo.password.match(/\d/g) || [];
    let letters=this.userInfo.password.match(/[a-zA-Z]/g) || [];
    if(numbers.length<4){
      this.txtPasswordV="* Password atleast must contain 4 numbers"
    }
    else if(letters.length<4){
      this.txtPasswordV="* Password atleast must contain 4 letters"
    }

    else{
      this.txtPasswordV="";
    }
  }

  countryValidation():void{
    let isValid=false;
      this.countrys.forEach((e:any) => {
        if(e.cName==this.userInfo.country){
          isValid=true;
        }
      });
 
      isValid ? this.txtCountryV="" : this.txtCountryV="* Country coudn't find";
     
  }

  setName(cName:String):void{
    this.userInfo.country=cName;
  }

  SignIn():void{
      this.emailValidation();
      this.userNameValidation();
      this.passwordValidation();
      this.countryValidation();
      if(this.txtEmailV=="" && this.txtUserNameV=="" && this.txtPasswordV=="" && this.txtCountryV==""){
        let header=new Headers;
        header.append("Content-Type","application/json");
        let body=JSON.stringify({
            "email":this.userInfo.email,
            "userName":this.userInfo.userName,
            "password":this.userInfo.password,
            "country":this.userInfo.country
        });
        const req={
          method:"POST",
          headers:header,
          body:body
        }
        fetch("http://localhost:8080/add-Account",req)
        .then(res=>res.json())
        .then(data=>{
          console.log(data);
          if(data.emailDuplicate){
            this.txtEmailV="* This email address already has been used"
          }
          if(data.userNameDuplicate){
            this.txtUserNameV="* This user name already has been used"
          }
          
        })
        .catch((e:any)=>console.log("Error"+e));
      }

  }

  ngOnInit():void{
    fetch("https://restcountries.com/v3.1/all")
    .then(res=>res.json())
    .then(data=>{
      data.forEach((e:any) => {
        console.log(e)
     this.countrys.push({
          cName: e.name.common,
          cFlag:e.flags.png
        }
        );
      });
    })
  }

}


