import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Get, Post, Put } from "@tsed/schema";
import { UsersModel } from "../../models/UserModel";
import { UserService } from "../../services/UserService";
import { MulterOptions, MultipartFile, PlatformMulterFile } from "@tsed/common";
import { UserDTO } from "src/models/UserDtoModel";
import { MentorService } from "src/services/MentorService";
import { MenteeService } from "src/services/MenteeService";

@Controller("/user")
export class UserController {
  constructor(
    @Inject(MenteeService) private menteeService: MenteeService,
    @Inject(UserService) private userService: UserService,
    @Inject(MentorService) private mentorService: MentorService
  ) {}

  @Put("/mentor")
  async createMentor(
    @MultipartFile("file") file: PlatformMulterFile,
    @BodyParams() user: UserDTO
  ) {
    let u = user.toUserModel();
    let added = await this.userService.create(u);
    let mentor = user.toMentorModel();
    mentor.userId = added!._id;
    return await this.mentorService.create(mentor);
  }

  @Put("/mentiee")
  async createUser(
    @MultipartFile("file") file: PlatformMulterFile,
    @BodyParams() user: UserDTO
  ) {
    let u = user.toUserModel();
    let added = await this.userService.create(u);
    let mentee = user.toMenteeModel();
    mentee.userId = added!._id;
    return await this.menteeService.create(mentee);
  }

  @Post("/signin")
  signin(
    @MultipartFile("file") file: PlatformMulterFile,
    @BodyParams() user: UsersModel
  ) {
    return this.userService.signIn(user);
  }
  @Post("/mail")
  mailTo(
    @MultipartFile("file") file: PlatformMulterFile,
    @BodyParams() user: UsersModel
  ) {
    return this.userService.confirmEmail(user);
  }
  @Post("/upload_image")
  @MulterOptions({ dest: "./public/uploads/userImages" })
  upload(
    @MultipartFile("file") file: PlatformMulterFile,
    @BodyParams() user: UsersModel
  ) {
    
    user.url = "public/uploads/userImages/" + file.filename;
    return this.userService.updateInfo(user);
  }
  @Post("/updateUserInfo")
  updateUser(
    @MultipartFile("file") file: PlatformMulterFile,
    @BodyParams() user: UsersModel
  ) {
    return this.userService.updateInfo(user);
  }
  @Get("/:id")
  getUser(@PathParams("id") id: string) {
    return this.userService.getById(id);
  }
}
