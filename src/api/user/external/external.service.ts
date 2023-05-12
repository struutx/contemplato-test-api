import { Injectable, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import axios, { AxiosResponse } from "axios";

@Injectable()
export class ExternalService {

    public async getPersons() {
        try {
            const response = await axios.get('http://swapi.dev/api/people')

            return response.data;
        } catch (err) {
            throw new HttpException('Failed to fetch Data', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    public async getMovies() {
        try {
            const response = await axios.get('http://swapi.dev/api/films/')

            return response.data;
        } catch (err) {
            throw new HttpException('Failed to fetch Data', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    public async getMoviesById(movieId: number) {
        try {
            const urlId: number = movieId['movieId']
            const response = await axios.get(`http://swapi.dev/api/films/${urlId}/`)

            return response.data;
        } catch (err) {
            throw err;
        }
    };

}