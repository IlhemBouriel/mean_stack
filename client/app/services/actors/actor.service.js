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
var ActorService = (function () {
    //inject http module into the constructor
    function ActorService(http) {
        this.http = http;
        console.log('actor service');
    }
    ActorService.prototype.getActors = function () {
        //we want to return the data as json
        return this.http.get('/actors').map(function (res) { return res.json(); });
    };
    ActorService.prototype.addActor = function (newActor) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/actors', JSON.stringify(newActor), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ActorService.prototype.deleteActor = function (id) {
        return this.http.delete('/actors/' + id)
            .map(function (res) { return res.toString(); });
    };
    ActorService.prototype.getOneActor = function (id) {
        return this.http.get('/actors/' + id)
            .map(function (res) { return res.json(); });
    };
    ActorService.prototype.addMovieToActor = function (id_actor, id_movie) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/actors/' + id_actor + '/movies', { id: id_movie }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ActorService.prototype.removeMovieFromActor = function (id_actor, id_movie) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        return this.http.delete('/actors/' + id_actor + '/movies/' + id_movie)
            .map(function (res) { return res.toString(); });
    };
    return ActorService;
}());
ActorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ActorService);
exports.ActorService = ActorService;
//# sourceMappingURL=actor.service.js.map