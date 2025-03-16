import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BinanceEntity } from '../model/binance-entity';

@Injectable({
  providedIn: 'root'
})
export class BinanceService {

  private apiUrl = 'https://api.binance.com/api/v3/';

  constructor(private http: HttpClient) {}

  getAllCoins(): Observable<BinanceEntity[]> {
    return this.http.get<BinanceEntity[]>(`${this.apiUrl}ticker/24hr`);
  }
}
