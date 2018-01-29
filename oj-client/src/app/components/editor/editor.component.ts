import { Component, OnInit, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';

import {ActivatedRoute, Params} from '@angular/router';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})


export class EditorComponent implements OnInit {
  editor: any;
  public languages: string[] = ['Java', 'C++', 'Python'];
  language: string = 'Java';

  sessionId: string;

  output: string;

  defaultContent = {
    'Java': `public class Example {
    public static void main(String[] args) {
      //Type your code here
    }
}`,
    'C++': `#include <iostream>
using namespace std;

int main() {
  //Type your C++ code here
  return 0;
}`,
    'Python': `class Solution:
  def example():
    # Write your Python code here`
  }


  constructor(@Inject('collaboration') private collaboration,
              private route: ActivatedRoute,
              @Inject('data') private data) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      console.log("params[id]: "+params['id']);
      this.sessionId = params['id'];
      this.initEditor();
    });
  }

  initEditor(){
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    // this.editor.$blockScrolling = Infinity;

    console.log("initEditor");
    document.getElementsByTagName('textarea')[0].focus();
    
    // this.collaboration.init();
    this.collaboration.init(this.editor, this.sessionId);

    // json
    this.editor.lastAppliedChange = null;

    //捕获editor的修改
    //当last change 和 e相同？？
    this.editor.on('change', (e) =>{
      // var changed = this.editor.lastAppliedChange==e;
      console.log("Editor changed: " + JSON.stringify(e)+
                "\nlastappiedchange: " + JSON.stringify(this.editor.lastAppliedChange));
      if (this.editor.lastAppliedChange!=e){
        this.collaboration.change(JSON.stringify(e));
      }
    });
  
    this.editor.getSession().getSelection().on("changeCursor", () => {
      let cursor = this.editor.getSession().getSelection().getCursor();
      console.log('cursor moves: ' + JSON.stringify(cursor));
      this.collaboration.cursorMove(JSON.stringify(cursor));
    });

    this.collaboration.restoreBuffer();
  }

  setLanguage(language:string): void{
    // console.log("old lang "+this.language);
    // console.log("new lang "+language);
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    this.editor.getSession().setMode('ace/mode/' + this.language.toLowerCase());
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = 'abc';
  }

  submit():void{
    let userCode = this.editor.getValue();
    // console.log(userCode);
    let data = {
      user_code:userCode,
      lang: this.language.toLowerCase()
    };
    this.data.buildAndRun(data)
      .then(res => {
        console.log("buildAndRun");
        console.log(res);
        this.output = res.text
      });

  }
}
