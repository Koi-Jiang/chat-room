import { Collection, MongoClient } from "mongodb";
import { MessageResponse, User } from "shared/dist/models";
import { Verification } from "./utils/verification";

export class Database {
  private static _instance: Database | null;

  private users: Collection<User>;
  private history: Collection<MessageResponse>;
  private verifications: Collection<Verification>;

  private constructor(users: Collection<User>, history: Collection<MessageResponse>, verifications: Collection<Verification>) {
    this.users = users;
    this.history = history;
    this.verifications =verifications;
  }

  public static init() {
    if (this._instance) return;

    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);

    const database = client.db("chat-room");
    const users = database.collection<User>("users");
    const history = database.collection<MessageResponse>("history");
    const verifications = database.collection<Verification>("verification");
    
    this._instance = new Database(users, history, verifications);
  }

   public static getUsers(): Collection<User> {
    if (!this._instance) throw new Error("Not initialized");
    return this._instance.users;
  }
  public static addNewUser(user: User) {
    if (!this._instance) throw new Error("Not initialized");
    this._instance.users.insertOne(user);
  }

  public static getHistory(): Collection<MessageResponse> {
    if (!this._instance) throw new Error("Not initialized");
    return this._instance.history;
  }
  public static updateHistory(newMessage: MessageResponse) {
    if (!this._instance) throw new Error("Not initailized");
    this._instance.history.insertOne(newMessage);
  }

}
