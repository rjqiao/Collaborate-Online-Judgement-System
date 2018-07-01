import {Injectable} from '@angular/core';
import {Problem} from "../models/problem.model";
import {PROBLEMS} from "../mock-problems";
import {Http, Response, Headers} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DataService {

  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: Http) { }

  getProblems(): Observable<Problem[]> {
    this.http.get("api/v1/problems")
      .toPromise()
      .then((res: Response) => {
        this.problemsSource.next(res.json());
      })
      .catch(this.handleError);

    // equal with above
    // (async () => {
    //   try {
    //     let res = await this.http.get("api/v1/problems").toPromise();
    //     this.problemsSource.next(res.json());
    //   } catch (err) {
    //     this.handleError(err);
    //   }
    // })();
    
    return this.problemsSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.http.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);

    // same with above
    // do not catch error and implicitly throw it to outer scope?
    // try {
    //   let res: Response = await this.http.get(`api/v1/problems/${id}`).toPromise();
    //   return res.json();
    // } catch (err) {
    //   return this.handleError(err);
    // }
  }

  addProblem(problem: Problem): Promise<Problem> {
    let headers: Headers = new Headers({'content-type': 'application/json'});
    // 返回一个promise的结果（一个异步处理之后的结果）
    return this.http.post('api/v1/problems', problem, headers)
      .toPromise()
      .then((res: Response) => {
        this.getProblems();   //传数据给problemlist，problemlist用observer接收
        return res.json();
      })
      .catch(this.handleError);

    // let headers: Headers = new Headers({'content-type': 'application/json'});
    // try {
    //   let res: Response = await this.http.post('api/v1/problems', problem, headers);
    //   this.getProblems(); // broadcast new data, the only listener is problem-list.problems
    // } catch (err) {
    //   return this.handleError(err);
    // }
  }

  buildAndRun(data: any): Promise<Object> {
    let headers = new Headers({'content-type': 'application/json'});
    return this.http.post('api/v1/build_and_run', data, headers)
      .toPromise()
      .then((res: Response) => {
        // this.getProblems();
        console.log("data buildAndrun");
        console.log(res);
        return res.json();
      })
      .catch(this.handleError);
  }

  // sync func
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.body || error);
  }
}
