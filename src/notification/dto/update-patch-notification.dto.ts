import { PartialType } from "@nestjs/mapped-types";
import { CreateNotificationDTO } from "./create-notification.dto";

export class UpdatePatchNotificationDTO extends PartialType(CreateNotificationDTO) { }