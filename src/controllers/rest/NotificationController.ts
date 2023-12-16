import { MultipartFile, PlatformMulterFile } from "@tsed/common";
import {Controller, Inject} from "@tsed/di";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import {Get, Post} from "@tsed/schema";
import { NotificationModel } from "src/models/NotificationModel";
import { NotificationService } from "src/services/NotificationService";

@Controller("/notification")
export class NotificationController {
  constructor(@Inject(NotificationService) private notificationService:NotificationService){}
  @Get("/:userId")
  getNotification(@PathParams('userId') userId:string) {
    return this.notificationService.getNotfication(userId);
  }
  @Post("/")
  add(@MultipartFile("file")file:PlatformMulterFile,@BodyParams()not:NotificationModel){
    return this.notificationService.create(not);
  }
}
