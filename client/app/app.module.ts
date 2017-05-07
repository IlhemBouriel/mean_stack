import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import {ActorComponent} from './components/actors/actors.component';
import {MovieComponent} from './components/movies/movies.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports:      [ BrowserModule , HttpModule,FormsModule],
  declarations: [ AppComponent,ActorComponent , MovieComponent ],
  bootstrap:    [ AppComponent ],
  exports: [ActorComponent,MovieComponent]
})
export class AppModule { }
