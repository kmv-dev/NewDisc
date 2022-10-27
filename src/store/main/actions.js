import cards from '../../api/mock'
export default {
  getCards ({ commit }) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(cards), 100)
    }).then(data => {
      commit('setCards', data)
    })
  },
  searchCourse ({ commit }, searchValue) {
    commit('setSearchData', searchValue)
  },
  sortCourse ({ commit }, sortMethod) {
    commit('setSortData', sortMethod)
  }
}
