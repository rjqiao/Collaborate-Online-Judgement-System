import { Injectable } from '@angular/core';
import { COLORS } from '../../assets/colors';

declare let io: any;

declare let ace: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;

  clientsInfo: Object = {};
  clientNum: number = 0;
  constructor() { }

  // every time we switch to a new problem-detail page
  // this.init(editor, sessionId) is called
  init(editor: any, sessionId: string): void {
    // console.log('collaboration service init');

    // 切换页面的时候，socket会重新建立
    // build or rebuild socket by socketId
    this.collaborationSocket = io(window.location.origin, { query: "sessionId=" + sessionId });

    //change from server
    this.collaborationSocket.on('change', (delta: string) => {
      console.log("collaboration: editor changes by " + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    this.collaborationSocket.on('cursorMove', (cursor) => {
      console.log("cursor move: " + cursor);
      let session = editor.getSession();
      cursor = JSON.parse(cursor);
      let x = cursor['row'];
      let y = cursor['column'];
      let changeClientId = cursor['socketId'];
      console.log(x + ' ' + y + ' ' + changeClientId);
      // console.log(this.clientsInfo);
      if (changeClientId in this.clientsInfo) {
        // editor的session，就是在editor里删掉marker
        session.removeMarker(this.clientsInfo[changeClientId]['marker']);
      } else {
        this.clientsInfo[changeClientId] = {};

        let css = document.createElement('style');
        css.type = "text/css";
        css.innerHTML = ".editor_cursor_" + changeClientId
          + " { position:absolute; background:" + COLORS[this.clientNum] + ";"
          + " z-index: 100; width:3px !important; }";

        document.body.appendChild(css);
        this.clientNum++;
      }
      let Range = ace.require('ace/range').Range;
      let newMarker = session.addMarker(new Range(x, y, x, y + 1), 'editor_cursor_' + changeClientId, true);
      console.log("new marker: ");
      console.log(newMarker);
      this.clientsInfo[changeClientId]['marker'] = newMarker;
    });

    //receive from editor?
    // this.collaborationSocket.on("message", (message) => {
    //   console.log("received: " + message);
    // });
  }

  change(delta: string) {
    console.log("emit delta");
    this.collaborationSocket.emit("change", delta);
  }

  // send cursorMove event to server
  cursorMove(cursor: string): void {
    this.collaborationSocket.emit("cursorMove", cursor);
  }

  restoreBuffer(): void{
    this.collaborationSocket.emit("restoreBuffer");
  }
}
