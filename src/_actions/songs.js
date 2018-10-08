export const fetchSongs = (value) => {
  let settings = {
    'async': true,
    'Method': 'GET',
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
          type: 'FETCHED_SONGS',
          data,
        })
        resolve(data)
      })
  })
}
