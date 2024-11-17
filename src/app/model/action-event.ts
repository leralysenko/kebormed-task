import { ActionType } from "./action-type";
import { User } from "./user";

export interface ActionEvent {
  user: User;
  action: ActionType;
};