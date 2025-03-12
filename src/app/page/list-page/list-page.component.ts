import { Component, OnInit, Input  } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [HeaderComponent,NgFor,RouterLink],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {

  public movieList:any=[];
  public movies:any=[];
  JSON: any; 

  private options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzMwNWFhNjU4MmVkY2Q4OTAxZGNkYmI5YmIyZTlkZSIsIm5iZiI6MTcyNzI4NjkwNC4wMzAxNDIsInN1YiI6IjY2ZjJjOGNmMmQ5OGQ1OWNlMTNiNWQ1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hNu3P360UiWqidexyesOItpGvXYyC9USMjkBc6Nxz10'
    }
  };
  ngOnInit(): void {

    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, this.options)
    .then(response => response.json())
    .then(data =>{
      data.results.forEach((e:any)=>{
        this.movieList.push({
          imgUrl: e.poster_path,
          movieTitle:e.title,
          movieID: e.id
        });
      })
      
    })
    .catch(err => console.error(err));


    fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',this.options)
    .then(res => res.json())
    .then(data => {
      data.results.forEach((e:any) => {
        this.movieList.push({
          imgUrl: e.backdrop_path,
          movieTitle:e.name,
          movieID:e.id
        });
      });
    })
    .catch(err => console.error(err));

  
  

  }

  // getMovies(id:String):void{
  //   console.log(id);
  //   fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, this.options)
  //   .then(res => res.json())
  //   .then(data => {
  //     data.results.forEach((e:any) => {
  //       this.movies.push({
  //         imgUrl: e.backdrop_path,
  //         movieTitle:e.name,
  //         overview: e.overview
  //       });
  //     });
  //   })
  //   .catch(err => console.error(err));
  // }


}
