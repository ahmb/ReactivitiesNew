// import { covertDateUTCtoLocal } from "../common/util/util";

import { categoryOptions } from "../common/options/categoryOptions";
import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  description: string;
  //  #TODO: remove string type
  date: Date | null;
  // endDate: Date | null;
  duration: number;
  private: boolean;
  imageUrl: string;
  // city: string;
  // venue: string;
  // latitude: number;
  // longitude: number;
  isCancelled: boolean;
  hostUsername: string;
  isGoing: boolean;
  isHost: boolean;
  inPerson: boolean;
  ongoing: boolean;
  ongoingDays: number;
  language: Language;
  skillLevel: SkillLevel;
  host?: Profile;
  attendeeCount: number;
  attendeeCountMax: number;
  approvalStatus: ApprovalStatus;
  categories: ICategory[];
  tag: ITag[];

  // //  #TODO: remove string type
  // attendees: Profile[];
  // comments: IComment[] | string;
  // attendees: string;
  // comments: string;
  // tags: string;
}

export interface ActivityDetails {
  id: string;
  title: string;
  description: string;
  category: string;
  //  #TODO: remove string type
  date: Date | null;
  // endDate: Date | null;
  duration: number;
  private: boolean;
  imageUrl: string;
  // city: string;
  // venue: string;
  // latitude: number;
  // longitude: number;
  assets: string;
  chatPassword: string;
  isCancelled: boolean;
  hostUsername: string;
  isGoing: boolean;
  isHost: boolean;
  inPerson: boolean;
  ongoing: boolean;
  ongoingDays: number;
  language: Language;
  skillLevel: SkillLevel;
  host?: Profile;
  attendeeCount: number;
  attendeeCountMax: number;
  approvalStatus: ApprovalStatus;
  categories: ICategory[];
  tag: ITag[];

  // //  #TODO: remove string type
  attendees: Profile[];
  comments: IComment[] | string;
  // attendees: string;
  // comments: string;
  // tags: string;
}

export class Activity implements Activity {
  constructor(init?: ActivityFormValues) {
    //copy the properties over
    Object.assign(this, init);
  }
}

export class ActivityDetails implements ActivityDetails {
  constructor(init?: ActivityFormValuesNew | ActivityFormValues) {
    //copy the properties over
    Object.assign(this, init);
  }
}

//created to match the comment DTO
export interface IComment {
  id: string;
  createdAt: Date;
  body: string;
  username: string;
  displayName: string;
  image: string;
}

export interface ICategory {
  name: string;
}

export interface ITag {
  name: string;
}

export interface IUserActivitiesUnreadDto {
  requestorName: string;
  requestorUserName: string;
  requestDateTime: Date;
  activityId: string;
  activityName: string;
  activityDateTime: Date;
  requestorImage: string;
}

// export interface ActivityFormValues extends Partial<Activity> {
//   time?: Date;
//   endTime?: Date;
// }

export class ActivityFormValues {
  id?: string = undefined;
  title: string = "";
  description: string = "";
  date: Date | null = null;
  duration: number = 0;
  private: boolean = false;
  ongoing: boolean = false;
  imageUrl: string = "";
  isCancelled: boolean = false;
  attendeeCountMax: number = 0;
  categories?: ICategory[] | null;
  tag?: ITag[] | null;

  // endDate: Date | null = null;
  // city: string = "";
  // venue: string = "";

  constructor(activity?: ActivityFormValues) {
    if (activity) {
      this.id = activity.id;
      this.title = activity.title;
      this.description = activity.description;
      this.date = activity.date;
      // this.endDate = activity.endDate;
      // this.city = activity.city;
      // this.venue = activity.venue;
    }
  }
}

export class ActivityFormValuesNew {
  id?: string = undefined;
  title: string = "";
  description: string = "";
  date: Date | null = null;
  duration: number = 0;
  private: boolean | number = false;
  ongoing: boolean | number = false;
  ongoingDays: number = 0;
  imageUrl: string = "";
  isCancelled: boolean = false;
  attendeeCountMax: number = 0;
  categories: ICategory[] | typeof categoryOptions | null = null;
  tag?: ITag[] | string[] | null;
  language: number | string = 0;
  skillLevel: number | string = 0;
  assets: string = "";
  file?: File;
  // endDate: Date | null = null;
  // city: string = "";
  // venue: string = "";

  constructor(activity?: Partial<ActivityFormValuesNew>) {
    if (activity) {
      Object.assign(this, activity);
      // this.endDate = activity.endDate;
      // this.city = activity.city;
      // this.venue = activity.venue;
    }
  }
}

//   // constructor(init?: IActivityFormValues) {
//   //   if (init && init.date && init.endDate) {
//   //     // init.date = covertDateUTCtoLocal(init.date)
//   //     init.time = init.date;
//   //     init.endTime = init.endDate;
//   //     Object.assign(this, init);
//   //   }
//   // }
// // }

export interface IAttendee {
  username: string;
  displayName: string;
  image: string;
  isHost: boolean;
  following?: boolean;
  isApproved: boolean;
}

export enum SkillLevel {
  Everyone,
  Beginner,
  Intermediate,
  Expert,
}

export enum ApprovalStatus {
  Pending,
  Accepted,
  Rejected,
  NotRequested,
}

export enum Language {
  Arabic,
  Begali,
  Burmese,
  CantoneseChinese,
  English,
  French,
  German,
  Gujarati,
  Hindi,
  Italian,
  Japanese,
  Javanese,
  Kannada,
  Malayalam,
  MandarinChinese,
  Marathi,
  NativeAmerican,
  Oriya,
  Persian,
  Polish,
  Portuguese,
  Punjabi,
  Russian,
  Spanish,
  Tamil,
  Telugu,
  Thai,
  Turkish,
  Ukranian,
  Urdu,
  Vietnamese,
}
