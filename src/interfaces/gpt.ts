import { ModuleMetadata } from '@nestjs/common/interfaces';
import { CreateAxiosDefaults } from 'axios';

export interface IGPTClient {
   request(data: IGPTRequest): Promise<IGPTResponse>;
}
export type GPTModuleOptions = CreateAxiosDefaults & { baseURL: string };
export type GPTModuleAsyncOptions = {
   isGlobal: boolean;
   useFactory?: (...args: any[]) => Promise<GPTModuleOptions> | GPTModuleOptions;
   inject?: any[];
} & Pick<ModuleMetadata, 'imports'>;

export interface ICompletionMessage {
   content: string;
   role: 'system' | 'user' | 'assistant' | 'function';
}

export interface IGPTResponse {
   choices: Array<{ message: ICompletionMessage }>;
}

export interface IGPTRequest {
   model: 'gpt-4o';
   messages: ICompletionMessage[];
   stream: boolean;
}
