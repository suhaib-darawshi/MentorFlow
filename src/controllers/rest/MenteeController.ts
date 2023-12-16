import {
  BodyParams,
  MultipartFile,
  PathParams,
  PlatformMulterFile,
} from "@tsed/common";
import { Controller, Inject } from "@tsed/di";
import { Get, Post, Put } from "@tsed/schema";
import { promises } from "dns";
import { MenteeModel } from "src/models/MenteeModel";
import { RatingModel } from "src/models/RatingModel";
import { RequestsModel } from "src/models/RequestsModel";
import { UserDTO } from "src/models/UserDtoModel";
import { UsersModel } from "src/models/UserModel";
import { MenteeService } from "src/services/MenteeService";
import { UserService } from "src/services/UserService";
import { fromUserMentee } from "src/models/UserDtoModel";
import { CustomSocketService } from "src/services/CustomSocketService";
@Controller("/mentee")
export class MenteeController {
  constructor(
    @Inject(MenteeService) private menteeService: MenteeService,
    @Inject(UserService) private userService: UserService,
    @Inject(CustomSocketService)private soc:CustomSocketService
  ) {}

  @Get("/:id")
  async getMenteeProfile(@PathParams("id") userID: string) {
    let mentee = await this.menteeService.getMentee(userID);

    let user = await this.userService.getById(userID);
    if (mentee == null || user == null) {
      return null;
    }
    let usDTO = new UserDTO();
    usDTO = fromUserMentee(user, mentee);
    return usDTO;
  }
  @Put("/")
  async createMenteeProfile(
    @MultipartFile("file") file: PlatformMulterFile,
    @BodyParams() mentee: MenteeModel
  ) {
    return await this.menteeService.putMenteeAllData(mentee);
  }
  @Post("/update")
  async updateInfo(
    @MultipartFile("file") file: PlatformMulterFile,
    @BodyParams() user: UserDTO
  ) {
    let u = user.toUserModel();
    let added = await this.userService.updateInfo(u);
    let mentor = user.toMenteeModel();
    return await this.menteeService.create(mentor);
  }
  @Put("/req")
  request(
    @MultipartFile("file") file: PlatformMulterFile,
    @BodyParams() req: RequestsModel
  ) {
    this.soc.sendEventToClient(req.mentorId,"notify");
    return this.menteeService.request(req);
  }
  @Get("/req/:id")
  async getRequests(@PathParams() id: string) {
    return this.menteeService.getReq(id);
  }
  @Post("/rate")
  async rate(
    @MultipartFile("file") file: PlatformMulterFile,
    @BodyParams() rating: RatingModel
  ) {
    return await this.menteeService.rate(rating);
  }
}
