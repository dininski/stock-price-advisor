import { Router } from 'express'
import stockRouter from './stock/stockRouter'
import priceRouter from './price/priceRouter'

const apiRouter = Router({strict: true})
apiRouter.use('/stock', stockRouter)
apiRouter.use('/price', priceRouter)
export default apiRouter