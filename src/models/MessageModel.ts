import { Model, ObjectID } from "@tsed/mongoose";
import {Default, Property} from "@tsed/schema";

@Model()
export class MessageModel {
  @ObjectID("id")
  _id: string;

  @Property()
  chatId:string;
  
  @Property()
  sender:string;

  @Property()
  reciever:string;

  @Property()
  @Default(Date.now)
  createdAt:Date;

  @Property()
  data:string;

  @Property()
  @Default(false)
  isReaded:boolean;

  @Property()
  messagevalue:string;
}
