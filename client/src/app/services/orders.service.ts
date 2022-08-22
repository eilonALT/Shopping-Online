import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  URL = "http://127.0.0.1:5000/orders"
  constructor(private http: HttpClient) {
  }

  /** GET orders from the server */
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.URL)
  }

  /** GET Order by id. Will 404 if id not found */
  getOrder(id: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/${id}`)
  }

  /** POST new  order*/
  addOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.URL}`, order)
  }
}
