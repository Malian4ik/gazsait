// lib/offers.ts — CMS-ready offers data. Edit this file to update promotions.

export interface Offer {
  id: string
  tag: { ru: string; en: string }
  title: { ru: string; en: string }
  desc: { ru: string; en: string }
  badge?: { ru: string; en: string }
  validUntil?: string // ISO date string
}

const offers: Offer[] = [
  {
    id: 'availability',
    tag: { ru: 'Сегодня', en: 'Today' },
    title: { ru: 'Есть свободные комнаты', en: 'Rooms Available' },
    desc: {
      ru: 'Забронируйте сейчас — мы быстро подтвердим наличие мест на вечер.',
      en: 'Book now — fast confirmation for tonight.',
    },
    badge: { ru: 'Горящее', en: 'Hot' },
  },
  {
    id: 'student',
    tag: { ru: 'Студентам', en: 'Students' },
    title: { ru: 'Скидка 20% по студенческому', en: '20% off with student ID' },
    desc: {
      ru: 'Предъявите студенческий билет администратору при заселении.',
      en: 'Show your student ID at check-in.',
    },
    badge: { ru: '−20%', en: '−20%' },
  },
  {
    id: 'weekdays',
    tag: { ru: 'Дневной тариф', en: 'Daytime limits' },
    title: { ru: 'Скидки в будние дни', en: 'Weekday Discounts' },
    desc: {
      ru: 'Играйте с 10:00 до 17:00 по специальным выгодным ценам.',
      en: 'Play from 10:00 to 17:00 at special discounted rates.',
    },
  },
]

export default offers
