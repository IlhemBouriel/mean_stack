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
//inject service as a dependency
var core_1 = require("@angular/core");
//to make request to the API we use http request
//headers for manipulating headers request
var http_1 = require("@angular/http");
// send data as Observable
require("rxjs/add/operator/map");
var MovieService = (function () {
    //inject http module into the constructor
    function MovieService(http) {
        this.http = http;
        console.log('movie service');
    }
    MovieService.prototype.getMovies = function () {
        //we want to return the data as json
        return this.http.get('/movies').map(function (res) { return res.json(); });
    };
    MovieService.prototype.addMovie = function (newMovie) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/movies', JSON.stringify(newMovie), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MovieService.prototype.deleteMovie = function (id) {
        return this.http.delete('/movies/' + id)
            .map(function (res) { return res.toString(); });
    };
    MovieService.prototype.addActorToMovie = function (id_movie, id_actor) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/movies/' + id_movie + '/actors', { id: id_actor }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MovieService.prototype.removeActorFromMovie = function (id_movie, id_actor) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        return this.http.delete('/movies/' + id_movie + '/actors/' + id_actor)
            .map(function (res) { return res.toString(); });
    };
    return MovieService;
}());
MovieService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map