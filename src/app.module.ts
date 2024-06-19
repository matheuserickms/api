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
import { ConsultationTypeModule } from './consultation-type/consultation-type.module';
import { NotificationModule } from './notification/notification-module';
import { NotificationTypeModule } from './notification-type/notification-type.module';
import { PatientModule } from './patient/patient.module';
import { ProfessorModule } from './professor/professor.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    UserModule, 
    AnamneseModule, 
    AppointmentModule, 
    AppointmentStatusModule, 
    ClinicalRecordModule, 
    ConsultationModule,
    ConsultationStatusModule,
    ConsultationTypeModule,
    NotificationModule,
    NotificationTypeModule,
    PatientModule,
    ProfessorModule,
    StudentModule    
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule { }
