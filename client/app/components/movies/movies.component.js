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
var movie_service_1 = require("../../services/movies/movie.service");
var actor_service_1 = require("../../services/actors/actor.service");
var MovieComponent = (function () {
    //we inject ActorService into ActorComponent
    function MovieComponent(movieService, actorService) {
        var _this = this;
        this.movieService = movieService;
        this.actorService = actorService;
        //getActors is an observable so we need to subscribe to it
        this.movieService.getMovies().
            subscribe(function (movies) {
            _this.movies = movies;
        });
        this.actorService.getActors().
            subscribe(function (actors) {
            _this.actors = actors;
        });
    }
    MovieComponent.prototype.onSearch = function (actor, movie) {
        if (movie.actors.length == 0) {
            return false;
        }
        else {
            for (var j = 0; j < movie.actors.length; j++) {
                if (movie.actors[j] == actor._id) {
                    return true;
                }
            }
            return false;
        }
    };
    MovieComponent.prototype.updateMovieStatus = function (movie, actor, found) {
        var movies = this.movies;
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
            this.movieService.addActorToMovie(movie.id, actor.id)
                .subscribe(function (movie) {
                for (var i = 0; i < movies.length; i++) {
                    if (movies[i].id == movie.id) {
                        movies[i] = movie;
                    }
                }
            });
        }
    };
    MovieComponent.prototype.addMovie = function (event) {
        var _this = this;
        //for not submit
        event.preventDefault();
        var newMovie = {
            title: this.title,
            year: this.year,
            movies: []
        };
        this.movieService.addMovie(newMovie)
            .subscribe(function (movie) {
            _this.movies.push(movie);
            _this.title = '';
            _this.year = null;
        });
    };
    MovieComponent.prototype.DeleteMovie = function (id) {
        var movies = this.movies;
        this.movieService.deleteMovie(id).subscribe(function (data) {
            for (var i = 0; i < movies.length; i++) {
                if (movies[i].id == id) {
                    movies.splice(i, 1);
                }
            }
        });
    };
    return MovieComponent;
}());
MovieComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'movies',
        templateUrl: 'movies.component.html'
    }),
    __metadata("design:paramtypes", [movie_service_1.MovieService, actor_service_1.ActorService])
], MovieComponent);
exports.MovieComponent = MovieComponent;
//# sourceMappingURL=movies.component.js.map