import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wishlist-form.component.html'
})
export class WishlistFormComponent implements OnInit, OnDestroy {
  wishlistForm: FormGroup;
  isSubmitting: boolean = false;
  isSuccess: boolean = false;
  private destroy$ = new Subject<void>();

  adlMembers: string[] = [];
  filteredMembers: string[] = [];
  showDropdown: boolean = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.wishlistForm = this.fb.group({
      targetName: ['', Validators.required],
      giftIdea: ['', Validators.required]
    });
  }

ngOnInit(): void {
    this.employeeService.getEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe((employees) => {
        this.adlMembers = employees
          .map(emp => `${emp.fullName} (${emp.nickname})`)
          .sort();
        this.filteredMembers = [...this.adlMembers];
      });

    this.wishlistForm.get('targetName')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.filterMembers(value);
      });
  }

  filterMembers(searchTerm: string): void {
    const term = searchTerm ? searchTerm.toLowerCase() : '';
    this.filteredMembers = this.adlMembers.filter(member =>
      member.toLowerCase().includes(term)
    );
  }

  selectMember(member: string): void {
    this.wishlistForm.patchValue({ targetName: member });
    this.showDropdown = false;
  }

  hideDropdown(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  onSubmit(): void {
    if (this.wishlistForm.invalid) {
      this.wishlistForm.markAllAsTouched();
      return;
    }

    const typedName = this.wishlistForm.get('targetName')?.value;
    if (!this.adlMembers.includes(typedName)) {
      alert('Tolong pilih nama teman dari dropdown list yang tersedia!');
      return;
    }

    this.isSubmitting = true;
    this.isSuccess = false;

    this.employeeService.submitGiftIdea(this.wishlistForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.isSuccess = true;
          this.wishlistForm.reset();
          setTimeout(() => this.isSuccess = false, 5000);
        },
        error: (err) => { console.error(err); this.isSubmitting = false; }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
