import { PartialType } from "@nestjs/mapped-types";
import { CreateAnamneseDTO } from "./create-anamnese.dto";

export class UpdatePatchAnamnese extends PartialType(CreateAnamneseDTO) {
    
}