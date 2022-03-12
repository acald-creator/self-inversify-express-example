import { provide } from "inversify-binding-decorators";
import TYPES from "../constant/types";

interface IUser {
    email: String;
    name: String;
    _id?: String;
}

@provide(TYPES.User)
export class User implements IUser {
    constructor(
        public email: String,
        public name: String,
        public _id?: String,
    ) { }
}