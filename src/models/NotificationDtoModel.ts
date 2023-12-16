import { ObjectID } from "@tsed/mongoose";
import {Property} from "@tsed/schema";
import { NotificationModel } from "./NotificationModel";

export class NotificationDtoModel {
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
  createdAt: Date;

  @Property()
  userURL:string;
}
export function createNotDTO(not:NotificationModel,url:string){
  let notDTO=new NotificationDtoModel();
  notDTO.userid=not.userid;
  notDTO.to=not.to;
  notDTO.isShowed=not.isShowed;
  notDTO.createdAt=not.createdAt;
  notDTO.description=not.description;
  notDTO.userURL=url;
  notDTO._id=not._id;
  return notDTO;
}