const cards = [
  {
    id: 3,
    preview_img_path: 'src/assets/img/card-bg.jpg',
    title: 'Базовые принципы разработки решений с блокчейн',
    cost: 135000,
    cost_currency: '₽',
    series: 'Программирование'
  },
  {
    id: 8,
    preview_img_path: 'src/assets/img/card-bg-2.jpg',
    title: 'Базовые принципы разработки решений с блокчейн. Продвинутый уровень',
    cost: 80000,
    cost_currency: '₽',
    series: 'Программирование'
  },
  {
    id: 1,
    preview_img_path: 'src/assets/img/card-bg-3.jpg',
    title: 'Как добывают нефть',
    cost: 135000,
    cost_currency: '₽',
    series: 'Профессия'
  },
  {
    id: 6,
    preview_img_path: 'src/assets/img/card-bg-3.jpg',
    title: 'Как добывают нефть. Продвинутый уровень',
    cost: 150000,
    cost_currency: '₽',
    series: 'Профессия'
  },
  {
    id: 2,
    preview_img_path: 'src/assets/img/card-bg-3.jpg',
    title: 'Основы искусственного интеллекта и машинного обучения с Python',
    cost: 135000,
    cost_currency: '₽',
    series: 'Программирование'
  },
  {
    id: 7,
    preview_img_path: 'src/assets/img/card-bg-2.jpg',
    title: 'Основы искусственного интеллекта и машинного обучения с Python. Продвинутый уровень',
    cost: 150000,
    cost_currency: '₽',
    series: 'Программирование'
  },
  {
    id: 4,
    preview_img_path: 'src/assets/img/card-bg.jpg',
    title: 'Продажи от «А» до «Я»',
    cost: 135000,
    cost_currency: '₽',
    series: 'Бизнес навыки'
  },
  {
    id: 9,
    preview_img_path: 'src/assets/img/card-bg-2.jpg',
    title: 'Продажи от «А» до «Я». Продвинутый уровень',
    cost: 160000,
    cost_currency: '₽',
    series: 'Бизнес навыки'
  },
  {
    id: 10,
    preview_img_path: 'src/assets/img/card-bg-3.jpg',
    title: 'Прокрастинация: как не откладывать дела',
    cost: 135000,
    cost_currency: '₽',
    series: 'Бизнес навыки'
  },
  {
    id: 5,
    preview_img_path: 'src/assets/img/card-bg-2.jpg',
    title: 'Прокрастинация: как не откладывать дела. Продвинутый уровень',
    cost: 150000,
    cost_currency: '₽',
    series: 'Бизнес навыки'
  },
  {
    id: 25,
    preview_img_path: 'src/assets/img/card-bg-2.jpg',
    title: 'Прокрастинация: как не откладывать дела. Продвинутый уровень',
    cost: 150000,
    cost_currency: '₽',
    series: 'Бизнес навыки'
  },
  {
    id: 32,
    preview_img_path: 'src/assets/img/card-bg.jpg',
    title: 'Базовые принципы разработки решений с блокчейн',
    cost: 135000,
    cost_currency: '₽',
    series: 'Программирование'
  },
  {
    id: 822,
    preview_img_path: 'src/assets/img/card-bg-2.jpg',
    title: 'Базовые принципы разработки решений с блокчейн. Продвинутый уровень',
    cost: 80000,
    cost_currency: '₽',
    series: 'Программирование'
  },
  {
    id: 132,
    preview_img_path: 'src/assets/img/card-bg-3.jpg',
    title: 'Как добывают нефть',
    cost: 135000,
    cost_currency: '₽',
    series: 'Профессия'
  },
  {
    id: 6323,
    preview_img_path: 'src/assets/img/card-bg-3.jpg',
    title: 'Как добывают нефть. Продвинутый уровень',
    cost: 150000,
    cost_currency: '₽',
    series: 'Профессия'
  },
  {
    id: 223,
    preview_img_path: 'src/assets/img/card-bg-3.jpg',
    title: 'Основы искусственного интеллекта и машинного обучения с Python',
    cost: 135000,
    cost_currency: '₽',
    series: 'Программирование'
  },
  {
    id: 723,
    preview_img_path: 'src/assets/img/card-bg-2.jpg',
    title: 'Основы искусственного интеллекта и машинного обучения с Python. Продвинутый уровень',
    cost: 150000,
    cost_currency: '₽',
    series: 'Программирование'
  },
  {
    id: 4323,
    preview_img_path: 'src/assets/img/card-bg.jpg',
    title: 'Продажи от «А» до «Я»',
    cost: 135000,
    cost_currency: '₽',
    series: 'Бизнес навыки'
  },
  {
    id: 91,
    preview_img_path: 'src/assets/img/card-bg-2.jpg',
    title: 'Продажи от «А» до «Я». Продвинутый уровень',
    cost: 160000,
    cost_currency: '₽',
    series: 'Бизнес навыки'
  },
  {
    id: 1033,
    preview_img_path: 'src/assets/img/card-bg-3.jpg',
    title: 'Прокрастинация: как не откладывать дела',
    cost: 135000,
    cost_currency: '₽',
    series: 'Бизнес навыки'
  },
  {
    id: 52,
    preview_img_path: 'src/assets/img/card-bg-2.jpg',
    title: 'Прокрастинация: как не откладывать дела. Продвинутый уровень',
    cost: 150000,
    cost_currency: '₽',
    series: 'Бизнес навыки'
  },
  {
    id: 2522,
    preview_img_path: 'src/assets/img/card-bg-2.jpg',
    title: 'Прокрастинация: как не откладывать дела. Продвинутый уровень',
    cost: 150000,
    cost_currency: '₽',
    series: 'Бизнес навыки'
  }
]
export default cards
