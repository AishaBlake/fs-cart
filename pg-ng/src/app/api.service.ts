import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Item {
  id?: number;
  product: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiUrl = 'http://localhost:3000/cart-items';
  constructor(private http: HttpClient) { }
  getItems() {
    return this.http.get(this.apiUrl, { responseType: 'json'});
  }

  addItem(item: Item) {
    return this.http.post(this.apiUrl, item, { responseType: 'json'});
  }

  updateItem(item: Item) {
    return this.http.put(this.apiUrl + `/${item.id}`, item, { responseType: 'json'});
  }

  deleteItem(id: number) {
    return this.http.delete(this.apiUrl + `/${id}`, { responseType: 'json'});
  }
}
