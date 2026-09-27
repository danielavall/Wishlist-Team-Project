import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="gallery-page">
      <div class="section-title-wrapper">
        <div class="capsule-outer">
          <div class="capsule-inner font-rye">WISHLIST BOARD KELUARGA ADL JKT</div>
        </div>
      </div>

      <div class="cards-grid">
        <div class="emp-card" *ngFor="let emp of allEmployees; let i = index" (click)="openDetail(i)">
          <img [src]="emp.bgImageUrl" [alt]="emp.fullName">
          <div class="card-title-bottom">
            <h3>{{ emp.fullName }} ({{ emp.nickname }})</h3>
          </div>
        </div>
      </div>

      <div class="btn-center-wrapper">
        <button class="btn-lihat-semua" routerLink="/">❮ Kembali ke Beranda</button>
      </div>
    </div>

    <!-- MODAL POPUP SLIDER -->
    <div class="modal-overlay detail-overlay" *ngIf="selectedEmployee">
      <div class="modal-wrapper">
        <button class="nav-btn prev" (click)="prevEmployee()" [disabled]="currentIndex === 0">❮</button>

        <div class="modal-content detail-modal">
          <button class="close-btn" (click)="closeDetail()">X</button>
          <div class="detail-frame">
            <img [src]="selectedEmployee.bgImageUrl" alt="Foto">
          </div>
          <div class="detail-info">
            <h2>{{ selectedEmployee.fullName }}</h2>
            <p class="nickname">Panggilan: {{ selectedEmployee.nickname }}</p>
            <hr>
            <ul>
              <li><strong>❤️ Makanan Favorit:</strong> <br>{{ selectedEmployee.favFood }}</li>
              <li><strong>💔 Tidak Disukai:</strong> <br>{{ selectedEmployee.dislikeFood }}</li>
              <li><strong>🎁 Wishlist Kado:</strong> <br>{{ selectedEmployee.wishlist }}</li>
              <li class="highlight-idea" *ngIf="selectedEmployee.suggestedByFriends?.trim()">
                <strong>💡 Usulan Kado dari Teman:</strong> <br>{{ selectedEmployee.suggestedByFriends }}
              </li>
            </ul>
          </div>
        </div>

        <button class="nav-btn next" (click)="nextEmployee()" [disabled]="currentIndex === allEmployees.length - 1">❯</button>
      </div>
    </div>
  `
})
export class GalleryComponent implements OnInit {
  allEmployees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  currentIndex: number = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => this.allEmployees = data);
  }

  openDetail(index: number) {
    this.currentIndex = index;
    this.selectedEmployee = this.allEmployees[index];
    document.body.style.overflow = 'hidden';
  }

  closeDetail() {
    this.selectedEmployee = null;
    document.body.style.overflow = 'auto';
  }

  prevEmployee() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedEmployee = this.allEmployees[this.currentIndex];
    }
  }

  nextEmployee() {
    if (this.currentIndex < this.allEmployees.length - 1) {
      this.currentIndex++;
      this.selectedEmployee = this.allEmployees[this.currentIndex];
    }
  }
}
