import {Inject, Injectable} from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { Options, email } from "@tsed/schema";
import { Details } from "src/interfaces/Experience";
import { MentorModel } from "src/models/MentorModel";
import { RatingModel } from "src/models/RatingModel";
import { RequestsModel } from "src/models/RequestsModel";

@Injectable()
export class MentorService {
    constructor(@Inject(MentorModel) private mentroModel:MongooseModel<MentorModel>,@Inject(RequestsModel) private requestModel:MongooseModel<RequestsModel>,@Inject(RatingModel) private ratingModel:MongooseModel<RatingModel>){

    }
    async getMatchedMentors(intrests:Details[]){
        const inters=intrests.map(i=>i.title);
         return await this.mentroModel.find({ "fields.title": { $in: inters } });
    }
    async getAllmentors(){
        return await this.mentroModel.find();
    }
    async create(mentor:MentorModel){
        return await this.mentroModel.create(mentor);
    }
    async update(mentor:MentorModel){
        return await this.mentroModel.findOneAndUpdate({userId:mentor.userId},mentor);
    }
    async getMentorById(id:string){
        return await this.mentroModel.findOne({userId:id});
    }
    async getReq(id:string){
        return await this.requestModel.find({mentorId:id});
    }
    async getRatings(id:string){
        return await this.ratingModel.find({mentorId:id});
    }

    


}
