import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{

  public upcomingList:any=[];
  public popularList:any=[];
  public nowPlayingList:any=[];
  public topList:any=[];
  public upcomingTrailer:SafeResourceUrl|null=null;
  constructor(private sanitizer: DomSanitizer) {}


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

  private options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzMwNWFhNjU4MmVkY2Q4OTAxZGNkYmI5YmIyZTlkZSIsIm5iZiI6MTcyNzI4NjkwNC4wMzAxNDIsInN1YiI6IjY2ZjJjOGNmMmQ5OGQ1OWNlMTNiNWQ1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hNu3P360UiWqidexyesOItpGvXYyC9USMjkBc6Nxz10'
    }
  };

  async ngOnInit(): Promise<any> {

    
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',this.options)
      .then(response => response.json())
      .then(data =>{
        data.results.forEach((e:any) => {
          this.upcomingList.push({
            imgUrl: e.backdrop_path,
            movieTitle:e.title,
            movieID:e.id
          });
        });
      })
      .catch(err => console.error(err));


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


        for(let i=2; i<5; i++) {
         await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${i}`, this.options)
          .then(response => response.json())
          .then(data =>{
            data.results.forEach((e:any)=>{
              this.nowPlayingList.push({
                imgUrl: e.poster_path,
                overview: e.overview
              });
            })
            
          })
          .catch(err => console.error(err));
          }    
          setTimeout(()=>{for (let i = 0; i < this.nowPlayingList.length; i++) {
            document.getElementById(`nowShowOverview${i}`)?.classList.add("hide");
          }
        },50)

        
  }

  getTrailer(movieID:String):void{

    
    fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, this.options)
      .then(response => response.json())
      .then(data =>{
        data.results.forEach((e:any)=>{
          if(e.type=="Trailer"){
              this.upcomingTrailer= this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${e.key}`);
          }
        })
      })
      .catch(err => console.error(err));

  }
}
