import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import { join } from "path";
import "@tsed/platform-express";
import "@tsed/ajv";
import "@tsed/mongoose";
import { config } from "./config/index";
import * as rest from "./controllers/rest/index";
import { CustomSocketService } from "./services/CustomSocketService";



@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false,
  mount: {
    "/rest": [...Object.values(rest)],
    "/socket":[CustomSocketService]
  },
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true } },
  ],
  socketIO: {
    path: "/socket.io",
    serveClient: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    },
  },
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs",
    },
  },
  exclude: ["**/*.spec.ts"],
  statics: {
    "/public": join(process.cwd(), "./public"),
  },
  multer: {
    dest: join(process.cwd(), "./public/uploads"),
  },
})
export class Server  {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
