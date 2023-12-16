
import { BodyParams, MultipartFile, PathParams, PlatformMulterFile } from '@tsed/common';
import { Server } from './../../Server';
import {Controller, Inject} from "@tsed/di";
import {Get, Post} from "@tsed/schema";
import { MessageService } from "src/services/MessageService";
import { MessageModel } from 'src/models/MessageModel';
import { CustomSocketService } from 'src/services/CustomSocketService';

@Controller("/hello-world")
export class HelloWorldController {
  constructor(@Inject(MessageService)private messageService:MessageService,@Inject(CustomSocketService)private soc:CustomSocketService){}
  @Get("/")
  get() {
    return this.messageService.get();
  }
  @Post("/")
  message(@MultipartFile("file")file:PlatformMulterFile,@BodyParams()message:MessageModel){
    return this.messageService.add(message);
  }
  @Post("/:id")
  event(@PathParams("id")id:string){
    
    return this.soc.sendEventToClient(id,id);
  }

}
