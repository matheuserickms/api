import { PartialType } from "@nestjs/mapped-types";
import { CreateProfessorDTO } from "./create-professor.dto";

export class UpdatePatchProfessorDTO extends PartialType(CreateProfessorDTO) {}