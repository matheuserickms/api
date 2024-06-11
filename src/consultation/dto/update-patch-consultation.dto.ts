import { PartialType } from "@nestjs/mapped-types";
import { CreateConsultationDTO } from "./create-consultation.dto";

export class UpdatePatchConsultationDTO extends PartialType(CreateConsultationDTO) {}