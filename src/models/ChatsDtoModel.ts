import { ObjectID } from "@tsed/mongoose";
import {Property} from "@tsed/schema";
import { ChatModel } from "./ChatModel";
import { UsersModel } from "./UserModel";
import { MessageModel } from "./MessageModel";

export class ChatsDtoModel {
  @ObjectID("id")
  _id: string;

  @Property()
  first_user:string;

  @Property()
  second_user:string;

  @Property()
  receiver:string;
  
  @Property()
  url:string;

  @Property()
  username:string;

  @Property()
  message:string;

  @Property()
  messages:MessageModel[];

  @Property()
  isRead:boolean;

  @Property()
  date:Date;
}
export function fromChatUser(chat:ChatModel,user:UsersModel,message:MessageModel){
  let dto=new ChatsDtoModel();
  dto._id=chat._id;
  dto.date=message.createdAt;
  dto.first_user=chat.first_user;
  dto.second_user=chat.second_user;
  dto.receiver=user._id;
  dto.message=message.data;
  dto.url=user.url;
  dto.isRead=message.isReaded;
  dto.username=user.userName;
  return dto;
}
export function toChatUser(chat:ChatModel,user:UsersModel,messages:MessageModel[]){
  let dto=new ChatsDtoModel();
  dto._id=chat._id;
  dto.first_user=chat.first_user;
  dto.second_user=chat.second_user;
  dto.receiver=user._id;
  dto.url=user.url;
  dto.username=user.userName;
  dto.messages=messages;
  return dto;
}
