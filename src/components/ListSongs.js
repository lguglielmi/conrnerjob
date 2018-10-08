import React, { Component } from 'react'
import { Grid, Image, Card, Divider, Input, Modal, Header, Icon, Button } from 'semantic-ui-react'
import ReactPlayer from 'react-player'
import _ from 'lodash'
import moment from 'moment'

const ListSongs = (props) => {
  let buttons = (
    <Button.Group icon>
      <Button>
        <Icon
          name={ props.isPlaying ? 'stop' : 'play'}
          onClick={ () => props.controls() }
        />
      </Button>
      <Button>
        <Icon name='backward' />
      </Button>
      <Button>
        <Icon
          name='pause'
          onClick={ () => props.controls() }
        />
      </Button>
      <Button>
        <Icon name='forward' />
      </Button>
    </Button.Group>
  )
  let ret = _.map(props.data.results, song => {
    let releaseDate = moment(song.releaseDate).format('MMMM Do YYYY'),
        duration = moment.utc(song.trackTimeMillis).format('mm:s')
    return (
      <Grid.Column>
        <Modal
          dimmer='blurring'
          onClose={ () => props.controls() }
          size='medium'
          trigger={
            <Card>
              <Image src={ song.artworkUrl100 } size='huge' />
              <Card.Content>
                <Card.Header>{ song.trackName }</Card.Header>
                <Card.Meta>
                  <div className='truncate' title={ song.artistName } >{ song.artistName }</div>
                  <div className='truncate' title={`From album: ${ song.collectionName }`} >{ song.collectionName }</div>
                  <span className='date'>{ releaseDate }</span>
                </Card.Meta>
                <Card.Description>Genre: { song.primaryGenreName }</Card.Description>
                <Card.Description>Duration: { duration }</Card.Description>

              </Card.Content>
              <Card.Content extra>
                Price: { song.currency }{ song.trackPrice }
              </Card.Content>
            </Card>
          }
        >
          <Modal.Header>Now playing: { song.trackName }</Modal.Header>
          <Modal.Content image>
              <Image size='huge' src={ song.artworkUrl100 } />
              <Modal.Description>
                <Header>Artist: { song.artistName }</Header>
                <Header as='h4'>Album: { song.collectionName }</Header>
                <Header as='h5'>Price: { song.currency }{ song.trackPrice }</Header>
                <Divider />
                { buttons }
                <ReactPlayer url={ song.previewUrl } playing={ props.isPlaying } />
              </Modal.Description>
            </Modal.Content>
        </Modal>
        <Divider hidden/>
      </Grid.Column>
    )
  })

  return ret
}

export default ListSongs