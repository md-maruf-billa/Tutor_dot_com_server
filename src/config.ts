import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

const config = {
  database_url: process.env.DB_URL,
  port: process.env.PORT
}

export default config
