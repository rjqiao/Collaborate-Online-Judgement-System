import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../../models/problem.model";
import { Http, Response, Headers } from '@angular/http';

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  name: "",
  desc: "",
  difficulty: ""
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})

export class NewProblemComponent implements OnInit {
  public difficulties = ["Easy", "Medium", "Hard", "Super"];

  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);

  constructor(@Inject("data") private data,private http: Http) { }

  ngOnInit() {
  }

  addProblem(): void {
    this.data.addProblem(this.newProblem)
          .catch(error => console.log(error._body));


    // let headers = new Headers({ 'content-type': 'application/json' });

    // this.http.post('api/v1/problems', this.newProblem, headers)
    //   .toPromise()
    //   .then((res: Response) => {
    //     this.getProblems();   //传数据给problemlist，problemlist用observer接收
    //     return res.json();
    //   })
    //   .catch(this.handleError);


    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }
}
