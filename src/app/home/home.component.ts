import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { interval, noop, Observable, of, timer } from "rxjs";
import {
  catchError,
  delayWhen,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  //IMPERATIVE APPROACH
  beginnerCourses: Array<Course>;
  advancedCourses: Array<Course>;
  //REACTIVE APPROACH
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  constructor() {
    this.beginnerCourses = [];
    this.advancedCourses = [];
  }

  ngOnInit() {
    const http$ = createHttpObservable("/api/courses");
    const courses$: Observable<Course[]> = http$.pipe(
      tap(() => console.log("HTTP Request Home Component executed")),
      map((res) => Object.values(res["payload"]) as Course[]),
      shareReplay()
    );

    //REACTIVE APPROACH WITH ASYNC PIPE IN VIEW
    this.beginnerCourses$ = courses$.pipe(
      map((course) => course.filter((course) => course.category === "BEGINNER"))
    );

    this.advancedCourses$ = courses$.pipe(
      map((course) => course.filter((course) => course.category === "ADVANCED"))
    );

    //IMPERATIVE APPROACH
    // courses$.subscribe(
    //   (data) => {
    //     this.beginnerCourses = data.filter(
    //       (course) => course.category === "BEGINNER"
    //     );
    //     this.advancedCourses = data.filter(
    //       (course) => course.category === "ADVANCED"
    //     );
    //   },
    //   noop,
    //   () => console.log("completed")
    // );
  }
}
