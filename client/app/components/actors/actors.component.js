"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var actor_service_1 = require("../../services/actors/actor.service");
var movie_service_1 = require("../../services/movies/movie.service");
var ActorComponent = (function () {
    //we inject ActorService into ActorComponent
    function ActorComponent(actorService, movieService) {
        var _this = this;
        this.actorService = actorService;
        this.movieService = movieService;
        //getActors is an observable so we need to subscribe to it
        this.actorService.getActors().
            subscribe(function (actors) {
            _this.actors = actors;
        });
        this.movieService.getMovies().
            subscribe(function (movies) {
            _this.movies = movies;
        });
    }
    ActorComponent.prototype.onSearch = function (movie, actor) {
        if (actor.movies.length == 0) {
            return false;
        }
        else {
            for (var j = 0; j < actor.movies.length; j++) {
                if (actor.movies[j] == movie._id) {
                    return true;
                }
            }
            return false;
        }
    };
    ActorComponent.prototype.updateMovieStatus = function (actor, movie, found) {
        var actors = this.actors;
        if (found) {
            /* this.actorService.removeMovieFromActor(actor.id,movie.id)
             .subscribe(actor => {
              this.actorService.getActors().
             subscribe(actors => {
                 this.actors = actors;
             });
             
             })*/
        }
        else {
            this.actorService.addMovieToActor(actor.id, movie.id)
                .subscribe(function (actor) {
                for (var i = 0; i < actors.length; i++) {
                    if (actors[i].id == actor.id) {
                        actors[i] = actor;
                    }
                }
            });
        }
    };
    ActorComponent.prototype.addActor = function (event) {
        var _this = this;
        //for not submit
        event.preventDefault();
        var newActor = {
            name: this.name,
            birth_year: this.birth_year,
            movies: []
        };
        this.actorService.addActor(newActor)
            .subscribe(function (actor) {
            _this.actors.push(actor);
            _this.name = '';
            _this.birth_year = null;
        });
    };
    ActorComponent.prototype.DeleteActor = function (id) {
        var actors = this.actors;
        this.actorService.deleteActor(id).subscribe(function (data) {
            for (var i = 0; i < actors.length; i++) {
                if (actors[i].id == id) {
                    actors.splice(i, 1);
                }
            }
        });
    };
    ActorComponent.prototype.getActor = function (id) {
        var actor;
        this.actorService.getOneActor(id).subscribe(function (actor) {
            actor = actor;
        });
        return actor;
    };
    return ActorComponent;
}());
ActorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'actors',
        templateUrl: 'actors.component.html'
    }),
    __metadata("design:paramtypes", [actor_service_1.ActorService, movie_service_1.MovieService])
], ActorComponent);
exports.ActorComponent = ActorComponent;
//# sourceMappingURL=actors.component.js.map