import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/models/coin/coin';
import { Ticker } from 'src/app/models/coin/ticker/ticker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  coinId: string
  api: string
  coin: Coin

  constructor(private http: HttpClient, private router: Router) {
    this.coinId = window.location.href.split('/').pop() || 'bitcoin'
    this.api = `https://api.coingecko.com/api/v3/coins/${this.coinId}?localization=false&market_data=false&community_data=false&developer_data=false&tickers=true`
  }

  ngOnInit(): void {
    this.http.get<Coin>(this.api).subscribe(
      (res) => {
        this.coin = this.createCoin(res)
        console.log(this.coin)
      },
      (err) => console.error(err)
    );
  }

  createCoin(data: any): Coin {
    let images = []
    for (let image in data.image) {
      images.push(data.image[image])
    }

    let tickers: Ticker[] = []
    for (let ticker in data.tickers) {
      tickers.push(this.createTicker(data.tickers[ticker]))
    }

    return new Coin(data.id, data.name, data.description.en, data.links.homepage[0], images, tickers)
  }

  createTicker(data: any): Ticker {
    let converted_last: any = {}
    for (let conv_lst in data.converted_last) {
      converted_last[conv_lst] = data.converted_last[conv_lst]
    }

    return new Ticker(data.base, data.target, data.last, data.volume, converted_last)
  }
}
