<template>
  <div class="catalog">
    <div class="catalog__inner">
      <h1 class="catalog__title">Каталог курсов</h1>
      <div class="catalog__search search">
        <span class="search__label" ref="label">Поиск</span>
        <input
          v-model="searchValue"
          class="search__input active"
          type="text"
          placeholder="Поиск по каталогу"
          @click="isFocus()"
          @blur="isBlur()"
        >
        <button class="search__btn" @click="search()">
          <span class="search__icon icon-search"></span>
        </button>
      </div>
      <div class="catalog__sort sort">
        <span class="sort__count">
          {{ cards.length }} {{getEnding(cards.length, 'результат', 'результата', 'результатов')}}
        </span>
        <div class="sort__action">
          <span class="sort__label"><span>Сортировать</span> по:</span>
          <div class="sort__inner">
            <button
              v-for="(sort, index) in sortItems"
              :key="sort.id"
              class="sort__btn"
              :class="{active : index === currentSort}"
              @click="sortCourse(index, sort.nameMethod)"
            >
              <span class="sort__name">{{sort.nameMethod}}</span>
              <span
                v-if="index === currentSort"
                class="sort__icon"
                 :class="iconClass"
              ></span>
            </button>
          </div>
        </div>
      </div>
      <div class="catalog__cards">
        <div
          class="catalog__card card"
          v-for="card in paginatedData"
          :key="card.id"
          :tabindex="card.id"
        >
          <div class="card__bg"></div>
          <img class="card__img" :src="card.preview_img_path" alt="banner">
          <div class="card__content">
            <div class="card__inner">
              <span class="card__series">{{ card.series }}</span>
              <span class="card__title">{{ card.title }}</span>
            </div>
            <div class="card__price">
              <span class="card__cost">{{ card.cost }}</span>
              <span class="card__currency">{{ card.cost_currency }}</span>
            </div>
            <button class="card__btn btn">
              <span class="btn__text">Подробнее</span>
              <span class="btn__icon icon-small_long_right"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="catalog__pagination" v-if="formedPages && pageCount !== 1">
        <ul class="pagination">
          <button
            class="pagination__button"
            :class="navBack"
            @click="prevPage"
          >
            <span class="pagination__icon icon-chevron_left"></span>
          </button>
          <li v-for="page in formedPages" class="pagination__item" :key="page">
              <div
                v-if="page === -1"
                class="pagination__page pagination__page_dots"
              >
                ...
              </div>
              <a
                v-else
                class="pagination__page"
                :class="active(page)"
                href="#"
                @click="goToPage(page)"
              >
                {{page}}
              </a>
          </li>
          <button
            class="pagination__button"
            :class="navForward"
            @click="nextPage"
          >
            <span class="pagination__icon icon-chevron_right"></span>
          </button>
        </ul>
      </div>
      <div v-if="pageCount === 0">Ничего не найдено</div>
    </div>
  </div>
</template>

<script>
import {
  addDataToLocalStorage,
  getDataFromLocalStorage,
  removeDataFromLocalStorage
} from '../api/localStorage'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      pageNumber: 0,
      size: 9,
      searchValue: '',
      sortMethod: 'start',
      currentSort: 1,
      isActiveStatus: 1,
      width: window.innerWidth,
      sortItems: [
        {
          nameMethod: 'Цене'
        },
        {
          nameMethod: 'Алфавиту'
        }
      ]
    }
  },
  created () {
    window.addEventListener('resize', this.updateWidth)
  },
  mounted () {
    this.resizeAmountCards()
    this.searchValue = getDataFromLocalStorage('searchValue') || ''
    this.sortMethod = getDataFromLocalStorage('sortMethod') || 'start'
    this.checkSortMethod()
    this.search(this.searchValue)
    this.handleSortMethod(this.sortMethod)
  },
  watch: {
    width () {
      this.resizeAmountCards()
    },
    searchValue () {
      if (this.searchValue === '') {
        this.getCards()
        removeDataFromLocalStorage('searchValue')
      }
    }
  },
  computed: {
    ...mapGetters({
      cards: 'getCards'
    }),
    iconClass () {
      return [
        {
          'icon-short_down': this.sortMethod === 'high' || this.sortMethod === 'start',
          'icon-short_up': this.sortMethod === 'low' || this.sortMethod === 'end'
        }
      ]
    },
    pageCount () {
      const l = this.cards.length
      const s = this.size
      return Math.ceil(l / s)
    },
    paginatedData () {
      const start = this.pageNumber * this.size
      const end = start + this.size
      return this.cards.slice(start, end)
    },
    formedPages () {
      const { pageNumber, pageCount } = this
      if (pageCount >= 5) {
        const array = []
        for (let i = 1; i <= pageCount; i += 1) {
          array.push(i)
        }
        let medium = []
        if (pageNumber >= pageCount - 3) {
          medium = array.splice(pageCount - 4, 3) || []
          medium = [-1, ...medium]
        } else if (pageNumber > 3) {
          medium = array.splice(pageNumber - 2, 5) || []
          medium = [-1, ...medium, -1]
        } else {
          medium = array.splice(1, 4) || []
          medium = [...medium, -1]
        }
        return [
          1, ...medium, pageCount
        ]
      }
      return pageCount
    },
    navBack () {
      return {
        disabled: this.pageNumber === 0
      }
    },
    navForward () {
      return {
        disabled: this.pageNumber >= this.pageCount - 1
      }
    }
  },
  methods: {
    ...mapActions({
      handleSearchValue: 'searchCourse',
      handleSortMethod: 'sortCourse',
      getCards: 'getCards'
    }),
    updateWidth () {
      this.width = window.innerWidth
    },
    search () {
      this.handleSearchValue(this.searchValue)
      if (this.searchValue !== '') {
        addDataToLocalStorage('searchValue', this.searchValue)
      }
    },
    sortCourse (i, name) {
      this.currentSort = i
      if (i === 0 && name === 'Цене') {
        if (this.sortMethod === 'high') {
          this.sortMethod = 'low'
          this.isActiveStatus = 1
          this.handleSortMethod(this.sortMethod)
          addDataToLocalStorage('sortMethod', this.sortMethod)
        } else {
          this.sortMethod = 'high'
          this.isActiveStatus = 0
          this.handleSortMethod(this.sortMethod)
          addDataToLocalStorage('sortMethod', this.sortMethod)
        }
      }
      if (i === 1 && name === 'Алфавиту') {
        if (this.sortMethod === 'start') {
          this.sortMethod = 'end'
          this.isActiveStatus = 0
          this.handleSortMethod(this.sortMethod)
          addDataToLocalStorage('sortMethod', this.sortMethod)
        } else {
          this.sortMethod = 'start'
          this.isActiveStatus = 1
          this.handleSortMethod(this.sortMethod)
          addDataToLocalStorage('sortMethod', this.sortMethod)
        }
      }
    },
    getEnding (number, one, two, five) {
      let n = Math.abs(number)
      n %= 100
      if (n >= 5 && n <= 20) {
        return five
      }
      n %= 10
      if (n === 1) {
        return one
      }
      if (n >= 2 && n <= 4) {
        return two
      }
      return five
    },
    checkSortMethod () {
      if (this.sortMethod === 'low' || this.sortMethod === 'high') {
        this.currentSort = 0
      } else {
        this.currentSort = 1
      }
    },
    resizeAmountCards () {
      if (this.width <= 991) {
        this.size = 6
      } else {
        this.size = 9
      }
      if (this.width <= 575) {
        this.size = 3
      }
    },
    nextPage () {
      this.pageNumber++
    },
    prevPage () {
      this.pageNumber--
    },
    goToPage (page) {
      this.pageNumber = page - 1
    },
    active (page) {
      return {
        active: this.pageNumber === page - 1
      }
    },
    isFocus () {
      this.$refs.label.classList.add('search__label_active')
    },
    isBlur () {
      this.$refs.label.classList.remove('search__label_active')
    }
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  &__title {
    font-weight: 600;
    font-size: 42px;
    color: #4C5A79;
    margin-bottom: 30px;
    @include _575 {
      font-size: 35px;
      margin-bottom: 15px
    }
  }
  &__inner {
    @include container;
  }
  &__search {
    margin-bottom: 20px;
  }
  .search {
    overflow: hidden;
    position: relative;
    background: #F0F4FC;
    &__label {
      position: absolute;
      left: 20px;
      top: 0;
      padding: 1px 4px 0px;
      background: #E2E8F3;
      border-radius: 0px 0px 2px 2px;
      color: #4C5A79;
      font-size: 12px;
      box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.12);
      transform: translateY(-20px);
      transition: 0.3s ease-in-out;
      &_active {
        transform: translateY(0px);
      }
    }
    &__input {
      padding: 17px;
      border: none;
      background: transparent;
      width: 100%;
      padding-right: 60px;
      border-radius: 4px;
      transition: 0.3s ease-in-out;
      &:hover {
        background: #E2E8F3;
      }
      &::placeholder {
        color: #4C5A79;
      }
      &:focus {
        box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.12);
      }
      &:focus::placeholder {
        color: transparent
      }
    }
    &__btn {
      position: absolute;
      right: 20px;
      top: 20px;
      transition: 0.2s ease-in-out;
      &:hover {
        transform: scale(1.111);
      }
    }
    &__icon {
      color: #0066B3;
      font-size: 24px;
      font-weight: bold;
    }
  }
  &__cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-bottom: 45px;
  }
  @include _991 {
    &__cards{
      grid-template-columns: 1fr 1fr;
      grid-gap: 16px;
    }
  }
  @include _575 {
    &__cards{
      grid-template-columns: 1fr;
    }
  }
  .sort {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    &__inner {
      display: flex;
      justify-content: space-around;
      min-width: 130px;
    }
    &__action {
      display: flex;
      align-items: center;
    }
    &__count {
      font-weight: 400;
      font-size: 14px;
      color: #4C5A79;
    }
    &__label {
      font-weight: 400;
      font-size: 14px;
      color: #9DB0BF;
      margin-right: 15px;
      @include _575 {
        margin-right: 4px;
      }
      & span {
        @include _575 {
          display: none;
        }
      }
    }
    &__btn {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-weight: 400;
      font-size: 14px;
      color: #0066B3;
      & .sort__name {
        border-bottom: 1px dashed #0066B3;
      }
      &.active {
        color: #4C5A79;
      }
      &.active .sort__name {
        border: none
      }
      &:hover {
        color: #EB3737;
      }

    }
    &__icon {
      color: #EB3737;
    }
  }
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: flex-start;
    border-radius: 4px;
    overflow: hidden;
    min-height: 400px;
    padding: 30px;
    background: linear-gradient(0deg, #4C5A79 0%, rgba(76, 90, 121, 0.2) 50%);
    transition: 0.3s ease-in-out;
    cursor: pointer;
    max-height: 400px;
    &__bg {
      position: absolute;
      width: 100%;
      height: 0;
      bottom: 0;
      background: linear-gradient(0deg, #4C5A79 0%, rgba(76, 90, 121, 0.7) 100%);
      z-index: 2;
      margin-left: -30px;
      transition: 0.3s ease-in-out;
    }
    &:hover .card__bg {
      height: 100%;
    }
    &:hover .card__content {
      transform: translateY(0px);
    }
    &:hover .card__btn {
      transform: translateY(0px);
    }
    &:focus {
      box-shadow: inset 0px 10px 12px rgba(0, 0, 0, 0.4);
    }
    &__inner {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    &__content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      z-index: 3;
      padding-top: 30px;
      transform: translateY(30px);
      transition: 0.3s ease-in-out;
      min-height: 210px;
    }
    &__img {
      position: absolute;
      height: 100%;
      width: auto;
      object-fit: cover;
      z-index: -1;
      margin: -30px;
    }
    &__series {
      padding: 1px 8px;
      background: #0066B3;
      border-radius: 2px;
      color: #ffffff;
      font-weight: 400;
      font-size: 13px;
      margin-bottom: 12px;
    }
    &__title {
      font-weight: 600;
      font-size: 17px;
      line-height: 25px;
      text-transform: uppercase;
      color: #ffffff;
      margin-bottom: 20px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      line-height: 1.3em;
      height: 3.9em;
    }
    &__price {
      margin-top: auto;
      margin-bottom: 15px;
    }
    &__cost {
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      text-transform: uppercase;
      color: #ffffff;
      margin-right: 5px;
    }
    &__currency {
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      text-transform: uppercase;
      color: #ffffff;
    }
    &__btn {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 18px;
      color: #ffffff;
      transform: translateY(180px);
      transition: 0.3s ease-in-out;
    }
    .btn {
      &__text {
        margin-right: 10px;
      }
    }
  }
  &__pagination {
    display: flex;
    justify-content: center;
  }
  .pagination {
    display: flex;
    &__page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50px;
      min-width: 50px;
      border-radius: 3px;
      font-weight: 700;
      font-size: 18px;
      color: #0066B3;
      background: #F0F4FC;
      text-decoration: none;
      margin: 0 5px;
      transition: 0.3s ease-in-out;
      @include _575 {
        min-height: 35px;
        min-width: 35px;
        font-size: 14px;
        margin: 0 2px;
      }
      &_dots {
        background: #ffffff;
        color: #9DB0BF;
        @include _575 {
          min-height: 10px;
          min-width: 10px;
        }
      }
      &:hover {
        background: #E2E8F3;
      }
      &:focus {
        box-shadow: inset 0px 3px 4px rgba(0, 0, 0, 0.2);
      }
      &.active {
        background: #4C5A79;
        color: #ffffff;
      }
    }
    &__button {
      margin: 0 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      max-height: 50px;
      min-width: 50px;
      border-radius: 3px;
      background: #F0F4FC;
      transition: 0.3s ease-in-out;
      @include _575 {
        display: none;
      }
      &.disabled {
        pointer-events: none;
      }
      &.disabled .pagination__icon {
        color: #9DB0BF;
      }
      &:hover {
        background: #E2E8F3;
      }
      &:focus {
        box-shadow: inset 0px 3px 4px rgba(0, 0, 0, 0.2);
      }
    }
    &__icon {
      color: #0066B3;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
