import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { NgForm } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInAndOut', [
      transition(':enter', [style({ opacity: 0 }), animate('0.4s')]),
      transition(':leave', [animate('0.4s', style({ opacity: 0 }))])
    ])
  ]
})
export class AppComponent {
  constructor(private apiService: ApiService) {}
  showAddForm = false;
  editIndex: number = null;
  items = this.apiService.getItems().subscribe(data => this.items = data);
  selecteditems;

  addItem(newItem) {
    this.apiService.addItem(newItem).subscribe(data => {
      this.items = data;
    });
  }

  updateItem(item, form: NgForm) {
    this.apiService.updateItem({ ...item, quantity: form.value.quantity}).subscribe(data => {
      this.items = data;
    });
    this.editIndex = null;
  }

  deleteItem(id) {
    this.apiService.deleteItem(id).subscribe(data => {
      this.items = Object.values(data);
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  toggleUpdateForm(index: number): void {
    if (this.editIndex === index) {
      this.editIndex = null;
    } else {
      this.editIndex = index;
    }
  }
}
