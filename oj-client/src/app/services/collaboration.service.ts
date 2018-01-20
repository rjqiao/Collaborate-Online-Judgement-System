import { Injectable } from '@angular/core';

declare var io: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(editor: any, sessionId:string): void {
    // console.log('collaboration service init');
    this.collaborationSocket = io(window.location.origin, { query: "sessionId=" + sessionId });

    //change from server
    this.collaborationSocket.on('change', (delta: string) => {
      console.log("collaboration: editor changes by " + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    //receive from editor?
    this.collaborationSocket.on("message", (message) => {
      console.log("received: " + message);
    });
  }

  change(delta:string){
    console.log("emit delta");
    this.collaborationSocket.emit("change", delta);
  }
}
