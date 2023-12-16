import { Model, ObjectID } from "@tsed/mongoose";
import {Default, Property} from "@tsed/schema";
@Model()
export class MentorshipModel {
  @ObjectID("id")
  _id: string;
  @Property()
  name: string;

  @Property()
  menteeId: string;


  @Property()
  mentorId: string;

  @Property()
  @Default(Date.now)
  startDate: Date;

  @Property()
  ended:boolean;

  @Property()
  active: string;

  @Property()
  finalGrade:number;
}
