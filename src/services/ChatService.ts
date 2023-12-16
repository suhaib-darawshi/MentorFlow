import {Inject, Injectable} from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { EventModel } from "src/models/EventModel";
import { ChatModel } from "src/models/ChatModel";
import { MessageService } from "./MessageService";
import { ChatsDtoModel, fromChatUser, toChatUser } from "src/models/ChatsDtoModel";
import { UsersModel } from "src/models/UserModel";
import mongoose from "mongoose";

ChatModel
@Injectable()
export class ChatService {
    constructor(@Inject(ChatModel)private chatModel:MongooseModel<ChatModel>
    ,@Inject(MessageService)private messageservices:MessageService,
    @Inject(UsersModel) private userModel: MongooseModel<UsersModel>){}
    async getAll(id:string){
        let chats= await this.chatModel.find({
            $or: [
              { first_user: id },
              { second_user: id }
            ]
          });
          let chatsDTO:ChatsDtoModel[]=[];
          for(const chat of chats){
            let user =await this.userModel.findById(new mongoose.Types.ObjectId(chat.first_user==id?chat.second_user:chat.first_user));
            if(user==null){
                continue;
            }
            let messages=await this.messageservices.get_by_chatID(chat.id);
            let message=messages[messages.length-1];
            
            chatsDTO.push(fromChatUser(chat,user,message));
          }
          return chatsDTO;
    }
    async getOne(id:string){
        return await this.chatModel.find({_id:id});
    }
    async getchat_messages(id:string,userid:string){
        let chat=await this.chatModel.findById(new mongoose.Types.ObjectId(id));
        if(chat == null){
            return;
        }
        let messages=await this.messageservices.get_by_chatID(id);
        let user =await this.userModel.findById(new mongoose.Types.ObjectId(chat.first_user==userid?chat.second_user:chat.first_user));
            if(user==null){
                return ;
            }
        return toChatUser(chat,user,messages);
        
        
    }
}
