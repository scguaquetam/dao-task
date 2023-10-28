import { Epoch } from "./epoch.types";
import { User } from "./user.types";

export interface Organization {
  id : string;
  name : string;
  description : string;
  users : User[];
  epochs? : Epoch[];
  img? : string;
}