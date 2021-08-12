import {ICircle} from "./circle.interface";

export interface IProject {
  id: string;
  name: string;
  isActive?: boolean;
  circles: ICircle[];
}
