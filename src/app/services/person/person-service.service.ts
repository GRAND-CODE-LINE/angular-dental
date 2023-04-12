import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get('http://localhost:8080/api/listar')
  }
  create(person: any){
    return this.http.post('http://localhost:8080/api/create',person)
  }

  update(id: BigInteger , person:any){
    return this.http.put('http://localhost:8080/api/person/${id}',person)
  }

  delete(id:string){
    return this.http.delete('http://localhost:8080/api/delete/${id}')
  }

}
