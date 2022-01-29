export class Ticker {
    base: string
    target: string
    last: number
    volume: number
    converted_last: {}

    constructor(base: string, target: string, last: number, volume: number, converted_last: {}) {
        this.base = base
        this.target = target
        this.last = last
        this.volume = volume
        this.converted_last = converted_last
    }
}
