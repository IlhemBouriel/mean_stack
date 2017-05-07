//inject service as a dependency
import {Injectable} from '@angular/core';
//to make request to the API we use http request
//headers for manipulating headers request
import { Http,Headers} from '@angular/http';
// send data as Observable
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService{
    //inject http module into the constructor
    constructor(private http:Http)
    {
        console.log('movie service');
    }

    getMovies()
    {
        //we want to return the data as json
        return this.http.get('/movies').map(res => res.json());
    }

    addMovie(newMovie)
    {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('/movies',JSON.stringify(newMovie),{headers})
        .map(res => res.json());
    }

    deleteMovie(id)
    {
        return this.http.delete('/movies/'+id)
        .map(res => res.toString());
    }

    addActorToMovie(id_movie,id_actor)
    {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('/movies/'+id_movie+'/actors',{id:id_actor},{headers})
        .map(res => res.json());
    }

    removeActorFromMovie(id_movie,id_actor)
    {
        var headers = new Headers();
        headers.append('Content-Type','application/json;charset=utf-8');
        return this.http.delete('/movies/'+id_movie+'/actors/'+id_actor)
        .map(res => res.toString());
    }
}