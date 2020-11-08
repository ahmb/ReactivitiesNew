import { covertDateUTCtoLocal } from "../common/util/util";

export interface IActivitiesEnvelope {
  activities: IActivity[];
  activityCount: number;
}

export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
  isGoing: boolean;
  isHost: boolean;
  attendees: IAttendee[];
  comments: IComment[];
  tags: string;
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

export interface IUserActivitiesUnreadDto 
{
  requestorName: string;
  requestorUserName: string;
  requestDateTime: Date;
  activityId: string;
  activityName: string;
  activityDateTime: Date;
  requestorImage:string
}



export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}

export class ActivityFormValues implements IActivityFormValues {
  id?: string | undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  date?: Date = undefined;
  time?: Date = undefined;
  city: string = "";
  venue: string = "";
  latitude: number = 0;
  longitude: number = 0;
  tags: string = "";


  constructor(init?: IActivityFormValues) {
    if (init && init.date) {
      // init.date = covertDateUTCtoLocal(init.date)
      init.time = init.date;
      Object.assign(this, init);
    }
  }
}

export interface IAttendee {
  username: string;
  displayName: string;
  image: string;
  isHost: boolean;
  following?: boolean;
}
