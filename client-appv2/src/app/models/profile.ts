import { IUser as User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
  following: boolean;
  followersCount: number;
  followingCount: number;
  photos?: IPhoto[];
  // interests: IInterest[] ;
}

//this class is just there to help us instantiate an IProfile obj using the constructor
export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.username;
    this.image = user.image;
  }
}

export interface IInterest {
  id: string;
  name: string;
}

export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}

export interface UserActivity {
  id: string;
  title: string;
  category: string;
  date: Date;
}

