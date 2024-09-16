import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || "8080"
export const SQL_DATA_DIR = process.env.SQL_DATA_DIR || "/tmp/database/"

export const CANVAS_WIDTH = 2000
export const CANVAS_HEIGHT = 2000
export const CANVAS_PAGE_SIZE = 200