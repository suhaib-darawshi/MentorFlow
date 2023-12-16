import { MultipartFile, PlatformMulterFile } from "@tsed/common";
import {Controller, Inject} from "@tsed/di";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import {Get,Post} from "@tsed/schema";
import { Details } from "src/interfaces/Experience";
import { MentorModel } from "src/models/MentorModel";
import { MentorService } from "src/services/MentorService";


@Controller("/mentor")
export class MentorController {
  constructor(@Inject(MentorService) private mentroService :MentorService){}
  @Get("/")
  get() {
    return "hello";
  }
  @Post("/mathcedMentors")
 async getMatchedMentor(@MultipartFile("file") file: PlatformMulterFile, @BodyParams("intrests") menteeIntrests :Details[]){
    const mentors=await this.mentroService.getMatchedMentors(menteeIntrests);
    mentors.sort((mentorA, mentorB) => {
      const fieldsA = mentorA.fields || []; 
      const menteeIntrestsAsString = menteeIntrests.map(x => x.title);
      const fieldsB :Details[]= mentorB.fields || [];
      
      const matchesA = fieldsA.filter(field => menteeIntrestsAsString.includes(field.title)).length;
      const matchesB = fieldsB.filter(field => menteeIntrestsAsString.includes(field.title)).length;
      return matchesB - matchesA;
    });
    

    return mentors;

  }
  @Get("/view")
  async getAllMentors(){
    return await this.mentroService.getAllmentors();
  }
  @Get("/req/:id")
  async getRequests(@PathParams() id: string) {
    return this.mentroService.getReq(id);
  }
}
