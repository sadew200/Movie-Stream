import { NgClass } from '@angular/common';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,OnDestroy{
menueOpen() :void{
  document.getElementById("headerContent")?.classList.toggle("hide");
  document.getElementById("headerContent1")?.classList.toggle("hide");
  document.getElementById("headerContent2")?.classList.toggle("hide");
  document.getElementById("headerContent3")?.classList.toggle("hide");
  document.getElementById("headerContent4")?.classList.toggle("hide");
  
 

}
  ms:String="home";
  screenWidth:number=window.innerWidth;

  handleScreenResize(): void {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth); // Update screenWidth on resize
    if (this.screenWidth < 768) {
      // If screen is smaller than or equal to 768px, hide certain elements
      document.getElementById("headerContent")?.classList.add("hide");
      document.getElementById("headerContent1")?.classList.add("hide");
      document.getElementById("headerContent2")?.classList.add("hide");
      document.getElementById("headerContent3")?.classList.add("hide");
      document.getElementById("headerContent4")?.classList.add("hide");
      document.getElementById("menuBarContent")?.classList.remove("hide");
      document.getElementById("headerBar")?.classList.add("setHeight");
      document.getElementById("headerBarSp")?.classList.add("setHeight");
    } else if(this.screenWidth >= 768){
      // Show the elements again if screen width is above 768px
      document.getElementById("headerContent")?.classList.remove("hide");
      document.getElementById("headerContent1")?.classList.remove("hide");
      document.getElementById("headerContent2")?.classList.remove("hide");
      document.getElementById("headerContent3")?.classList.remove("hide");
      document.getElementById("headerContent4")?.classList.remove("hide");
      document.getElementById("menuBarContent")?.classList.add("hide");
      document.getElementById("headerBar")?.classList.remove("setHeight");
      document.getElementById("headerBarSp")?.classList.remove("setHeight");
    }
  }
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleScreenResize.bind(this));  // Clean up the event listener
  }

  constructor(private router: Router) {
  }
  ngOnInit(): void {
    document.getElementById("menuBarContent")?.classList.remove("hide");
    setTimeout(() => {
      this.handleScreenResize();  // Call on component init
    }, 100);  // Call on component init
    window.addEventListener('resize', this.handleScreenResize);  
      this.ms=this.router.url=="/popularMovie" ? "popular" : this.router.url=="/topRatedMovie" ? "topRated" : this.router.url=="/nowMovie" ? "now" : this.router.url.includes("/movieList") ? "movieList" : this.router.url=="/guide" ? "guide" : "home";


    
  }

  setBg(){
    document.getElementById("content")?.classList.toggle("bg");
    document.getElementById("moonIcon")?.classList.toggle("iconColor");
    document.getElementById("txtIn")?.classList.toggle("blackColor");
  }



  public ChangeHeader(value: string) {
    this.ms=value;
    
  }

}
