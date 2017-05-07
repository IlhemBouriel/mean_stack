import { Component } from '@angular/core';
import {MovieService} from '../../services/movies/movie.service';
import {ActorService} from '../../services/actors/actor.service';
import {Movie} from '../../../Movie';
import {Actor} from '../../../Actor';
@Component({
    moduleId:module.id,
  selector: 'movies',
  templateUrl:'movies.component.html'
})
export class MovieComponent {
    movies:Movie[];
    title:string;
    year:number;
    actors:Actor[];
    actorService :ActorService;
    movieService: MovieService
 //initialize Movie Compoentn
    ngOnInit(){
       this.getAllActors();
       this.getAlllMovies();
    }

    getAllActors()
    {
        //getActors is an observable so we need to subscribe to it
       this.actorService.getActors().
        subscribe(actors => {
            this.actors = actors;
        });
    }

    getAlllMovies()
    {
        this.movieService.getMovies().
        subscribe(movies => {
            this.movies = movies;
        });
    }

    //we inject ActorService into ActorComponent
    constructor(){
       
        console.log("Actor Component");
        
    }

    onSearch(actor,movie)
    {
      
  
      if (movie.actors.length == 0)
      {
          return false;
      }
      else
      {
          for (var j=0 ; j<movie.actors.length ; j++)
                        {
                            if (movie.actors[j] == actor._id)
                            {
                                return true;
                            }
                        }
                        return false;
      }
    
    }

    updateMovieStatus(movie,actor,found)
    {
       var movies = this.movies;
        if (found)
        {
       /* this.actorService.removeMovieFromActor(actor.id,movie.id)
        .subscribe(actor => {
         this.actorService.getActors().
        subscribe(actors => {
            this.actors = actors;
        });
        
        })*/
        }
        else
        {
        this.movieService.addActorToMovie(movie.id,actor.id)
        .subscribe(movie => 
        {
        for (var i = 0 ; i<movies.length;i++)
            {
                if (movies[i].id == movie.id)
                {
                    movies[i]=movie;
                }
            }
        });

        }
    }
        

addMovie(event)
{
    //for not submit
    event.preventDefault();
    var newMovie = {
        title:this.title,
        year:this.year,
        movies:[]
    };

    this.movieService.addMovie(newMovie)
    .subscribe(movie => 
    {
        this.movies.push(movie);
        this.title='';
        this.year=null;
    });
}

DeleteMovie(id)
{
    var movies = this.movies;
    this.movieService.deleteMovie(id).subscribe(data => {
         for (var i = 0 ; i<movies.length;i++)
            {
                if (movies[i].id == id)
                {
                    movies.splice(i,1);
                }
            }
        
    })
}



}