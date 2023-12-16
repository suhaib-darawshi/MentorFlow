import { BodyParams, MultipartFile, PathParams, PlatformMulterFile } from "@tsed/common";
import {Controller, Inject} from "@tsed/di";
import {Get, Put} from "@tsed/schema";
import { EventModel } from "src/models/EventModel";
import { EventService } from "src/services/EventService";

@Controller("/event")
export class EventController {
  constructor(@Inject(EventService)private eventService:EventService){}
  @Get("/")
  getAll(){
    return this.eventService.getAll();
  }
  @Put("/")
  putEvent(@MultipartFile("file")file:PlatformMulterFile,@BodyParams()e:EventModel){
    return this.eventService.addEvent(e);
  }
  @Get("/:id")
  get(@PathParams("id")id:string){
    return this.eventService.getOne(id)
  }
}
