import { Observable } from "rxjs";

export function createHttpObservable(url: string) {
  return new Observable((observer) => {
    fetch(url)
      .then((resp) => {
        if (!resp.ok) observer.error("fail api call");
        return resp.json();
      })
      .then((data) => {
        observer.next(data);
        observer.complete();
      })
      .catch((err) => {
        observer.error("fail api call");
      });
  });
}
