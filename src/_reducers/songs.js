const songs = (
  songs={
    isFetching: false,
    data: [],
  },
  action
) => {
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
    default:
      return songs
  }
}

export default songs
