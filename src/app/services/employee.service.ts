import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private mockData: Employee[] = [
    {
      id: 1, fullName: 'Ahmad Deni Wahyudi', nickname: 'Deni', favFood: 'apapun harusnya suka', dislikeFood: 'ngga ada',
      wishlist: 'earphone kabel dengan mic', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'assets/deni.jpg'
    },
    {
      id: 2, fullName: 'Ahmad Fahlepie', nickname: 'Lepie', favFood: 'segala hal tentang daging sapi (steak terutama), burger', dislikeFood: 'gaada yg penting edible dan gak terlalu pedas',
      wishlist: 'Mobil 7-seater yang bisa bawa manusia dewasa', suggestedByFriends: 'Vacuum cleaner',
      bgImageUrl: 'assets/lepie.jpg'
    },
    {
      id: 3, fullName: 'Amzesmoro Sianturi', nickname: 'Amzes', favFood: 'Bakso Sapi', dislikeFood: 'Kismis',
      wishlist: 'Mouse Logitech MX Master', suggestedByFriends: 'Tiket Liburan ke Bali',
      bgImageUrl: 'assets/amzes.jpg'
    },
    {
      id: 4, fullName: 'Ananda Muhammad Al Aziz', nickname: 'Nanda', favFood: 'Es Krim Gelato', dislikeFood: 'Ikan Asin',
      wishlist: 'AirPods Pro', suggestedByFriends: 'Tiket Liburan ke Bali',
      bgImageUrl: 'assets/nanda.jpg'
    },
    {
      id: 5, fullName: 'Bonfilio Aldrino Sugiarto', nickname: 'Aldo', favFood: 'Nasi Padang', dislikeFood: 'Makanan Terlalu Manis',
      wishlist: 'Buku Self-Improvement', suggestedByFriends: 'Coffee Maker',
      // bgImageUrl: 'assets/aldo.jpg'
      bgImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 6, fullName: 'Callista Patricia Jojo', nickname: 'Callista', favFood: 'Bakso Sapi', dislikeFood: 'Keju Biru',
      wishlist: 'Voucher Kopi Starbucks', suggestedByFriends: 'Tiket Liburan ke Bali',
      bgImageUrl: 'assets/callista.jpg'
    },
    {
      id: 7, fullName: 'Christian Iwan', nickname: 'Iwan', favFood: 'Bukan elak', dislikeFood: 'elak',
      wishlist: 'Bukan elak', suggestedByFriends: 'Cash',
      bgImageUrl: 'assets/iwan.jpg'
    },
    {
      id: 8, fullName: 'Daniela Vallerine Gunawan', nickname: 'Ela', favFood: 'Salmon sushi, seblak, all sweets food', dislikeFood: 'Makanan berbau (jengkol, pete), sayur ^_^',
      wishlist: 'Pink keycaps, matcha powder', suggestedByFriends: '',
      bgImageUrl: 'assets/ela.jpg'
    },
    {
      id: 9, fullName: 'Excellent Zefanya Devona Syallom', nickname: 'Excel', favFood: 'Sate Ayam Madura', dislikeFood: 'Keju Biru',
      wishlist: 'Sepatu Lari Nike', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'assets/excel.jpg'
    },
    {
      id: 10, fullName: 'Irwan Setiawan Kamil', nickname: 'Irwan', favFood: 'Gado-Gado', dislikeFood: 'Daging Kambing',
      wishlist: 'Sepatu Lari Nike', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'assets/irwan.jpg'
    },
    {
      id: 11, fullName: 'Jennifer Tan', nickname: 'Jenni', favFood: 'Sushi', dislikeFood: 'Bawang Mentah',
      wishlist: 'Tempat sampah mobil', suggestedByFriends: 'Tiket Liburan ke Jogja',
      bgImageUrl: 'assets/jenni.jpg'
    },
    {
      id: 12, fullName: 'Jessie La Vonna Sanjaya', nickname: 'Jessiela', favFood: 'Es Krim Gelato', dislikeFood: 'Sayur Bayam',
      wishlist: 'Buku Desain UI/UX', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'assets/jessiela.jpg'
    },
    {
      id: 13, fullName: 'Jesslyn Tanuwijaya', nickname: 'Jesslyn', favFood: 'Pasta & sushi', dislikeFood: 'Minuman susu & sosis',
      wishlist: 'Brush makeup eye set', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'assets/jesslyn.jpg'
    },
    {
      id: 14, fullName: 'Kenzie Erico Tjandra', nickname: 'Kenzie', favFood: 'Ayam Geprek', dislikeFood: 'Keju Biru',
      wishlist: 'Skincare Set Laneige', suggestedByFriends: 'Coffee Maker',
      bgImageUrl: 'assets/kenzie.jpg'
    },
    {
      id: 15, fullName: 'Kevin Brave', nickname: 'Kevin', favFood: 'Soto Betawi', dislikeFood: 'Jeroan',
      wishlist: 'Mouse Logitech MX Master', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'assets/kevin.jpg'
    },
    {
      id: 16, fullName: 'Laurensia Vilda Yovira', nickname: 'Vilda', favFood: 'Seafood Saus Padang', dislikeFood: 'Sayur Bayam',
      wishlist: 'Mesin Kopi Kapsul', suggestedByFriends: 'Coffee Maker',
      bgImageUrl: 'assets/vilda.jpg'
    },
    {
      id: 17, fullName: 'Ridho Andhika', nickname: 'Ridho', favFood: 'Gado-Gado', dislikeFood: 'Sayur Bayam',
      wishlist: 'Mouse Logitech MX Master', suggestedByFriends: 'Tiket Liburan ke Bali',
      bgImageUrl: 'assets/ridho.jpg'
    },
    {
      id: 18, fullName: 'Steven Jayadi Wiyanto', nickname: 'Jay', favFood: 'Pizza Margherita', dislikeFood: 'Durian',
      wishlist: 'Keyboard Mechanical Varmilo', suggestedByFriends: 'Voucher Belanja',
      bgImageUrl: 'assets/jay.jpg'
    },
    {
      id: 19, fullName: 'Sylvia Krisnando', nickname: 'Sylvia', favFood: 'Steak Wagyu', dislikeFood: 'Makanan Pedas',
      wishlist: 'Tas Selempang Eiger', suggestedByFriends: 'Coffee Maker',
      bgImageUrl: 'assets/sylvi.jpg'
    },
    {
      id: 20, fullName: 'Yandi Wijaya', nickname: 'Yandi', favFood: 'Nasi Padang', dislikeFood: 'Pete',
      wishlist: 'Tas Selempang Eiger', suggestedByFriends: 'Coffee Maker',
      bgImageUrl: 'assets/yandi.jpg'
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
