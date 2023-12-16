import { MultipartFile, PlatformMulterFile } from "@tsed/common";
import {Controller, Inject} from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import {Get, Post} from "@tsed/schema";
import { MentorshipModel } from "src/models/MentorshipModel";
import { RequestsModel } from "src/models/RequestsModel";
import { UserDTO } from "src/models/UserDtoModel";
import { MentorshipService } from "src/services/MentorshipService";

@Controller("/mentorship")
export class MentorshipController {
  constructor(@Inject(MentorshipService) private mentorshipServices :MentorshipService,@Inject(RequestsModel)private reqmod:MongooseModel<RequestsModel>){
    

  }
  @Get("/")
  get(){
    return "get in mentorship"
  }
  @Get("/userId")
  async getMentorshipsByUserId(@QueryParams("userId") userId:string) {
    console.log("hello");
    return await this.mentorshipServices.getMentroshipByUserId(userId);
    //http://localhost:8083/rest/mentorship/userId?userId=1
  }
  

  @Post("/endMentroship")
  endMentroshipPlan(@MultipartFile('file') file:PlatformMulterFile,@BodyParams('mentroshipId')mentoshipId:string){
    return this.mentorshipServices.endMentroshipPlan(mentoshipId);
  }
  @Get('/finalGrade')
  getFinalGrade(@QueryParams("mentorShipId") mentroshipiId:string){
    const m= this.mentorshipServices.getTheFinalGrade(mentroshipiId);
    if (m==null){
      return "the mentorhsip Not exist";
    }
    return m;
  }
  @Post("/:event")
  async approve(@MultipartFile('file') file:PlatformMulterFile,@PathParams("event")method:string,@BodyParams()req:RequestsModel){
    let reqq =await this.reqmod.findById(req);
    if(reqq==null){
      return;
    }
    await this.reqmod.findByIdAndDelete(reqq.id);
    if(method=="approve"){
      
      return await this.mentorshipServices.createMentorShip(req);
    }
  }


}
