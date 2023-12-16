import { Model, ObjectID } from "@tsed/mongoose";
import {Default, Property} from "@tsed/schema";
import { Details } from "src/interfaces/Experience";
@Model()
export class MentorModel {
  @Property()
  userId: string;

  @Property()
  bio: string;

  @Property()
  experience: Details[];

  @Property()
  fields: Details[];

  @Property()
  @Default(2)
  rating:number;
}
