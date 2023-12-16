import {Inject, Injectable} from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import mongoose from "mongoose";
import { MentorshipModel } from "src/models/MentorshipModel";
import { RequestsModel } from "src/models/RequestsModel";
import { TasksModel } from "src/models/TasksModel";
import { UserDTO } from "src/models/UserDtoModel";
import { UsersModel } from "src/models/UserModel";

@Injectable()
export class MentorshipService {
    constructor
    (
        @Inject(MentorshipModel)private mentroshipModel:MongooseModel<MentorshipModel>,
        @Inject(UsersModel) private userModel:MongooseModel<UsersModel>,
        @Inject(TasksModel) private taskModel:MongooseModel<TasksModel>
    ){
        
    }
    async getMentroshipByUserId(userId:string){
        console.log("here in getmentorship");
        const u:UsersModel |null =await this.userModel.findById( new mongoose.Types.ObjectId(userId));
        if(u==null){
            return "this user dose Not Exist";
        }
        if (u?.role=="mentor"){
            console.log(u);
            console.log("\n here");
        const mentorships :MentorshipModel[]|null=await this.mentroshipModel.find({mentorId:userId});
        if (mentorships.length===0){
            return "no mentoships match for this user";
        }
        console.log(mentorships);
        
        const mentorshipsWithNames = mentorships.map(async (mentorship) => {
            const mentee = await this.userModel.findById(mentorship.menteeId);
            console.log('mentee:', mentee);
        console.log('mentee?.firstName:', mentee?.firstName);
            return {
                mentorship,
              menteefirstName: mentee?.firstName,
              menteelastName: mentee?.lastName
            };
          });
      
          return await Promise.all(mentorshipsWithNames);;
        
        }
        else {
            const mentorships:MentorshipModel[]|null=await this.mentroshipModel.find({menteeId:userId});
            if (mentorships.length===0){
                return "no mentoships match for this user";
            } const mentorshipsWithNames = mentorships.map(async (mentorship) => {
                const mentor = await this.userModel.findById(mentorship.mentorId);
                
                return {
                    mentorship,
                  mentorfirstName: mentor?.firstName,
                  mentorlastName: mentor?.lastName
                };
              });
          
              return await Promise.all(mentorshipsWithNames);;
            
            
            
        }
    }
    

    async endMentroshipPlan(mentroshipId:string){
        const m =await this.mentroshipModel.findById(mentroshipId);
        if(m==null){
            return "this mentoshipNotExist";
        }
        if (m.ended==true){
            return "this mentorship has been ended before ";       
        }
        //calcaute the final grade here 
        const taskArr:TasksModel[]=await this.taskModel.find({id:mentroshipId,isGraded:true});
        
        const numOfTask=taskArr.length;
        let sum=0;
        for (let i =0;i<taskArr.length;i++){
            sum+=taskArr[i].grade;
        }
        let result=sum/(numOfTask);
        m.finalGrade=result;
        return await this.mentroshipModel.findByIdAndUpdate(m.id,m);
        

    }
    async createMentorShip(req:RequestsModel){
        return await this.mentroshipModel.create({menteeId:req.menteeId,mentorId:req.mentorId,name:req.name});
    }
    async getTheFinalGrade(mentorShipId:string){
        const m=await this.mentroshipModel.findById(mentorShipId);
        return m;
    }
}
