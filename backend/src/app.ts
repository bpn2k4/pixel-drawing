import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import sql from './sql'
import cache from './cache'
import http from 'http'
import { Server } from 'socket.io'
import Logger from './logger'
import { CANVAS_HEIGHT, CANVAS_PAGE_SIZE, CANVAS_WIDTH } from './config'

const server = express()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(Logger())

server.use(express.static('static'))

const app = http.createServer(server)
const io = new Server(app, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  },
  path: '/web-socket'
})


server.get('/monitor/liveness', async (_, res) => {
  return res.status(200).send('Alive')
})

server.get('/monitor/readiness', async (_, res) => {
  return res.status(200).send('Ready')
})


server.get('/', (_, res) => {
  return res.status(200).send("<h1>Hello World</h1>")
})

const mark_x: { [key: string]: number } = {}
for (let i = 0; i < CANVAS_WIDTH; i += CANVAS_PAGE_SIZE) {
  const index = Math.floor(i / CANVAS_PAGE_SIZE)
  mark_x[String(index)] = Math.floor(i / CANVAS_PAGE_SIZE)
}

const mark_y: { [key: string]: number } = {}
for (let i = 0; i < CANVAS_HEIGHT; i += CANVAS_PAGE_SIZE) {
  const index = Math.floor(i / CANVAS_PAGE_SIZE)
  mark_y[String(index)] = Math.floor(i / CANVAS_PAGE_SIZE)
}

const validateGetPoints = (query: any) => {

  const keys = Object.keys(query)
  for (const key of keys) {
    if (key !== 'px' && key !== 'py') {
      return { error: new Error() }
    }
  }

  const px = mark_x[query.px as string]
  const py = mark_y[query.py as string]

  if (typeof (px) === 'undefined' || typeof (py) === 'undefined') {
    return { error: new Error() }
  }

  return { px, py }
}

server.get('/api/points', async (req, res) => {

  const { px, py, error } = validateGetPoints(req.query)

  if (error) {
    return res.status(400).json({
      message: "Fuck you! Stop do this!"
    })
  }

  const points: any[] = []
  for (let i = 0; i < CANVAS_PAGE_SIZE; i++) {
    for (let j = 0; j < CANVAS_PAGE_SIZE; j++) {
      const x = px * CANVAS_PAGE_SIZE + i
      const y = py * CANVAS_PAGE_SIZE + j
      const key = x * CANVAS_WIDTH + y
      const color = cache.points[key]
      if (color) {
        points.push(x, y, color)
      }
    }
  }

  return res.status(200).send(points)
})

const validateUpdatePoint = (body: any) => {
  const keys = Object.keys(body)
  for (const key of keys) {
    if (key !== 'x' && key !== 'y' && key !== 'color') {
      return { error: new Error() }
    }
  }

  const x = body.x
  const y = body.y
  const color = body.color

  if (typeof (x) === 'undefined' || typeof (y) === 'undefined' || typeof (color) === 'undefined') {
    return { error: new Error() }
  }

  if (typeof (x) !== 'number' || typeof (y) !== 'number' || typeof (color) !== 'string') {
    return { error: new Error() }
  }

  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    return { error: new Error() }
  }

  if (x < 0 || x >= CANVAS_WIDTH || y < 0 || y >= CANVAS_HEIGHT) {
    return { error: new Error() }
  }

  const hexColorPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
  if (!hexColorPattern.test(color)) {
    return { error: new Error() }
  }

  return { x, y, color }
}

server.post('/api/points', async (req, res, next) => {

  try {
    const { x, y, color, error } = validateUpdatePoint(req.body)
    if (error) {
      return res.status(400).json({
        message: "Fuck you! Stop do this!"
      })
    }
    await sql.updatePoint(x, y, color)
    const key = x * CANVAS_WIDTH + y
    cache.points[key] = color
    io.emit('new-point', { x, y, color })
    return res.status(200).json({
      message: "ok"
    })
  } catch (error) {
    next(error)
  }
})

server.get('*', (_, res) => {
  return res.redirect('/')
})

server.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).json({
    message: "Server error"
  })
})

io.on('connection', (client) => {



  client.on('disconnect', () => {

  })
})

export default app