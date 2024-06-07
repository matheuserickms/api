import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AnamneseModule } from './anamnese/anamnese.module';

@Module({
  imports: [UserModule, AnamneseModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule { }
