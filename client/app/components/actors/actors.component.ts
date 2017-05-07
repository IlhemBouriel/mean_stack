import { Component , Input } from '@angular/core';
import {ActorService} from '../../services/actors/actor.service';
import {MovieService} from '../../services/movies/movie.service';
import {MovieComponent} from '../movies/movies.component';
import {Actor} from '../../../Actor';
import {Movie} from '../../../Movie';


@Component({
    moduleId:module.id,
  selector: 'actors',
  templateUrl:'actors.component.html'
})
export class ActorComponent {
    actors:Actor[];
    name:string;
    birth_year:number;
    movies:Movie[];
    actorService :ActorService;
    movieService: MovieService
 //initialize Actor Compoentn
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

onSearch(movie,actor)
    {
      
  
      if (actor.movies.length == 0)
      {
          return false;
      }
      else
      {
          for (var j=0 ; j<actor.movies.length ; j++)
                        {
                            if (actor.movies[j] == movie._id)
                            {
                                return true;
                            }
                        }
                        return false;
      }
    
    }


    updateMovieStatus(actor,movie,found)
    {
       var actors = this.actors;
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
        this.actorService.addMovieToActor(actor.id,movie.id)
        .subscribe(actor => 
        {
        for (var i = 0 ; i<actors.length;i++)
            {
                if (actors[i].id == actor.id)
                {
                    actors[i]=actor;
                }
            }
        });

        }
        
    }

addActor(event)
{
    //for not submit
    event.preventDefault();
    var newActor = {
        name:this.name,
        birth_year:this.birth_year,
        movies:[]
    };

    this.actorService.addActor(newActor)
    .subscribe(actor => 
    {
        this.actors.push(actor);
        this.name='';
        this.birth_year=null;
    });
}

DeleteActor(id)
{
    var actors = this.actors;
    this.actorService.deleteActor(id).subscribe(data => {
         for (var i = 0 ; i<actors.length;i++)
            {
                if (actors[i].id == id)
                {
                    actors.splice(i,1);
                }
            }
        
    })
}

getActor(id)
{
    var actor;
    this.actorService.getOneActor(id).subscribe(actor => {
            actor = actor;
        });
      return actor;
}

}