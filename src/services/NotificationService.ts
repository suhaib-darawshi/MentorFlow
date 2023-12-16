import {Inject, Injectable} from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import mongoose from "mongoose";
import { NotificationDtoModel, createNotDTO } from "src/models/NotificationDtoModel";
import { NotificationModel } from "src/models/NotificationModel";
import { UsersModel } from "src/models/UserModel";

@Injectable()
export class NotificationService {
constructor(@Inject(NotificationModel) private notificationModel :MongooseModel<NotificationModel>,@Inject(UsersModel) private userModel:MongooseModel<UsersModel>){}
async getNotfication(userId:string){
    let nots= await this.notificationModel.find({to:userId});
    let notsDTO:NotificationDtoModel[]=[];
    for(const not of nots){
        let u=await this.userModel.findById(new mongoose.Types.ObjectId(not.userid))
        if(u==null){
            continue;
        }
        notsDTO.push(createNotDTO(not,u.url));
    }
    return notsDTO;
}    
async create(not:NotificationModel){
    return await this.notificationModel.create(not);
}
}
