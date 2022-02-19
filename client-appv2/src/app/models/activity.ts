// import { covertDateUTCtoLocal } from "../common/util/util";

import { Profile } from "./profile";

export interface ActivitiesEnvelope {
  activities: Activity[];
  activityCount: number;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  //  #TODO: remove string type
  date: Date | null;
  endDate: Date | null;
  private: boolean;
  imageUrl: string;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
  isCancelled: boolean;
  hostUsername: string;
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
  isApproved: boolean;
  // //  #TODO: remove string type
  attendees: Profile[];
  // comments: IComment[] | string;
  // attendees: string;
  comments: string;
  tags: string;
}

export class Activity implements Activity {
  constructor(init?: ActivityFormValues) {
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
  category: string = "";
  description: string = "";
  date: Date | null = null;
  endDate: Date | null = null;
  city: string = "";
  venue: string = "";

  constructor(activity?: ActivityFormValues) {
    if (activity) {
      this.id = activity.id;
      this.title = activity.title;
      this.category = activity.category;
      this.description = activity.description;
      this.date = activity.date;
      this.endDate = activity.endDate;
      this.city = activity.city;
      this.venue = activity.venue;
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
