import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../page/header/header.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-top-rated',
  standalone: true,
  imports: [NgFor,HeaderComponent,FilterComponent],
  templateUrl: './top-rated.component.html',
  styleUrl: './top-rated.component.css'
})
export class TopRatedComponent implements OnInit {

  private options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzMwNWFhNjU4MmVkY2Q4OTAxZGNkYmI5YmIyZTlkZSIsIm5iZiI6MTcyNzI4NjkwNC4wMzAxNDIsInN1YiI6IjY2ZjJjOGNmMmQ5OGQ1OWNlMTNiNWQ1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hNu3P360UiWqidexyesOItpGvXYyC9USMjkBc6Nxz10'
    }
  };
  
  async ngOnInit(): Promise<any> {
    for(let i=1; i<4; i++) {

      await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${i}`, this.options)
        .then(response => response.json())
        .then(data =>{
          data.results.forEach((e:any)=>{
            this.topList.push({
              imgUrl: e.poster_path,
              overview: e.overview
            });
          })
          
        })
        .catch(err => console.error(err));
      }    
      setTimeout(()=>{for (let i = 0; i < this.topList.length; i++) {
        document.getElementById(`topShowOverview${i}`)?.classList.add("hide");
      }
    },50)
  }
  public topList:any=[];

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
