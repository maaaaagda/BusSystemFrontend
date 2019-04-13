import MUTATION_TYPES from './mutation-types'

export default {
  [MUTATION_TYPES.LOAD_NEWS] (state, data) {
    state.news = data
  },
  [MUTATION_TYPES.SET_NEWS_LOADED] (state) {
    state.newsLoaded = true
  },
  [MUTATION_TYPES.UNSET_NEWS_LOADED] (state) {
    state.newsLoaded = false
  },
  [MUTATION_TYPES.TOTAL_NEWS_PAGES] (state, totalPages) {
    state.totalNewsPages = totalPages
  }
}
