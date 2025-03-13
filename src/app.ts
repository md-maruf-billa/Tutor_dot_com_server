import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/utils/globalErrorHandler'
import manageResponse from './app/utils/manageResponse'
import routes from './routes'

const app: Application = express()

// Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// custom routes
routes.map(rt => app.use(rt.path, rt.route))

app.get('/', (req: Request, res: Response) => {
  manageResponse(res, {
    message: 'Toutor.com server perfectly running!!!',
    statusCode: 200,
    success: true,
    data: null
  })
})

// Not Found Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'API not found'
  })
})

// Global Error Handler (must be the last middleware)
app.use(globalErrorHandler)

export default app
