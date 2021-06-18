import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Customer} from './customer';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient: HttpClient) { }

  getCustomer(id: number) {
    // TODO - Send a request to the API to get the correct 
    return this.httpClient
    .get<Customer>(`http://127.0.0.1:3000/customers/${id}`).pipe(
      tap(_ => {
        console.log(`fetched customer with id ${id}`);
      }),
      catchError(this.handleError('get Customer', new Customer()))
    );
  }

  getCustomers(): Observable<Customer[]> {
   return this.httpClient
     .get<Customer[]>('http://127.0.0.1:3000/customers').pipe(
       tap(data => {
         console.log('fetched customers');
       }),
       catchError(this.handleError('get Customer', []))
     );
  }

  addCustomer(customer: Customer): Observable<Customer> {
    console.log(customer);


    return this.httpClient
      .post<Customer>('http://127.0.0.1:3000/customers', customer, {}).pipe(
        tap(_ => console.log('added customer')),
        catchError(this.handleError('add Customer', new Customer()))
      );
  }

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
