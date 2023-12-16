import {Inject, Injectable} from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { EventModel } from "src/models/EventModel";

@Injectable()
export class EventService {
    constructor(@Inject(EventModel)private eventModel:MongooseModel<EventModel>){}
    async addEvent(e:EventModel){
        return await this.eventModel.create(e);
    }
    async getAll(){
        return await this.eventModel.find();
    }
    async getOne(id:string){
        return await this.eventModel.find({_id:id});
    }
}
