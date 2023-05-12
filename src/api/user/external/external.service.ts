import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '@/api/user/todo/todo.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class ExternalService {
    public async getPersons() {
        const response = await axios.get('http://swapi.dev/api/people')

        return response.data
    };
}