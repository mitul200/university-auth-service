import path from 'path'
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf, prettyPrint } = format
import DailyRotateFile from 'winston-daily-rotate-file'
// creat formets
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const mins = date.getMinutes()
  const hours = date.getHours()
  const secound = date.getSeconds()
  return `[${label}] ${level}: ${message} ${date.toDateString()}, ${mins}:,${hours}:,${secound}`
})

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat,
    prettyPrint(),
  ),

  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'phu-success-%DATE%.log',
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    }),
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat,
    prettyPrint(),
  ),

  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phu-error-%DATE%.log',
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    }),
  ],
})

export { logger, errorLogger }
