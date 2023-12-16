import { Model, ObjectID } from "@tsed/mongoose";
import {Default, Property} from "@tsed/schema";
@Model()
export class TasksModel {
  
  @ObjectID("id")
  _id: string;

  @Property()
  taskFile:string;

  @Property()
  taskName:string;

  @Property()
  fileName:string;

  @Property()
  taskDescription:string;

  @Property()
  @Default(Date.now)
  startTime:Date;

  @Property()
  @Default(Date.now()+(10*24*3600*1000))
  endTime:Date;

  @Property()
  @Default(false)
  isGraded:boolean;

  @Property()
  grade:number;

  @Property()
  @Default(false)
  isSubmitted:boolean;

  
  @Property()
  @Default("")
  submissionUrl:string;

  @Property()
  mentorShipId:string;
}
