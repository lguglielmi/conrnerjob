import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Dimmer,
  Divider,
  Dropdown,
  Form,
  Grid,
  Image,
  Modal,
  Header,
  Icon,
  Button,
  Input,
  Loader,
  Segment,
} from 'semantic-ui-react'
import _ from 'lodash'

import ReactPlayer from 'react-player'
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
        open: false,
      }
    }

    this.controls = this.controls.bind(this)
    this.toggleModalPlayer = this.toggleModalPlayer.bind(this)

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
        ...this.state.player,
        play: ! play,
      }
    })
  }

  nextSong(songId) {
    let { open } = this.state.player,
        { results } = this.props.songs.data,
        index = _.findIndex(results, {trackId: songId})
    debugger
    this.setState({
      player:{
        ...this.state.player,
        song: results[index+1],
      }
    })
  }

  toggleModalPlayer(songId) {
    let { open } = this.state.player,
        { results } = this.props.songs.data,
        songToPlay = _.find(results, {trackId: songId})

    this.setState({
      player:{
        open: ! open,
        song: songToPlay,
      }
    })
  }


  sortResults() {
    let { results } = this.props.songs.data
    return _.orderBy(results, ['price'],['asc']);
  }

  renderPlayerModal() {
    let { song } = this.state.player
    return (
      <Modal
        dimmer='blurring'
        open={ this.state.player.open }
        onClose={ () => this.setState({player:{open: false}}) }
      >
        <Modal.Header>{ song.trackName }</Modal.Header>
        <Modal.Content image>
            <Image size='huge' src={ song.artworkUrl100 } />
            <Modal.Description>
              <Header>Artist: { song.artistName }</Header>
              <Header as='h4'>Album: { song.collectionName }</Header>
              <Header as='h5'>Price: { song.currency } { song.trackPrice }</Header>
              <Divider />
                <Button.Group icon>
                  <Button>
                    <Icon
                      name={ this.state.player.play ? 'stop' : 'play'}
                      onClick={ this.controls }
                    />
                  </Button>
                  <Button>
                    <Icon name='fast backward' />
                  </Button>
                  <Button>
                    <Icon
                      name='pause'
                      onClick={ this.controls }
                    />
                  </Button>
                  <Button>
                    <Icon
                      name='fast forward'
                      onClick={ () => this.nextSong(song.trackId) }
                    />
                  </Button>
                </Button.Group>
                <ReactPlayer url={ song.previewUrl } playing={ this.state.player.play } />
            </Modal.Description>
          </Modal.Content>
      </Modal>
    )
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
                selection
                options={ options }
                fluid
                onChange={ (e,v) => this.sortResults(e, {'name': 'sortBy', 'value': v.value}) }
              />
            </Form.Group>
          </Form>        
        </Grid.Row>
          <Divider />
          <Grid.Row columns={4}>
            {
              ! _.isEmpty(songs.data) &&
              <ListSongs
                data={ songs.data }
                isLoading={ songs.isFetching }
                toggleModalPlayer={ this.toggleModalPlayer }
              />
            }
            { ! _.isEmpty(this.state.player.song) ? this.renderPlayerModal() : null }
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
