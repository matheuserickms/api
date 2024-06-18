import { PartialType } from "@nestjs/mapped-types";
import { CreateNotificationTypeDTO } from "./create-notification-type.dto";

export class UpdatePatchNotificationTypeDTO extends PartialType(CreateNotificationTypeDTO) {}