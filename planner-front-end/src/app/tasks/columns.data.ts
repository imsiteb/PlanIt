import dayjs, { type Dayjs } from 'dayjs' //  легковесная штука для дней, неделй в джс
import 'dayjs/locale/ru' // подключение локали
import isoWeek from 'dayjs/plugin/isoWeek' // ISO неделя
import weekOfYear from 'dayjs/plugin/weekOfYear' // плагин для работы с неделями

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

export const FILTERS: Record<string, Dayjs> = { // Record обозначает что ключ - строка, а значение ключа Dayjs
	today: dayjs().startOf('day'),
	tomorrow: dayjs().add(1, 'day').startOf('day'),
	'on-this-week': dayjs().endOf('isoWeek'),
	'on-next-week': dayjs().add(1, 'week').startOf('day'),
	later: dayjs().add(2, 'week').startOf('day')
}

export const COLUMNS = [
	{
		label: 'Today',
		value: 'today'
	},
	{
		label: 'Tomorrow',
		value: 'tomorrow'
	},
	{
		label: 'On this week',
		value: 'on-this-week'
	},
	{
		label: 'On next week',
		value: 'on-next-week'
	},
	{
		label: 'Later',
		value: 'later'
	},
	{
		label: 'Completed',
		value: 'completed'
	}
]
