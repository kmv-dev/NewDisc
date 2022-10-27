export default {
  setCards (state, data) {
    state.cards = data
  },
  setSearchData (state, searchValue) {
    state.cards = state.cards.filter(function (item) {
      return item.title?.toLowerCase().includes(searchValue.toLowerCase())
    })
  },
  setSortData (state, sortMethod) {
    if (sortMethod === 'high') {
      state.cards = state.cards.sort(function (a, b) {
        return b.cost - a.cost
      })
    }
    if (sortMethod === 'low') {
      state.cards = state.cards.sort(function (a, b) {
        return a.cost - b.cost
      })
    }
    if (sortMethod === 'start') {
      state.cards = state.cards.sort(function (a, b) {
        return a.title.localeCompare(b.title)
      })
    }
    if (sortMethod === 'end') {
      const sortArr = state.cards.sort(function (a, b) {
        return a.title.localeCompare(b.title)
      })
      state.cards = sortArr.reverse()
    }
  }
}
