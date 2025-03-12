import { Component, NgModule, OnInit } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
  screenWidth:number=window.innerWidth;
  public genres:any=[];
  public year:any="2025";
  public rate:any="5";
  public price:any="3000";
  
  
  private options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzMwNWFhNjU4MmVkY2Q4OTAxZGNkYmI5YmIyZTlkZSIsIm5iZiI6MTcyNzI4NjkwNC4wMzAxNDIsInN1YiI6IjY2ZjJjOGNmMmQ5OGQ1OWNlMTNiNWQ1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hNu3P360UiWqidexyesOItpGvXYyC9USMjkBc6Nxz10'
    }
  };

  async ngOnInit(): Promise<void> {
    window.addEventListener("resize",this.handleWidth);
    document.getElementById("sidebar")?.classList.add("hide");
this.handleWidth();

    await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en-US`, this.options)
    .then(response => response.json())
    .then(data =>{
        data["genres"].forEach((e:any) => {
          this.genres.push(e.name);
        
        });;
    });


  }

handleWidth():void{
  this.screenWidth=window.innerWidth;
  if(this.screenWidth>=1200){
    document.getElementById("sidebar")?.classList.add("hide");

    document.getElementById("drop_year")?.classList.remove("hide");
    document.getElementById("drop_genres")?.classList.remove("hide");
    document.getElementById("drop_rate")?.classList.remove("hide");
    document.getElementById("drop_price")?.classList.remove("hide");

  }
  else{

    document.getElementById("drop_year")?.classList.add("hide");
    document.getElementById("drop_genres")?.classList.add("hide");
    document.getElementById("drop_rate")?.classList.add("hide");
    document.getElementById("drop_price")?.classList.add("hide");
  }
    
}


setFilters() {
  this.screenWidth=window.innerWidth;
  if(this.screenWidth<1200){
    document.getElementById("sidebar")?.classList.remove("hide");

  }
}

hideSideBar():void{
  document.getElementById("sidebar")?.classList.add("hide");
}
}
