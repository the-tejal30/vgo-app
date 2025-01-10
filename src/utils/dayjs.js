import dayjs from 'dayjs'

import { ternary } from './javascript'

const dayJs = (...args) => dayjs(...args)

const formatDate = (date, format = 'YYYY/MM/DD') =>
  ternary(date, dayJs(date, format), null)

export { dayJs, formatDate }
