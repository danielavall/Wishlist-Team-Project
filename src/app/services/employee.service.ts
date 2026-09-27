import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private mockData: Employee[] = [
    {
      id: 1, fullName: 'Ahmad Deni Wahyudi', nickname: 'Deni', favFood: 'Sushi', dislikeFood: 'Seafood Mentah',
      wishlist: 'Lego Architecture', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 2, fullName: 'Ahmad Fahlepie', nickname: 'Lepie', favFood: 'Bebek Goreng', dislikeFood: 'Keju Biru',
      wishlist: 'Keyboard Mechanical Varmilo', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 3, fullName: 'Amzesmoro Sianturi', nickname: 'Amzes', favFood: 'Bakso Sapi', dislikeFood: 'Kismis',
      wishlist: 'Mouse Logitech MX Master', suggestedByFriends: 'Tiket Liburan ke Bali',
      bgImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 4, fullName: 'Ananda Muhammad Al Aziz', nickname: 'Nanda', favFood: 'Es Krim Gelato', dislikeFood: 'Ikan Asin',
      wishlist: 'AirPods Pro', suggestedByFriends: 'Tiket Liburan ke Bali',
      bgImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 5, fullName: 'Bonfilio Aldrino Sugiarto', nickname: 'Aldo', favFood: 'Nasi Padang', dislikeFood: 'Makanan Terlalu Manis',
      wishlist: 'Buku Self-Improvement', suggestedByFriends: 'Coffee Maker',
      bgImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 6, fullName: 'Callista Patricia Jojo', nickname: 'Callista', favFood: 'Bakso Sapi', dislikeFood: 'Keju Biru',
      wishlist: 'Voucher Kopi Starbucks', suggestedByFriends: 'Tiket Liburan ke Bali',
      bgImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 7, fullName: 'Christian Iwan', nickname: 'Iwan', favFood: 'Martabak Telur', dislikeFood: 'Pare',
      wishlist: 'Mesin Kopi Kapsul', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 8, fullName: 'Daniela Vallerine Gunawan', nickname: 'Ela', favFood: 'Salmon sushi, seblak, all sweets food', dislikeFood: 'Makanan berbau (jengkol, pete), sayur ^_^',
      wishlist: 'Pink keycaps, matcha powder', suggestedByFriends: '',
      bgImageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 9, fullName: 'Excellent Zefanya Devona Syallom', nickname: 'Excel', favFood: 'Sate Ayam Madura', dislikeFood: 'Keju Biru',
      wishlist: 'Sepatu Lari Nike', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 10, fullName: 'Irwan Setiawan Kamil', nickname: 'Irwan', favFood: 'Gado-Gado', dislikeFood: 'Daging Kambing',
      wishlist: 'Sepatu Lari Nike', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 11, fullName: 'Jennifer Tan', nickname: 'Jenni', favFood: 'Nasi Goreng Spesial', dislikeFood: 'Bawang Mentah',
      wishlist: 'Tas Selempang Eiger', suggestedByFriends: 'Tiket Liburan ke Bali',
      bgImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 12, fullName: 'Jessie La Vonna Sanjaya', nickname: 'Jessiela', favFood: 'Es Krim Gelato', dislikeFood: 'Sayur Bayam',
      wishlist: 'Buku Desain UI/UX', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 13, fullName: 'Jesslyn Tanuwijaya', nickname: 'Jesslyn', favFood: 'Steak Wagyu', dislikeFood: 'Seledri',
      wishlist: 'Voucher MAP', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 14, fullName: 'Kenzie Erico Tjandra', nickname: 'Kenzie', favFood: 'Ayam Geprek', dislikeFood: 'Keju Biru',
      wishlist: 'Skincare Set Laneige', suggestedByFriends: 'Coffee Maker',
      bgImageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 15, fullName: 'Kevin Brave', nickname: 'Kevin', favFood: 'Soto Betawi', dislikeFood: 'Jeroan',
      wishlist: 'Mouse Logitech MX Master', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 16, fullName: 'Laurensia Vilda Yovira', nickname: 'Vilda', favFood: 'Seafood Saus Padang', dislikeFood: 'Sayur Bayam',
      wishlist: 'Mesin Kopi Kapsul', suggestedByFriends: 'Coffee Maker',
      bgImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 17, fullName: 'Ridho Andhika', nickname: 'Ridho', favFood: 'Gado-Gado', dislikeFood: 'Sayur Bayam',
      wishlist: 'Mouse Logitech MX Master', suggestedByFriends: 'Tiket Liburan ke Bali',
      bgImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 18, fullName: 'Steven Jayadi Wiyanto', nickname: 'Jay', favFood: 'Pizza Margherita', dislikeFood: 'Durian',
      wishlist: 'Keyboard Mechanical Varmilo', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 19, fullName: 'Sylvia Krisnando', nickname: 'Sylvia', favFood: 'Steak Wagyu', dislikeFood: 'Makanan Pedas',
      wishlist: 'Tas Selempang Eiger', suggestedByFriends: 'Coffee Maker',
      bgImageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 20, fullName: 'Yandi Wijaya', nickname: 'Yandi', favFood: 'Nasi Padang', dislikeFood: 'Pete',
      wishlist: 'Tas Selempang Eiger', suggestedByFriends: 'Coffee Maker',
      bgImageUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8c1c?q=80&w=600&auto=format&fit=crop'
    }
  ];

  getEmployees(): Observable<Employee[]> {
    return of(this.mockData).pipe(delay(800));
  }

  submitGiftIdea(payload: { targetName: string; giftIdea: string }): Observable<{ success: boolean; message: string }> {
    const targetEmployee = this.mockData.find(emp =>
      emp.nickname.toLowerCase() === payload.targetName.toLowerCase()
    );

    if (targetEmployee) {
      if (targetEmployee.suggestedByFriends && targetEmployee.suggestedByFriends.trim() !== '') {
        targetEmployee.suggestedByFriends += `, ${payload.giftIdea}`;
      } else {
        targetEmployee.suggestedByFriends = payload.giftIdea;
      }
      console.log(`Update wishlist ${targetEmployee.nickname}: ${targetEmployee.suggestedByFriends}`);
    }

    return of({ success: true, message: 'Ide kado berhasil disimpan!' }).pipe(delay(1000));
  }
}
