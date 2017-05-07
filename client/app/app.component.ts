import { Component } from '@angular/core';
import {ActorService} from './services/actors/actor.service';
import {MovieService} from './services/movies/movie.service';
@Component({
  moduleId:module.id,
  selector: 'my-app',
  templateUrl:'app.component.html',
  providers: [ActorService,MovieService],
})
export class AppComponent {
  
}