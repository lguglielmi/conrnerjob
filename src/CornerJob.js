import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Divider, Segment, Input, Dimmer, Loader } from 'semantic-ui-react'
import _ from 'lodash'

import { fetchSongs } from '_actions/songs'
import logo from 'logo.svg'
import ListSongs from 'components/ListSongs'
import 'App.css'


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

  render() {
    let { songs } = this.props

    return (
      <Grid container id='main-container' padded='vertically'>
        <Grid.Row>
          <Input
            loading={ songs.isFetching }
            icon='user'
            placeholder='Search...'
            onChange={ (e,v) => this._search(e, {'name': 'search', 'value': v.value}) }/>
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
