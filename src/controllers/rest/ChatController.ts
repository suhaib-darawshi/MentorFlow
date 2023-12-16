import { BodyParams, MultipartFile, PathParams, PlatformMulterFile } from "@tsed/common";
import {Controller, Inject} from "@tsed/di";
import {Get, Post} from "@tsed/schema";
import path from "path";
import { ChatService } from "src/services/ChatService";
import { CustomSocketService } from "src/services/CustomSocketService";
import { MessageService } from "src/services/MessageService";
@Controller("/chat")
export class ChatController {
  constructor(@Inject(ChatService)private chatService:ChatService
  ,@Inject(MessageService)private messageservice:MessageService,
  @Inject(CustomSocketService)private soc:CustomSocketService
  ){}
  @Get("/:userId")
  getAll(@PathParams("userId")id:string){
    return this.chatService.getAll(id);
  }

@Get("/:id/:userid")
getchat_messages(@PathParams("id")id:string,@PathParams("userid")userid:string){
  
  return this.chatService.getchat_messages(id,userid)
}

@Post("/:id/message")
creatmessage(@PathParams("id")id:string, @BodyParams("sender") sender:string, @BodyParams("reciever") reciever:string, @BodyParams("message_value") message_value:string)
{
  return this.messageservice.creatMessage(id,sender,reciever,message_value)
}

} 


