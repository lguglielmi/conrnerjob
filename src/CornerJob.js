import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Dimmer,
  Divider,
  Dropdown,
  Form,
  Grid,
  Input,
  Loader,
  Segment,
} from 'semantic-ui-react'
import _ from 'lodash'

import { fetchSongs } from '_actions/songs'
import ListSongs from 'components/ListSongs'
import 'App.css'

const options = [
  {
    text: 'Genre',
    value: 'genre',
  },
  {
    text: 'Price',
    value: 'price',
  },
  {
    text: 'Duration',
    value: 'duration',
  },
]


class CornerJob extends Component {

  constructor(props) {
    super(props)

    this.state={
      player: {
        play: false,
      }
    }

    this.controls = this.controls.bind(this)

  }

  componentDidMount() {
    this.props.fetchSongs('')
  }

  _search(e, {name, value}) {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }

    if (name==='search' && value.length >= 5) {
      this.timeOut = setTimeout( () => {
        this.props.fetchSongs(value)
      }, 500)
    }
  }

  controls() {
    let { play } = this.state.player
    this.setState({
      player:{
        play: ! play,
      }
    })
  }

  sortResults() {
    let { results } = this.props.songs.data
    return _.orderBy(results, ['price'],['asc']);
  }

  render() {
    let { songs } = this.props

    return (
      <Grid container id='main-container' padded='vertically'>
        <Grid.Row>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                loading={ songs.isFetching }
                icon='user'
                placeholder='Search...'
                onChange={ (e,v) => this._search(e, {'name': 'search', 'value': v.value}) }
              />
              <Form.Select
                placeholder='Sort by'
                fluid
                selection
                options={ options }
                fluid
                onChange={ (e,v) => this.sortResults(e, {'name': 'sortBy', 'value': v.value}) }
              />
            </Form.Group>
            <Form.Button
              onClick={ (e,v) => this._search(e, {'name': 'search', 'value': v.value}) }
            >
              Search
            </Form.Button>
          </Form>        
        </Grid.Row>
          <Divider />
          <Grid.Row columns={4}>
            {
              ! _.isEmpty(songs.data) &&
              <ListSongs
                data={ songs.data }
                isLoading={ songs.isFetching }
                controls={ this.controls }
                isPlaying={ this.state.player.play }
                nextSong={ this.state.nextSong }
                prevSong={ this.state.prevSong }
                actualSong={ this.state.actualSong }
              />
            }
          </Grid.Row>
      </Grid>
    )
  }
}

export default connect(
  store => ({
    songs: store.songs,
  }),
  dispatch => ({
    fetchSongs: bindActionCreators(fetchSongs, dispatch)
  })
)(CornerJob)
