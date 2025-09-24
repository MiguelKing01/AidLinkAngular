import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

const STORAGE_KEY = 'envios_orders_v1';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor() {}

  getAll(): Order[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as Order[] : [];
  }

  saveAll(orders: Order[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }

  add(order: Order) {
    const arr = this.getAll();
    arr.push(order);
    this.saveAll(arr);
  }

  update(updated: Order) {
    const arr = this.getAll().map(o => o.id === updated.id ? updated : o);
    this.saveAll(arr);
  }

  remove(id: string) {
    const arr = this.getAll().filter(o => o.id !== id);
    this.saveAll(arr);
  }
}
