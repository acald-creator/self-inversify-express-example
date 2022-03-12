import "reflect-metadata";
import "./ioc/loader";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import bodyParser from "body-parser";
import helmet from 'helmet';
import { UserService } from "./service/user";
import TYPES from "./constant/types";
import { MongoDBClient } from "./utils/mongodb/client";

// load everything needed to the Container
let container = new Container();

// start the server
let server = new InversifyExpressServer(container);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(helmet());
});

let serverInstance = server.build();
serverInstance.listen(3000);

console.log('Server started on port 3000 :)');