import { Inject, Injectable } from "@tsed/di";
import { UsersModel } from "../models/UserModel";
import { MongooseModel } from "@tsed/mongoose";
import { createTransport, getTestMessageUrl } from "nodemailer";
import mongoose from "mongoose";

@Injectable()
export class UserService {
  constructor(
    @Inject(UsersModel) private userModel: MongooseModel<UsersModel>
  ) {}
  async getById(idd: string) {
    return await this.userModel.findById(new mongoose.Types.ObjectId(idd));
  }
  async create(user: UsersModel) {
    let u = await this.userModel.create(user);
    return u;
  }
  async signIn(user: UsersModel) {
    let u = await this.userModel.findOne({
      email: user.email,
      password: user.password,
    });
    if (u == null) {
      return "wrong";
    }
    return u;
  }
  async getUserInfo(user: UsersModel) {
    let u = await this.userModel.findById(user._id);
    if (u == null) {
      return "user not found ";
    }
    return u;
  }
  async updateInfo(user: UsersModel) {
    let u = this.userModel.findById(user._id);
    if (u == null) {
      return "user not found";
    } else {
      return await this.userModel.findByIdAndUpdate(user._id, user);
    }
  }
  async confirmEmail(user: UsersModel) {
    let u = await this.userModel.findOne({ email: user.email });
    if (u != null) {
      return "email already signed up";
    }
    let x1: Number = Math.random() * 899999 + 100000;
    let x: string = x1.toFixed(0);
    var transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "MentorFlow1@gmail.com",
        pass: "bbleqodubcojemnr",
      },
      secure: true,
      logger: true,
      debug: true,
    });
    await transport.sendMail({
      subject: "Confirm Your SignUp :",
      from: "Mentor Flow",
      to: user.email,
      text:
        "Hi ,\n you've tried to sign up to Mentor Flow , Please enter this number to complete your sign up : " +
        x,
    });
    return x;
  }
}
