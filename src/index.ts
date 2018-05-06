import * as fs from 'fs'
import * as path from 'path'
import * as Koa from 'koa'
import * as bodyParser from 'koa-body'
import router from './routes'
import cacheFile from './utils/cacheFile'
import logger from './utils/logger'

// load config
require('dotenv').config({
  path: path.join(
    __dirname,
    '../config/',
    process.env.NODE_ENV === 'development' ? '.env' : '.env.prod',
  ),
})

// set port
const { PORT = 3000 } = process.env

// init app
const app = new Koa()

// enable body parser
app.use(
  bodyParser({
    multipart: true,
    urlencoded: true,
    json: true,
    formidable: {
      keepExtensions: true,
    },
  }),
)

// enable router
app.use(router.routes()).use(router.allowedMethods())

// start app
const server = app.listen(PORT, () => {
  logger.info(`Server is running on ${PORT}`)
})
