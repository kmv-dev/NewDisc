export default {
  setSearchData (state, searchValue) {
    state.cards = state.cards.filter(function (item) {
      return item.title?.toLowerCase().includes(searchValue.toLowerCase())
    })
  }
}
