import { Injectable } from '@nestjs/common';
import * as verbs from './data.json';

@Injectable()
export class VerbsService {
   constructor() {
      console.log(verbs);
   }
   getRandomVerb() {
      const index = Math.floor(Math.random() * this.verbs.length);
      const forms = this.verbs[index];
      return { forms, index };
   }
   get verbs() {
      return verbs;
   }
}
