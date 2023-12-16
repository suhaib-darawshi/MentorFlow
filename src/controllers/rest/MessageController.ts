import { BodyParams, MultipartFile, PlatformMulterFile } from '@tsed/common';
import { Server } from './../../Server';
import {Controller, Inject} from "@tsed/di";
import {Get, Post} from "@tsed/schema";
import { MessageService } from "src/services/MessageService";
import { MessageModel } from 'src/models/MessageModel';
import { CustomSocketService } from 'src/services/CustomSocketService';
@Controller("/message")
export class MessageController {
  constructor(@Inject(MessageService)private messageService:MessageService,@Inject(CustomSocketService)private soc:CustomSocketService){}
  @Get("/")
  get() {
    return this.messageService.get();
  }
  @Post("/")
  message(@MultipartFile("file")file:PlatformMulterFile,@BodyParams()message:MessageModel){
    this.soc.sendEventToClient(message.reciever,"message");
    return this.messageService.add(message);
  }
}
