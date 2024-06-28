import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentDTO } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentDTO:PaymentDTO;


  private apiUrl = 'http://localhost:8080/api/payment';

  constructor(private http: HttpClient) {
    this.paymentDTO={
      clientSecret:'',
      paymentIntentId:'',
    }
   }

  paymentIntent(): Observable<PaymentDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<PaymentDTO>(`${this.apiUrl}/intent`, {}, { headers });
  }

  confirm(id: string): Observable<Map<boolean, string>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Map<boolean, string>>(`${this.apiUrl}/confirm/${id}`, {}, { headers } );
  }

  cancel(id: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/cancel/${id}`, null);
  }

  setPaymentDTO(dto: PaymentDTO) {
    this.paymentDTO = dto;
  }

  getPaymentDTO() {
    return this.paymentDTO;
  }
  
}
