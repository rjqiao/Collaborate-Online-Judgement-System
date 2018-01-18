import { Injectable } from '@angular/core';

declare let io: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(): void {
    console.log('collaboration service init');
    this.collaborationSocket = io(window.location.origin, { query: "message=" + "123" });

    this.collaborationSocket.on("message", (message)=>{
      console.log("received: "+message);
    })
  }
}
