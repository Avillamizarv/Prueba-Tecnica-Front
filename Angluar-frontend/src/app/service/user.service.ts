import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../model/userDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL = 'http://localhost:8080/api/user';

  constructor(private httpClient: HttpClient) {}

  /**
   * Lista todos los usuarios.
   */
  getUsersList() {
    return this.httpClient.get<UserDTO[]>(`${this.userURL}/getUsers`);
  }

  /**
   * Crea un nuevo usuario.
   */
  createUser(user: UserDTO): Observable<Object> {
    return this.httpClient.post(`${this.userURL}/newUser`, user);
  }

  /**
   * Actualiza un  usuario.
   */
  updateUser(user: UserDTO): Observable<Object> {
    return this.httpClient.put(`${this.userURL}/updateUser`, user);
  }

  /**
   * Elimina un  usuario.
   */
  deleteUser(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.userURL}/deleteUser${id}`);
  }
}
