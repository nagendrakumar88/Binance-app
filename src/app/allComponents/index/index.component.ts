import { Component, OnInit } from '@angular/core';
import { BinanceService } from '../../services/binance.service';
import { BinanceEntity } from '../../model/binance-entity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{

  binanceData: BinanceEntity[] = [];
  loading = true;
  searchQuery: string = ''; 
  errorMessage = '';
  sortOrder: 'asc' | 'desc' = 'desc';


  constructor(private binanceService:BinanceService){}

  ngOnInit() {
    this.getBinanceData();
  }

  public getBinanceData() {
    this.binanceService.getAllCoins().subscribe({
      next: (data) => {
        this.binanceData = data
          .filter(coin => coin.symbol.endsWith('USDT')) // ✅ Filter only USDT pairs
          .map(coin => ({
            ...coin, 
            symbol: `${coin.symbol.replace('USDT', '')}/USDT`,  // Format symbol (e.g., BTC/USDT)
            volume: coin.quoteVolume ? (parseFloat(coin.quoteVolume) / 1_000_000).toFixed(2) + 'M' : '0M', 
            lastPrice: parseFloat(coin.lastPrice).toFixed(4), 
            priceChangePercent: parseFloat(coin.priceChangePercent).toFixed(2), 
          }));
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch data';
        this.loading = false;
      }
    });
  }
  

  get filteredCoins(): BinanceEntity[] {
    return this.binanceData.filter(coin =>
      coin.symbol.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }
  
  sortByChange(order: 'asc' | 'desc') {
    this.sortOrder = order;
    this.binanceData.sort((a, b) => {
      const valueA = parseFloat(a.priceChangePercent);
      const valueB = parseFloat(b.priceChangePercent);
      
      return order === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }
}
