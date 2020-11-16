export interface IMessage {
    id: string;
    appUserUserName: string;
    sentDateTime: Date;
    body: string;
    threadId: string;
}


export interface IThread {
    id:string;
    participants:IParticipant[];
    messages: IMessage[];
}

export interface IParticipant {
    appUserUserName: string;
}