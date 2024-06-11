import { PartialType } from "@nestjs/mapped-types"
import { CreateClinicalRecordDTO } from "./create-clinical-recrod.dto"

export class UpdatePatchClinicalRecordDTO extends PartialType(CreateClinicalRecordDTO) {}