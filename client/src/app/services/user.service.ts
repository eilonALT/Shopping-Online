import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = "http://127.0.0.1:5000/users"
  constructor(private http: HttpClient) {
  }

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL)
  }

  /** GET User by id. Will 404 if id not found */
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.URL}/${id}`)
  }

  /** GET User by userName. Will 404 if id not found */
  getUserByUserName(username: string): Observable<User> {
    const result = this.http.get<User>(`${this.URL}/?userName=${username}`)
    return result
  }

  /** GET User by idNumber. Will 404 if id not found */
  getUserByIdNumber(idNumber: string): Observable<User> {
    return this.http.get<User>(`${this.URL}/?idNumber=${idNumber}`)
  }

  /** GET User by userName and Password. Will 404 if id not found */
  getUserByUserNameAndPassword(username: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.URL}/?userName=${username}&password=${password}`)
  }

  /** GET User by id. Will 404 if id not found */
  delUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.URL}/${id}`)
  }

  /** create a  User  */
  addUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.URL}`, { "firstName": user.firstName, "lastName": user.lastName, "username": user.username, "idNumber": user.idNumber, "password": user.password, "city": user.city, "street": user.street, "role": user.role })
  }
}