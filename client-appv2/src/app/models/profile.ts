export interface IProfile {
  displayName: string;
  username: string;
  bio: string;
  image: string;
  following:boolean;
  followersCount: number;
  followingCount: number;
  photos: IPhoto[];
  // interests: IInterest[] ;
  interests: string[];
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

export interface IUserActivity {
  id: string;
  title: string;
  category: string;
  date: Date;
}