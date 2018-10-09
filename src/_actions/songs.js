export const fetchSongs = (value, sort) => {
  let settings = {
    'async': true,
    'Method': 'GET',
  },
      type
  debugger
  if (sort) {
    switch(sort){
      case 'SORT_BY_PRICE_ASC':
        type = 'SORT_BY_PRICE_ASC'
      break
      case 'SORT_BY_PRICE_DESC':
        type = 'SORT_BY_PRICE_DESC'
      break
      case 'SORT_BY_GENRE_ASC':
        type = 'SORT_BY_GENRE_ASC'
      break
      case 'SORT_BY_GENRE_DESC':
        type = 'SORT_BY_GENRE_DESC'
      break
      case 'SORT_BY_DURATION_DESC':
        type = 'SORT_BY_DURATION_DESC'
      break
      case 'SORT_BY_DURATION_ASC':
        type = 'SORT_BY_DURATION_ASC'
      break
    }
  } else {
    type = 'FETCHED_SONGS'
  }

  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: 'FETCHING_SONGS',
    })

    fetch(`https://itunes.apple.com/search?term=${value}&media=music`, settings)
      .then(
        response => response.json(),
        err => {
          dispatch({
            type: 'FETCHED_SONGS',
            data: [],
          })
          reject(err)
        }
      )
      .then(data => {
        dispatch({
          type: type,
          data,
        })
        resolve(data)
      })
  })
}
