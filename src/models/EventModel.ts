import { Model, ObjectID } from "@tsed/mongoose";
import {Property} from "@tsed/schema";
@Model()
export class EventModel {
  @ObjectID("id")
  _id: string;

  @Property()
  name:string;

  @Property()
  address:string;

  @Property()
  time:Date;

  @Property()
  description:string;

  @Property()
  mentorId:string;

}
