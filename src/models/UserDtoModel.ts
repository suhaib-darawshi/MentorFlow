import { Property } from "@tsed/schema";

import { Details } from "src/interfaces/Experience";
import { UsersModel } from "./UserModel";
import { MentorModel } from "./MentorModel";
import { ObjectID } from "@tsed/mongoose";
import { MenteeModel } from "./MenteeModel";
import { memoryStorage } from "multer";

export class UserDTO {
  @ObjectID("id")
  _id: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  phone: string;

  @Property()
  location: string;

  @Property()
  linkedinProfile: string;

  @Property()
  githubProfile: string;

  @Property()
  url: string;

  @Property()
  role: string;

  @Property()
  bio: string;

  @Property()
  experience: Details[];

  @Property()
  fields: Details[];

  @Property()
  projects: Details[];

  @Property()
  careerGoals: Details[];

  @Property()
  learningExperiences: Details[];

  toUserModel(): UsersModel {
    const user = new UsersModel();
    user._id = this._id;
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.email = this.email;
    user.password = this.password;
    user.phone = this.phone;
    user.location = this.location;
    user.linkedinProfile = this.linkedinProfile;
    user.githubProfile = this.githubProfile;
    user.url = this.url;
    user.role = this.role;
    return user;
  }
  fromUserMentor(user:UsersModel,mentor:MentorModel){
    this._id=user._id ;
    this.firstName=user.firstName;
    this.lastName=user.lastName;
    this.email=user.email;
    this.password=user.password;
    this.phone=user.phone;
    this.location=user.location;
    this.linkedinProfile=user.linkedinProfile;
    this.githubProfile=user.githubProfile;
    this.url=user.url;
    this.role=user.role;
    this.bio=mentor.bio;
    this.experience=mentor.experience;
    this.fields=mentor.fields;
    return ;
  }

  toMentorModel(): MentorModel {
    const mentor = new MentorModel();
    mentor.bio = this.bio;
    mentor.experience = this.experience;
    mentor.fields = this.fields;
    mentor.userId = this._id;
    return mentor;
  }
  toMenteeModel(): MenteeModel {
    const mentee = new MenteeModel();
    mentee.userId = this._id;
    mentee.bio = this.bio;
    mentee.careerGoals = this.careerGoals;
    mentee.learningExperiences = this.learningExperiences;
    mentee.projects = this.projects;
    return mentee;
  }
}
export function fromUserMentor(user:UsersModel,mentor:MentorModel){
  const userDTO=new UserDTO();
  userDTO._id=user._id;
  userDTO.firstName = user.firstName;
  userDTO.lastName = user.lastName;
  userDTO.email = user.email;
  userDTO.password = user.password;
  userDTO.phone = user.phone;
  userDTO.location = user.location;
  userDTO.linkedinProfile = user.linkedinProfile;
  userDTO.githubProfile = user.githubProfile;
  userDTO.url = user.url;
  userDTO.role = user.role;
  userDTO.bio=mentor.bio;
  userDTO.experience=mentor.experience;
  userDTO.fields=mentor.fields;
  return userDTO;
}
export function fromUserMentee(user:UsersModel,mentee:MenteeModel){
  const userDTO=new UserDTO();
  userDTO._id=user._id;
  userDTO.firstName = user.firstName;
  userDTO.lastName = user.lastName;
  userDTO.email = user.email;
  userDTO.password = user.password;
  userDTO.phone = user.phone;
  userDTO.location = user.location;
  userDTO.linkedinProfile = user.linkedinProfile;
  userDTO.githubProfile = user.githubProfile;
  userDTO.url = user.url;
  userDTO.role = user.role;
  userDTO.bio=mentee.bio;
  userDTO.careerGoals=mentee.careerGoals;
  userDTO.projects=mentee.projects;
  userDTO.learningExperiences=mentee.learningExperiences;
  return userDTO;
}