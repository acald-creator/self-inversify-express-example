import { Db, ObjectId } from 'mongodb';
import { provide } from "inversify-binding-decorators";
import TYPES from "../../constant/types";
import { MongoDBConnection } from "./connection";
import { User } from '../../models/user';

@provide(TYPES.MongoDBClient)
export class MongoDBClient {
  public db: Db;

  constructor() {
    MongoDBConnection.getConnection((connection) => {
      this.db = connection;
    });
  }

  public find(collection: string, filter: Object, result: (error, data) => void): void {
    this.db.collection(collection).find(filter).toArray((error, find) => {
      return result(error, find);
    });
  }

  public findOneById(collection: string, objectId: string, result: (error, data) => void): void {
    this.db.collection(collection).find({ _id: new ObjectId(objectId) }).limit(1).toArray((error, find) => {
      return result(error, find[0]);
    });
  }

  public insert(collection: string, model: User, result: (error, data) => void): void {
    this.db.collection(collection).insertOne(model, (error, insert) => {
      return result(error, insert.insertedId[0]._id);
    });
  }

  public update(collection: string, objectId: string, model: User, result: (error, data) => void): void {
    this.db.collection(collection).updateOne(
      { _id: new ObjectId(objectId) },
      { $set: model },
      (error, update) => result(error, model)
    );
  }

  public remove(collection: string, objectId: string, result: (error, data) => void): void {
    this.db.collection(collection).deleteOne({ _id: new ObjectId(objectId) }, (error, remove) => {
      return result(error, remove);
    });
  }
}