import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../../models/problem.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
  problem: Problem;

  constructor(
    private route: ActivatedRoute,
    @Inject("data") private data
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        console.log(params["id"])
        this.data.getProblem(+params["id"])
          .then(problem => {
            if (problem == null) {
              this.problem = {
                id: +params["id"],
                name: 'Error',
                desc: 'Error',
                difficulty: "Easy"
              }
            } else this.problem = problem;
          })
          .catch(err => {
            this.problem = {
              id: +params["id"],
              name: 'Error',
              desc: 'Error',
              difficulty: "Easy"
            };
          });
      });
  }
}
