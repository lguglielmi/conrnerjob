import React from 'react'
import { Grid, Image, Card, Divider } from 'semantic-ui-react'
import _ from 'lodash'
import moment from 'moment'

const ListSongs = (props) => {

  let ret = _.map(props.data.results, song => {
    let releaseDate = moment(song.releaseDate).format('MMMM Do YYYY'),
        duration = moment.utc(song.trackTimeMillis).format('mm:s')
    return (
      <Grid.Column>
        <Card onClick={ () => props.toggleVisibilityModalPlayer(song.trackId) }>
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
        <Divider hidden/>
      </Grid.Column>
    )
  })

  return ret
}

export default ListSongs