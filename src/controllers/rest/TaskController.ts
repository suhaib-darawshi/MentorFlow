import {Controller, Inject} from "@tsed/di";
import {Get,Post} from "@tsed/schema";
import { BodyParams, MulterOptions, MultipartFile, PathParams, PlatformMulterFile } from "@tsed/common";
import { TasksModel } from "src/models/TasksModel";
import { MenteeService } from "src/services/MenteeService";
import { TaskService } from "src/services/TaskService";
import { MentorModel } from "src/models/MentorModel";

@Controller("/task")
export class TaskController {
  constructor(@Inject(TaskService) private taskService:TaskService){}
  @Get("/")
  get(@PathParams('mentorshipId') mentorshipId:string) {
    return this.taskService.getTasksForMentorship(mentorshipId);
  }
  @Post("/add-task")
  @MulterOptions({dest:"./public/uploads/tasks"})
  upload(@MultipartFile('file') file:PlatformMulterFile ,@BodyParams()task:TasksModel){
    task.taskFile='public/uploads/tasks/'+file.filename;
    task.fileName=file.originalname;
    return this.taskService.addTask(task);
  }
  @Post("/gradeTask")
  async mentorGradeTask(@MultipartFile('file') file:PlatformMulterFile, @BodyParams("taskId") taskId:string,@BodyParams("grade") grade:number){
         console.log("grade in contrlooer"+grade)
        
         if (isNaN(grade)){
          return "can't put this value in grade"
         }
    const t=await this.taskService.mentroGradeTask(taskId,grade);
     if (t==null){
      return "this task dose not exist";

     }
     return t;
    //  http://localhost:8083/rest/task/gradeTask
  }
}
