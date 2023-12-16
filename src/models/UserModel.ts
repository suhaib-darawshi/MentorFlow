import { Model, ObjectID } from "@tsed/mongoose";
import {Property} from "@tsed/schema";


@Model()
export class UsersModel {

  @ObjectID('id')
  _id: string;

  @Property()
  firstName:string;
  
  @Property()
  lastName:string;

  @Property()
  userName:string;

  @Property()
  email:string;

  @Property()
  password:string;

  @Property()
  phone:string;

  @Property()
  location:string;

  @Property()
  linkedinProfile:string;

  @Property()
  githubProfile:string;

  @Property()
  url:string;

  @Property()
  role:string;
}
