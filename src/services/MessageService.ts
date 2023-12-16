import { ChatModel } from './../models/ChatModel';
import {Inject, Injectable} from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { Mongoose, ObjectId } from "mongoose";
import { EventModel } from "src/models/EventModel";
import { MessageModel } from "src/models/MessageModel";

@Injectable()

export class MessageService {
    constructor(@Inject(MessageModel)private messageModel:MongooseModel<MessageModel>,@Inject(ChatModel)private chatModel:MongooseModel<ChatModel>){}
    async add(message:MessageModel){
        let chat=await this.chatModel.findOne({$or:[{first_user:message.sender,second_user:message.reciever},{first_user:message.reciever,second_user:message.sender}]})
        if(chat==null){
            
            chat=await this.chatModel.create({first_user:message.sender,second_user:message.reciever});
        }
        message.chatId=chat.id;
        
        return await this.messageModel.create(message);
    }

    async get_by_chatID(id:string){
        return await this.messageModel.find({chatId:id});
    }
    async get(){
        return await this.messageModel.find();
    }
    async sendNessage(message:MessageModel){
        let m=await this.messageModel.findOne({chatId:message.chatId});
        message.reciever=m!.reciever;
         await this.messageModel.create(message);
         return await this.messageModel.find({chatId:message.chatId})
    }
    async creatMessage(id:string,sender:string,reciever:string,messagevalue:string){
        return await this.messageModel.create({chatId:id,sender,reciever,messagevalue, isReaded: false, createdAt:new Date().getTime()});
    }
}
