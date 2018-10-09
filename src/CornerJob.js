import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Divider,
  Form,
  Grid,
  Image,
  Modal,
  Header,
  Icon,
  Button,
} from 'semantic-ui-react'
import _ from 'lodash'

import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

import {
  FacebookIcon,
  GooglePlusIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share';

import ReactPlayer from 'react-player'
import { fetchSongs } from '_actions/songs'
import ListSongs from 'components/ListSongs'
import 'App.css'

const options = [
  {
    text: 'Genre ASC',
    value: 'SORT_BY_GENRE_ASC',
  },
  {
    text: 'Genre DESC',
    value: 'SORT_BY_GENRE_DESC',
  },
  {
    text: 'Price asc',
    value: 'SORT_BY_PRICE_ASC',
  },
  {
    text: 'Price desc',
    value: 'SORT_BY_PRICE_DESC',
  },
  {
    text: 'Duration desc',
    value: 'SORT_BY_DURATION_DESC',
  },
  {
    text: 'Duration asc',
    value: 'SORT_BY_DURATION_ASC',
  },
]


class CornerJob extends Component {

  constructor(props) {
    super(props)

    this.state={
      player: {
        play: false,
        open: false,
      },
      search:{
        value: ''
      }
    }

    this.controls = this.controls.bind(this)
    this.toggleVisibilityModalPlayer = this.toggleVisibilityModalPlayer.bind(this)

  }

  componentDidMount() {
    this.props.fetchSongs('')
  }

  _search(e, {name, value}) {
    this.setState({
      search:{
        value,
      }
    })

    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }

    if (name==='search' && value.length >= 5) {
      this.timeOut = setTimeout( () => {
        this.props.fetchSongs(value, false)
      }, 500)
    }
  }

  controls(e, {name, value}) {
    let { play } = this.state.player,
        { results } = this.props.songs.data,
        index = _.findIndex(results, {trackId: value})

    switch(name) {
      case 'next':
        this.setState({
          player:{
            ...this.state.player,
            song: results[index+1],
          }
        })
      break;
      case 'prev':
        this.setState({
          player:{
            ...this.state.player,
            song: results[index-1],
          }
        })
      break;
      case 'play':
        this.setState({
          player:{
            ...this.state.player,
            play: ! play,
          }
        })
      break;
      default:
        this.setState({
          player:{
            ...this.state.player,
            song: results[index],
          }
        })
    }
  }

  toggleVisibilityModalPlayer(songId) {
    let { open } = this.state.player,
        { results } = this.props.songs.data,
        songToPlay = _.find(results, {trackId: songId})

    this.setState({
      player:{
        play: false,
        open: ! open,
        song: songToPlay,
      }
    })
  }


  sortResults(e, {name, value}) {
    let { search } = this.state
    this.setState({
      search:{
        ...search,
        [name]: value,
      }
    })
    this.props.fetchSongs(search.value, value)

  }

  renderPlayerModal() {
    let { song } = this.state.player,
        { results } = this.props.songs.data,
        socialButtons = () => (
          <React.Fragment>
            <TwitterShareButton
              url={song.previewUrl}
              title='estoy escuchando!'
            >
              <TwitterIcon
                size={32}
                round />
            </TwitterShareButton>
            <FacebookShareButton
              url={song.previewUrl}
              title='estoy escuchando!'
            >
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>
          </React.Fragment>
        )

    return (
      <Modal
        dimmer='blurring'
        open={ this.state.player.open }
        onClose={ () => this.setState({player:{open: false}}) }
        size='large'
        key={ `modal_${song.trackId}` }
      >
        <Modal.Header>Now playing: { song.trackName }</Modal.Header>
        <Modal.Content image>
            <Image size='big' src={ song.artworkUrl100 } />
            <Modal.Description>
              <Header>Artist: { song.artistName }</Header>
              <Header as='h4'>Album: { song.collectionName }</Header>
              <Header as='h4'>Gender: { song.primaryGenreName }</Header>
              <Header as='h5'>Price: { song.currency } { song.trackPrice }</Header>
              <Divider />
                <Button.Group icon>
                  <Button>
                    <Icon
                      name={ this.state.player.play ? 'stop' : 'play'}
                      onClick={ (e,v) => this.controls(e, { name: 'play', value: song.trackId }) }

                    />
                  </Button>
                  <Button
                    disabled={ _.findIndex(results, {trackId: song.trackId}) === 0 ? true : false }
                  >
                    <Icon
                      name='fast backward'
                      onClick={ (e,v) => this.controls(e, { name: 'prev', value: song.trackId }) }
                    />
                  </Button>
                  <Button>
                    <Icon
                      name='pause'
                    />
                  </Button>
                  <Button>
                    <Icon
                      name='fast forward'
                      onClick={ (e,v) => this.controls(e, { name: 'next', value: song.trackId }) }
                    />
                  </Button>
                </Button.Group>
                <ReactPlayer
                  url={ song.previewUrl }
                  playing={ this.state.player.play }
                  width={ 0 }
                  height={ 0 }
                />
                <Divider />
                  <Header as='h3'>Enjoy & share!</Header>
                { socialButtons() }
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
            <Form.Group>
              <Form.Input
                loading={ songs.isFetching }
                icon='music'
                placeholder='Search...'
                onChange={ (e,v) => this._search(e, {'name': 'search', 'value': v.value}) }
              />
              <Form.Select
                placeholder='Sort by'
                selection
                options={ options }
                fluid
                onChange={ (e,v) => this.sortResults(e, {'name': 'sortBy', 'value': v.value}) }
                disabled={ _.isEmpty(this.state.search.value) }
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
                toggleVisibilityModalPlayer={ this.toggleVisibilityModalPlayer }
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
