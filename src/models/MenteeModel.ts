import { Model, ObjectID } from "@tsed/mongoose";
import { Property, array } from "@tsed/schema";
import { Details } from "src/interfaces/Experience";

@Model()
export class MenteeModel {
  @Property()
  userId: string;
  
  @Property()
  bio: string;

  @Property()
  projects: Details[];

  @Property()
  careerGoals: Details[];

  @Property()
  learningExperiences:Details[]
  
}