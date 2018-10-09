import _ from 'lodash'

const songs = (
  songs={
    isFetching: false,
    data: [],
  },
  action
) => {
  let data
  switch(action.type) {
    case 'FETCHING_SONGS':
      return { 
        isFetching: true,
        data: [],
      }
    case 'FETCHED_SONGS':
      return {
        isFetching: false,
        data: action.data,
      }
    case 'SORT_BY_PRICE_ASC':
      data= {
        results: _.orderBy(action.data.results, ['trackPrice'],['asc'])
      }
      return {
        isFetching: false,
        data: data,
      }
    case 'SORT_BY_PRICE_DESC':
      data= {
        results: _.orderBy(action.data.results, ['trackPrice'],['desc'])
      }
      return {
        isFetching: false,
        data: data,
      }
    case 'SORT_BY_GENRE_ASC':
      data= {
        results: _.orderBy(action.data.results, ['primaryGenreName'],['asc'])
      }
      return {
        isFetching: false,
        data: data,
      }
    case 'SORT_BY_GENRE_DESC':
      data= {
        results: _.orderBy(action.data.results, ['primaryGenreName'],['desc'])
      }
      return {
        isFetching: false,
        data: data,
      }
    case 'SORT_BY_DURATION_DESC':
      data= {
        results: _.orderBy(action.data.results, ['trackTimeMillis'],['desc'])
      }
      return {
        isFetching: false,
        data: data,
      }
    case 'SORT_BY_DURATION_ASC':
      data= {
        results: _.orderBy(action.data.results, ['trackTimeMillis'],['asc'])
      }
      return {
        isFetching: false,
        data: data,
      }
    default:
      return songs
  }
}

export default songs
