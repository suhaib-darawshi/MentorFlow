import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import mongoose from "mongoose";

import { MenteeModel } from "src/models/MenteeModel";
import { MentorModel } from "src/models/MentorModel";
import { NotificationModel } from "src/models/NotificationModel";
import { RatingModel } from "src/models/RatingModel";
import { RequestsModel } from "src/models/RequestsModel";
import { UsersModel } from "src/models/UserModel";

@Injectable()
export class MenteeService {
  constructor(
    @Inject(MenteeModel) private menteeModel: MongooseModel<MenteeModel>,
    @Inject(NotificationModel)
    private notificationModel: MongooseModel<NotificationModel>,
    @Inject(UsersModel) private userModel: MongooseModel<UsersModel>,
    @Inject(RequestsModel) private requestModel: MongooseModel<RequestsModel>,
    @Inject(MentorModel) private mentroModel: MongooseModel<MentorModel>,
    @Inject(RatingModel) private ratingModel: MongooseModel<RatingModel>
  ) {}

  async create(mentee: MenteeModel) {
    return await this.menteeModel.create(mentee);
  }
  async putMenteeAllData(mentee: MenteeModel) {
    let exist: boolean = await this.checkIfUserExist(mentee);
    if (!exist) {
      return "this user dose Not exist";
    } else {
      let ob = await this.menteeModel.findOne({ userId: mentee.userId });
      if (ob == null) {
        return await this.menteeModel.create(mentee);
      } else {
        return await this.menteeModel.findByIdAndUpdate(ob.id, mentee, {
          new: true,
        });
      }
    }
  }
  async getMentee(userId: string) {
    let u = await this.userModel.findById(userId);

    if (u === null) {
      return;
    } else {
      return await this.menteeModel.findOne({ userId: userId });
    }
  }

  async checkIfUserExist(mentee: MenteeModel) {
    let u = await this.userModel.findById(mentee.userId);
    if (u == null) {
      return false;
    } else {
      return true;
    }
  }
  async update(mentor: MenteeModel) {
    return await this.menteeModel.findOneAndUpdate(
      { userId: mentor.userId },
      mentor
    );
  }
  async request(req: RequestsModel) {
    let mentor = await this.mentroModel.findOne({ userId: req.mentorId });
    if (mentor == null) {
      return "mentor not found";
    }
    let mentee = await this.menteeModel.find({ userId: req.menteeId });
    if (mentee == null) {
      return "mentee not found";
    }
    let not = new NotificationModel();
    let user = await this.userModel.findById(
      new mongoose.Types.ObjectId(req.menteeId)
    );
    not.description = user?.userName + " asked to be your mentee";
    not.to = req.mentorId;
    not.userid = req.menteeId;
    await this.notificationModel.create(not);
    return await this.requestModel.create(req);
  }
  async getReq(id: string) {
    return await this.requestModel.find({ menteeId: id });
  }
  async calcRating(id: string) {
    let ratings = await this.ratingModel.find({ mentorId: id });
    let sum = 0;
    for (const rate of ratings) {
      sum = sum + rate.rating;
    }
    return await this.mentroModel.findOneAndUpdate(
      { userId: id },
      { rating: sum / ratings.length }
    );
  }
  async rate(rating: RatingModel) {
    let rate = await this.ratingModel.findOne({
      menteeId: rating.menteeId,
      mentorId: rating.mentorId,
    });
    if (rate == null) {
      await this.ratingModel.create(rating);
    } else {
      await this.ratingModel.findByIdAndUpdate(rate.id, rating);
    }
    return this.calcRating(rating.mentorId);
  }
}
