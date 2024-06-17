import { PartialType } from "@nestjs/mapped-types";
import { CreateConsultationTypeDTO } from "./create-consultation-type.dto";

export class UpdatePatchConsultationTypeDTO extends PartialType(CreateConsultationTypeDTO){

}