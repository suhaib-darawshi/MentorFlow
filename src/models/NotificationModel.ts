import { Model, ObjectID } from "@tsed/mongoose";
import {Default, Property} from "@tsed/schema";
@Model()
export class NotificationModel {
  @ObjectID("id")
  _id:string;

  @Property()
  userid: string;

  @Property()
  to:string;

  @Property()
  isShowed: boolean;

  @Property()
  description: string;

  @Property()
  @Default(Date.now())
  createdAt: Date;

}
