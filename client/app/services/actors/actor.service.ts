//inject service as a dependency
import {Injectable} from '@angular/core';
//to make request to the API we use http request
//headers for manipulating headers request
import { Http,Headers} from '@angular/http';
// send data as Observable
import 'rxjs/add/operator/map';

@Injectable()
export class ActorService{
    //inject http module into the constructor
    constructor(private http:Http)
    {
        console.log('actor service');
    }

    getActors()
    {
        //we want to return the data as json
        return this.http.get('/actors').map(res => res.json());
    }

    addActor(newActor)
    {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('/actors',JSON.stringify(newActor),{headers})
        .map(res => res.json());
    }

    deleteActor(id)
    {
        return this.http.delete('/actors/'+id)
        .map(res => res.toString());
    }

    getOneActor(id)
    {
        return this.http.get('/actors/'+id)
        .map(res => res.json());
    }

    addMovieToActor(id_actor,id_movie)
    {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('/actors/'+id_actor+'/movies',{id:id_movie},{headers})
        .map(res => res.json());
    }

    removeMovieFromActor(id_actor,id_movie)
    {
        var headers = new Headers();
        headers.append('Content-Type','application/json;charset=utf-8');
        return this.http.delete('/actors/'+id_actor+'/movies/'+id_movie)
        .map(res => res.toString());
    }
}