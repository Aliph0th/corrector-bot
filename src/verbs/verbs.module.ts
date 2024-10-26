import { Global, Module } from '@nestjs/common';
import { VerbsService } from './verbs.service';

@Global()
@Module({
   providers: [VerbsService],
   exports: [VerbsService]
})
export class VerbsModule {}
