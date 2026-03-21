import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../../core/services/toast/toast.service';
import { Subscription } from 'rxjs';

interface ToastItem extends ToastMessage {
  id: number;
  visible: boolean;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit, OnDestroy {

  toasts: ToastItem[] = [];
  private counter = 0;
  private subscription!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toast$.subscribe(msg => {
      this.addToast(msg);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToast(msg: ToastMessage): void {
    const id = this.counter++;
    const toast: ToastItem = { ...msg, id, visible: false };
    this.toasts.push(toast);

    setTimeout(() => {
      toast.visible = true;
    }, 50);

    setTimeout(() => {
      this.removeToast(id);
    }, 3500);
  }

  removeToast(id: number): void {
    const toast = this.toasts.find(t => t.id === id);
    if (toast) {
      toast.visible = false;
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== id);
      }, 300);
    }
  }
}