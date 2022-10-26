export default {
  searchCourse ({ commit }, searchValue) {
    commit('setSearchData', searchValue)
  },
  sortCourse ({ commit }, sortMethod) {
    commit('setSortData', sortMethod)
  }
}
