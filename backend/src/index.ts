import fs from 'fs/promises'
import app from './app'
import { CANVAS_WIDTH, PORT, SQL_DATA_DIR } from './config'
import sql from './sql'
import cache from './cache'

const main = async () => {

  console.clear()

  console.log('Creating database dir...')
  await fs.mkdir(SQL_DATA_DIR, { recursive: true })
  console.log('Create database dir done!')

  console.log('Creating table...')
  await sql.createTable()
  console.log('Create table done!')

  console.log('Creating cache...')
  const points = await sql.getPoints()
  for (const point of points) {
    const { x, y, color } = point
    const key = x * CANVAS_WIDTH + y
    cache.points[key] = color
  }
  console.log('Create cache done!')

  app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`)
  })
}

main()