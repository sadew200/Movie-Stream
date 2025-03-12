import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../page/header/header.component';

@Component({
  selector: 'app-movie-recommend',
  standalone: true,
  imports: [NgFor,HeaderComponent],
  templateUrl: './movie-recommend.component.html',
  styleUrl: './movie-recommend.component.css'
})
export class MovieRecommendComponent {

  movieID:any;
  public movies:any=[];

  constructor(private route: ActivatedRoute) {}

  private options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzMwNWFhNjU4MmVkY2Q4OTAxZGNkYmI5YmIyZTlkZSIsIm5iZiI6MTcyNzI4NjkwNC4wMzAxNDIsInN1YiI6IjY2ZjJjOGNmMmQ5OGQ1OWNlMTNiNWQ1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hNu3P360UiWqidexyesOItpGvXYyC9USMjkBc6Nxz10'
    }
  };

  async ngOnInit(): Promise<void> {
    // Retrieve the parameter from the route
    this.movieID = this.route.snapshot.paramMap.get('data')!;
    console.log(this.movieID);

    await fetch(`https://api.themoviedb.org/3/movie/${this.movieID}/recommendations?language=en-US&page=1`, this.options)
    .then(res => res.json())
    .then(async data => {
      if(data==null){
        await fetch(`https://api.themoviedb.org/3/tv/${this.movieID}/recommendations?language=en-US&page=1`, this.options)
        .then(res => res.json())
        .then(data => {
          data.results.forEach((e:any) => {
            this.movies.push({
              imgUrl: e.poster_path,
              movieTitle:e.name,
              overview: e.overview
            });
          });
        })
      }
      else{
      data.results.forEach((e:any) => {
        this.movies.push({
          imgUrl: e.poster_path,
          movieTitle:e.name,
          overview: e.overview
        });
    
      });
    }
    })
    
    .catch(err => console.error(err));

    setTimeout(()=> {for(let i = 0; i < this.movies.length; i++) {
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
