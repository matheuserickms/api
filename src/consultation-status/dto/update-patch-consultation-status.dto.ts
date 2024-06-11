import { PartialType } from "@nestjs/mapped-types"
import { CreateConsultationStatusDTO } from "./create-consultation-status.dto"

export class UpdatePatchConsultationStatusDTO extends PartialType(CreateConsultationStatusDTO){

}