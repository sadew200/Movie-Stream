import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../page/header/header.component';
import { FilterComponent } from "../filter/filter.component";

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [NgFor, HeaderComponent, FilterComponent],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css'
})
export class PopularComponent implements OnInit{

  public popularList:any=[];

  private options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzMwNWFhNjU4MmVkY2Q4OTAxZGNkYmI5YmIyZTlkZSIsIm5iZiI6MTcyNzI4NjkwNC4wMzAxNDIsInN1YiI6IjY2ZjJjOGNmMmQ5OGQ1OWNlMTNiNWQ1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hNu3P360UiWqidexyesOItpGvXYyC9USMjkBc6Nxz10'
    }
  };

  async ngOnInit():Promise<any> {
    for(let i=1; i<4; i++) {
      await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${i}`, this.options)
        .then(response => response.json())
        .then(data =>{
          data.results.forEach((e:any)=>{
            this.popularList.push({
              imgUrl: e.poster_path,
              overview: e.overview
            });
          })
          
        })
        .catch(err => console.error(err));
      }
      setTimeout(()=> {for(let i = 0; i < this.popularList.length; i++) {
        document.getElementById(`showOverview${i}`)?.classList.add("hide");
      }
  },50)
  }
  onMouseLeave(idName:String,index:any):void {
    if(idName=="popular"){
      document.getElementById(`showOverview${index}`)?.classList.add("hide");
    }
    else if(idName=="top"){
      document.getElementById(`topShowOverview${index}`)?.classList.add("hide");
    }
    else if(idName=="now"){
      document.getElementById(`nowShowOverview${index}`)?.classList.add("hide");
    }
  }
  onMouseEnter(idName:String,index:any):void {
    if(idName=="popular"){
      document.getElementById(`showOverview${index}`)?.classList.remove("hide");
    }
    else if(idName=="top"){
      document.getElementById(`topShowOverview${index}`)?.classList.remove("hide");
    }
    else if(idName=="now"){
      document.getElementById(`nowShowOverview${index}`)?.classList.remove("hide");
    }
  }

}
