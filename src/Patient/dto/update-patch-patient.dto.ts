import { PartialType } from "@nestjs/mapped-types";
import { CreatePatientDTO } from "./create-patient.dto";

export class UpdatePatchPatientDTO extends PartialType(CreatePatientDTO) { }