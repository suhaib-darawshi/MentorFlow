import {Inject, Injectable} from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { MentorshipModel } from "src/models/MentorshipModel";
import { TasksModel } from "src/models/TasksModel";

@Injectable()
export class TaskService {
    constructor(
        @Inject(TasksModel) private taskModel:MongooseModel<TasksModel>
        ,@Inject(MentorshipModel) private mentorShipModel:MongooseModel<MentorshipModel>
    ){}
   async addTask(task:TasksModel){
     const haveMentorShipPlan=await this.mentorShipModel.findById(task.mentorShipId);
     if (haveMentorShipPlan==null){
        return "u can't add task to people that not in your mentorship plan";
     }
    await this.taskModel.create(task);
    return "task added sucssfully";
   }
   async getTasksForMentorship(mentorshipID:string){
    return await this.taskModel.find({mentorShipId:mentorshipID});
   }
   async mentroGradeTask(taskId:string ,grade:number){
    let task:TasksModel|null=await this.taskModel.findById(taskId);
    if(task==null){

        return task;
    }
    
    task.grade=grade;
    task.isGraded=true;
    
    
    await this.taskModel.findByIdAndUpdate(task._id,task);
    return task;
   }

}
