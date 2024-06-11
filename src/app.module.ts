import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AnamneseModule } from './anamnese/anamnese.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AppointmentStatusModule } from './appointment-status/appointment-status.module';
import { ClinicalRecordModule } from './clinical-record/clinical-record.module';
import { ConsultationModule } from './consultation/consultation.module';
import { ConsultationStatusModule } from './consultation-status/consultation-status.module';

@Module({
  imports: [
    UserModule, 
    AnamneseModule, 
    AppointmentModule, 
    AppointmentStatusModule, 
    ClinicalRecordModule, 
    ConsultationModule,
    ConsultationStatusModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule { }
