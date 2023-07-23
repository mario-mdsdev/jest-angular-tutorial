import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FakeService {
  constructor(private http: HttpClient) {}

  getDataV1(): Observable<any> {
    const url: string = 'https://jsonplaceholder.typicode.com/todos/1';
    return this.http.get(url);
  }

  getDataV2(): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    return this.http.get(url).pipe(
      tap((data: any) => console.log('Data fetched:', data)),
      catchError(this.handleError('getDataV2'))
    );
  }

  postDataV1(data: any): Observable<any> {
    const url: string = 'https://jsonplaceholder.typicode.com/todos/1';
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(data, url, httpOptions);
  }

  private handleError<T>(operation: string = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = `Server returned code ${error.status} with body "${error.error}"`;

      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };
  }
}
