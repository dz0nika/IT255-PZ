import { Ticker } from "./ticker/ticker"

export class Coin {
    id: string
    name: string
    description: string
    link: string
    images: string[]
    tickers: Ticker[]

    constructor(id: string, name: string, description: string, link: string, images: string[], tickers: Ticker[]) {
        this.id = id
        this.description = description
        this.link = link
        this.images = images
        this.tickers = tickers
    }

}
