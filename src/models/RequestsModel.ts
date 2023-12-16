import { Model, ObjectID } from "@tsed/mongoose";
import {Default, Property} from "@tsed/schema";
@Model()
export class RequestsModel {
  @ObjectID("id")
  _id: string;
  @Property()
  menteeId:string;

  @Property()
  mentorId:string;

  @Property()
  name:string;
   
  @Property()
  @Default(Date.now())
  date:Date;

  @Property()
  @Default(false)
  accepted:boolean;

}
