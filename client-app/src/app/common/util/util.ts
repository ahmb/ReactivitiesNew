import { IUser } from "../../models/user";
import { IActivity, IAttendee } from "../../models/activity";
import { DateTimePicker } from "react-widgets";

export const combineDateAndTime = (date: Date, time: Date) => {
  // const timeString = time.getHours() + ":" + time.getMinutes() + ":00";

  // const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  // const day = date.getDate();
  // const dateString = `${year}-${month}-${day}`;
  // console.log("THIS IS THE DATESTRING " + dateString);
  const dateString = date.toISOString().split('T')[0];
  const timeString = time.toISOString().split('T')[1];
  return new Date(dateString + 'T' + timeString);
};

export const covertDateUTCtoLocal = (date: Date) => {
  return new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes()));
}

export const stringCapitalize = (s:string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}



export const setActivityProps = (activity: IActivity, user: IUser) => {
  if(!user.username)
    throw new Error(`${user}`);
  activity.date = new Date(activity.date);
  activity.isGoing = activity.attendees.some(
    (a) => a.username === user.username
  );
  activity.isHost = activity.attendees.some(
    (a) => a.username === user.username && a.isHost
  );
  activity.isApproved = activity.attendees.some(
    (a) => a.username === user.username && a.isApproved
  );
  return activity;
};

export const createAttendee = (user: IUser): IAttendee => {
  return {
    displayName: user.displayName,
    isHost: false,
    username: user.username,
    image: user.image!,
    isApproved: false
  }
}

export function filterInPlace<T>(a: T[], condition: any, thisArg: any) {
  let j = 0;

  a.forEach((e, i) => { 
    if (condition.call(thisArg, e, i, a)) {
      if (i!==j) a[j] = e; 
      j++;
    }
  });

  a.length = j;
  return a;
}

//output: 2014-05-11
export function formatDate(date: Date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

function getDistanceFromLatLonInKm(lat1:number,lon1:number,lat2:number,lon2:number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg:number) {
  return deg * (Math.PI/180)
}