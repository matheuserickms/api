import { PartialType } from "@nestjs/mapped-types";
import { CreateAppointmentStatusDTO } from "./create-appointment-status.dto";

export class UpdatePatchAppointmentStatusDTO extends PartialType(CreateAppointmentStatusDTO) {
} 