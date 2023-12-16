import { Model, ObjectID } from "@tsed/mongoose";
import {Property} from "@tsed/schema";
@Model()
export class RatingModel {
  @ObjectID("id")
  _id: string;
  
  @Property()
  mentorId:string;

  @Property()
  menteeId:string;

  @Property()
  rating:number;
}
