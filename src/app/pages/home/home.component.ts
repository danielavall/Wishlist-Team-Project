import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { WishlistFormComponent } from '../../components/wishlist-form/wishlist-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, WishlistFormComponent],
  template: `
    <!-- Title Capsule -->
    <div class="section-title-wrapper">
      <div class="capsule-outer">
        <div class="capsule-inner font-rye">WISHLIST BOARD KELUARGA ADL JKT</div>
      </div>
    </div>

    <!-- Slideshow Section -->
    <section class="slideshow-section">
      <div class="artistic-gate left-gate"></div>
      <div class="artistic-gate right-gate"></div>

      <div class="slideshow-container">
        <div class="emp-card slide-item" *ngFor="let emp of displayedEmployees; let i = index" (click)="openDetail(i)">
          <img [src]="emp.bgImageUrl" [alt]="emp.fullName">
          <div class="card-title-bottom">
            <h3>{{ emp.fullName }} ({{ emp.nickname }})</h3>
          </div>
        </div>
        <div class="slide-item view-all-simple" routerLink="/gallery">
          <div class="icon-circle">➔</div>
          <h3>Lihat Semua</h3>
          <p>Jelajahi Semua Anggota</p>
        </div>
      </div>

      <div class="slideshow-hint">
        <span class="swipe-icon">↔</span> Geser ke samping untuk melihat lebih banyak
      </div>

      <!-- Tombol Lihat Semua -->
      <div class="btn-center-wrapper">
        <button class="btn-lihat-semua" routerLink="/gallery">Lihat Semua Anggota</button>
      </div>
    </section>

    <!-- Form Wishlist -->
    <section class="form-section">
      <app-wishlist-form></app-wishlist-form>
    </section>

    <!-- MODAL POPUP -->
    <div class="modal-overlay detail-overlay" *ngIf="selectedEmployee">
      <div class="modal-wrapper">
        <!-- Tombol Prev -->
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
              <li><strong>🎁 Wishlist:</strong> <br>{{ selectedEmployee.wishlist }}</li>
              <li class="highlight-idea"><strong>💡 Usulan Kado dari Teman:</strong> <br>{{ selectedEmployee.suggestedByFriends }}</li>
            </ul>
          </div>
        </div>

        <!-- Tombol Next -->
        <button class="nav-btn next" (click)="nextEmployee()" [disabled]="currentIndex === displayedEmployees.length - 1">❯</button>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  displayedEmployees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  currentIndex: number = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => {
      this.displayedEmployees = data.slice(0, 5);
    });
  }

  openDetail(index: number) {
    this.currentIndex = index;
    this.selectedEmployee = this.displayedEmployees[index];
    document.body.style.overflow = 'hidden';
  }

  closeDetail() {
    this.selectedEmployee = null;
    document.body.style.overflow = 'auto';
  }

  prevEmployee() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedEmployee = this.displayedEmployees[this.currentIndex];
    }
  }

  nextEmployee() {
    if (this.currentIndex < this.displayedEmployees.length - 1) {
      this.currentIndex++;
      this.selectedEmployee = this.displayedEmployees[this.currentIndex];
    }
  }
}
