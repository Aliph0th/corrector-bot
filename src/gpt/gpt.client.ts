import axios, { AxiosInstance } from 'axios';
import { GPTModuleOptions, IGPTRequest, IGPTResponse, IGPTClient } from '../interfaces';

export class GPTClient implements IGPTClient {
   private readonly client: AxiosInstance;
   constructor(options: GPTModuleOptions) {
      this.client = axios.create(options);
   }

   async request(request: IGPTRequest) {
      const { data } = await this.client.post<IGPTResponse>('/completions', request);
      return data;
   }
}
