export type PriceRequest = {
    startDate: number,
    endDate: number,
    ticker: string
}

export type PriceResponse = {
    ticker: string,
    buyInformation: {
        date: number,
        price: number
    },
    sellInformation: {
        date: number,
        price: number
    },
    profit: number
}