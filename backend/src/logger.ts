import type { NextFunction } from 'express'

const getCurrentTime = () => {
  const date = new Date()
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const milliseconds = String(date.getMilliseconds()).padEnd(3, '0')
  const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`
  return time
}

const Logger = () => {
  return (req: any, res: any, next: NextFunction) => {
    res['startAt'] = Number(new Date())
    res.setHeader('x-powered-by', 'GPT-4o-mini')
    res.on('finish', () => {
      const currentTime = getCurrentTime()
      const startAt = res['startAt']
      const message = `${currentTime} ${req.method} ${req.originalUrl} ${res.statusCode} ${Number(new Date()) - startAt}ms`
      console.log(message)
    })
    next()
  }
}

export default Logger

