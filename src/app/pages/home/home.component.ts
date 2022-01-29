import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

interface Coin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  api: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  coins: Coin[] = [];
  titles: string[] = ['#', 'Coin', 'Price', 'Price Change', '24H Volume', 'Favorite'];
  searchText: string = '';
  filteredCoints: Coin[] = [];

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.http.get<Coin[]>(this.api).subscribe(
      (res) => {
        this.coins = res;
        this.filteredCoints = this.coins;
      },
      (err) => console.error(err)
    );
  }

  searchCoin() {
    this.filteredCoints = this.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  isFavorite(coin: string): boolean {
    let user = JSON.parse(window.sessionStorage.getItem("user") || '')
    return user.favList.includes(coin)
  }

  addFavCoin(coin: string): void {
    let user = JSON.parse(window.sessionStorage.getItem("user") || '')
    if (user.favList.includes(coin)) {
      let coinIndex = user.favList.indexOf(coin)
      console.log(coinIndex)
      user.favList.splice(coinIndex, 1)
    } else {
      user.favList.push(coin)
    }
    window.sessionStorage.setItem("user", JSON.stringify(user))
  }

  signOut(): void {
    let user = JSON.parse(window.sessionStorage.getItem("user") || '')
    this.userService.updateFavorite(user).subscribe(result => {
      window.sessionStorage.clear()
      this.router.navigate(["/signin"])
    })
  }

}
