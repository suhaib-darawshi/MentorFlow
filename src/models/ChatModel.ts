import { Model, ObjectID } from "@tsed/mongoose";
import {Property} from "@tsed/schema";

@Model()
export class ChatModel {
  @ObjectID("id")
  _id: string;

  @Property()
  first_user:string;

  @Property()
  second_user:string;
}
