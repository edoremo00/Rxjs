import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  concat,
  fromEvent,
  interval,
  merge,
  noop,
  Observable,
  of,
  Subject,
  throwError,
  timer,
} from "rxjs";
import { catchError, map, takeUntil } from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    //const source1$ = interval(1000);
    const source1$ = of(1, 2, 3);
    const source2$ = of(4, 5, 6);
    const source3$ = of(7, 8, 9);

    /*questo operatore riotrna un unico observable e chiede in input n observable. 
    rispetta l'ordine in cui gli observable sono passati e aspetta che venga completato il 
    primo per passare al secondo ecc
		/nel caso in cui il primo observable non si completi non passerà mai al secondo
    vedi esempio fatto con interval
    */
    const result$ = concat(source1$, source2$, source3$);
    result$.subscribe(console.log);
  }
}
