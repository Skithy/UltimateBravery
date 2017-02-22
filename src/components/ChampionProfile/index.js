'use strict'

import React from 'react'
import Measure from 'react-measure'
import fileDownload from 'react-file-download'
import copy from 'copy-to-clipboard'
import { Row, Col, Popover , OverlayTrigger, Tooltip, Button, Glyphicon} from 'react-bootstrap'

import {clone, isEmpty, capitalize, getRandom} from '../Shared'
import NotFound from '../NotFound'

const spellKeys = ['Q', 'W', 'E', 'R']
const colours = [
  '#ff1414', //red
  'orange',
  'gold',
  'lawngreen',
  'deepskyblue',
  '#e359ff' //purple
]

export default class ChampionProfile extends React.Component {
  state = {
    data: [],
    err: false,
    champion: {},
    spell: {},
    spellKey: 0,
    keystone: {},
    summoners: [],
    items: [],
    colour: '',
    count: 0,
    dimensions: {
      width: -1,
      height: -1
    }
  }

  constructor(props) {
    super(props)
    fetch('/url/' + this.props.params.id)
      .then(res => res.json())
      .then(json => !isEmpty(json) ? this.setState({data: json.build, err: false}) : this.setState({err: true}))
      .catch(e => console.log(e))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.params.id != this.props.params.id) {
      fetch('/url/' + this.props.params.id)
        .then(res => res.json())
        .then(json => this.setState({data: json.build}))
        .catch(e => console.log(e))
    }

    if (prevState.data != this.state.data) {
      if (!isEmpty(this.props.champions)) {
        const champion = this.props.champions[this.state.data[0]]
        this.setState({
          champion: champion,
          spell: champion.spells[this.state.data[1]],
          spellKey: this.state.data[1],
          colour: colours[this.state.count % 6],
          count: this.state.count + 1
        })
      }

      if (!isEmpty(this.props.masteries)) {
        this.setState({ keystone: this.props.masteries.data[this.state.data[2]] })
      }

      if (!isEmpty(this.props.summoners)) {
        const summonerList = Object.keys(this.props.summoners).map(summoner => this.props.summoners[summoner])
        const summoners = this.state.data.slice(3, 5).map(id => summonerList.find(summoner => summoner.id == id))
        this.setState({ summoners: summoners})
      }

      if (!isEmpty(this.props.items)) {
        const items = this.state.data.slice(5).map(id => this.props.items[id])
        this.setState({ items: items })
      }
    }

    if (prevProps.champions != this.props.champions) {
      if (!isEmpty(this.state.data)) {
        const champion = this.props.champions[this.state.data[0]]
        this.setState({
          champion: champion,
          spell: champion.spells[this.state.data[1]],
          spellKey: this.state.data[1],
          colour: colours[this.state.count % 6],
          count: this.state.count + 1
        })
      }
    }

    if (prevProps.masteries != this.props.masteries) {
      if (!isEmpty(this.state.data)) {
        this.setState({ keystone: this.props.masteries.data[this.state.data[2]] })
      }
    }

    if (prevProps.summoners != this.props.summoners) {
      if (!isEmpty(this.state.data)) {
        const summonerList = Object.keys(this.props.summoners).map(summoner => this.props.summoners[summoner])
        const summoners = this.state.data.slice(3, 5).map(id => summonerList.find(summoner => summoner.id == id))
        this.setState({ summoners: summoners})
      }
    }

    if (prevProps.items != this.props.items) {
      if (!isEmpty(this.state.data)) {
      const items = this.state.data.slice(5).map(id => this.props.items[id])
      this.setState({ items: items })
      }
    }
  }

  render() {
    let profile = <img src='/img/loader.gif' style={{width:40, display:'block', margin:'auto'}} />
    const { width, height } = this.state.dimensions
    const photoHeight = height < 1000 ? height * (0.6 + 0.4 * (1000 - width) / 1000 ) : height * 0.6

    if (!isEmpty(this.state.champion) &&
        !isEmpty(this.state.spell) &&
        !isEmpty(this.state.keystone) &&
        !isEmpty(this.state.summoners) &&
        !isEmpty(this.state.items) &&
        !isEmpty(this.props.urls)) {

      const tooltip = <Tooltip id="tooltip">Download Item Set</Tooltip>
      const downloadInfo = (
        <Popover id="popover-trigger-hover-focus" title='Using Item Sets'>
          <p style={{fontSize:12}}>To use the item set in-game, save the downloaded json file to: </p>
          <p style={{fontSize:12}}>\League of Legends\Config\Champions\ <b>{this.state.champion.key}</b>\Recommended\</p>
        </Popover>
      )

      profile = (
        <div>
          <div style={{height: photoHeight, overflow:'hidden'}}>
            <Measure onMeasure={(dimensions) => {this.setState({dimensions})}}>
              <div>
                <img
                  src={this.props.urls.splash + this.state.champion.key + '_0.jpg'}
                  style={{width: '100%'}}
                />
              </div>
            </Measure>
          </div>

          <Title
            urlId={this.props.params.id}
            champion={this.state.champion}
            colour={this.state.colour}
          />

          <div id='build-body'>
            <div style={{margin: 'auto'}}>
              <h5>Max First</h5>
              <Pic
                spell={this.state.spell}
                spellKey={spellKeys[this.state.spellKey]}
                urls={this.props.urls}
              />
            </div>

            <div style={{margin: 'auto'}}>
              <h5>Summoner Spells</h5>
              <div id='summoners-container'>
                <Pic
                  summoner={this.state.summoners[0]}
                  urls={this.props.urls}
                />
                <Pic
                  summoner={this.state.summoners[1]}
                  urls={this.props.urls}
                />
              </div>
            </div>

            <div style={{margin: 'auto'}}>
              <h5>Keystone</h5>
              <Pic
                keystone={this.state.keystone}
                urls={this.props.urls}
              />
            </div>

            <div id='items-container'>
              <h5 style={{display: 'inline-block', marginRight: 5}}>Item Build</h5>
              <OverlayTrigger placement="bottom" overlay={tooltip}>
                <Button bsSize="xsmall"><Glyphicon glyph="download-alt" /></Button>
              </OverlayTrigger>
              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={downloadInfo}>
                <Button bsSize="xsmall"><Glyphicon glyph="question-sign" /></Button>
              </OverlayTrigger>
              <Items 
                items={this.state.items}
                urls={this.props.urls}
              />
            </div>
          </div>
        </div>
      )
    }

    return(
      <div>
        {this.state.err ? <NotFound /> : profile}
      </div>
    )
  }
}

const Title = ({urlId, champion, colour}) => {
  const adjs = urlId.split(/(?=[A-Z])/, 2).join(" ")
  return (
    <div id='title'>
      <h3><i>{adjs}</i></h3>
      <h1>{champion.name.toUpperCase()}</h1>
    </div>
  )
}

const Items = ({items, urls}) => (
  <div id='item-grid'>
    <div id='item-row'>
      <Pic item={items[0]} urls={urls}/>
      <Pic item={items[1]} urls={urls}/>
      <Pic item={items[2]} urls={urls}/>
    </div>
    <div id='item-row'>
      <Pic item={items[3]} urls={urls}/>
      <Pic item={items[4]} urls={urls}/>
      <Pic item={items[5]} urls={urls}/>
    </div>
  </div>
)

const UrlLink = () => {
  const url = window.location.toString().replace(/^https*:\/\//i, '')
  return(
    <div id='url-link'>
      <FormGroup>
        <InputGroup>
          <FormControl type="text" value={url} readOnly='true'/>
          <InputGroup.Button>
            <Button onClick={() => copy(url)}>Copy</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </div>
  )
}
const Pic = props => {
  let info, image
  if (props.champion) {
    return <img src={props.urls.champion + props.champion.image.full} id='champ-large'/>
  }

  else if (props.spell && props.spellKey) {
    info = (
      <Popover id="popover-trigger-hover-focus" title={props.spellKey + ' - ' + props.spell.name}>
        <div
          style={{fontSize: 12}}
          dangerouslySetInnerHTML={{__html: props.spell.description}}
        />
      </Popover>
    )
    image = (
      <div id='spell-container'>
        <img src={props.urls.spell + props.spell.image.full} id='spell' />
        <div id='key-bubble'>
          <h5>{props.spellKey}</h5>
        </div>
      </div>
    )
  }

  else if (props.keystone) {
    info = (
      <Popover id="popover-trigger-hover-focus" title={props.keystone.name}>
        <div
          style={{fontSize: 12}}
          dangerouslySetInnerHTML={{__html: props.keystone.description}}
        />
      </Popover>
    )
    image = <img src={props.urls.mastery + props.keystone.image.full} id='keystone'/>
  }

  else if (props.summoner) {
    info = (
      <Popover id="popover-trigger-hover-focus" title={props.summoner.name}>
        <div
          style={{fontSize: 12}}
          dangerouslySetInnerHTML={{__html: props.summoner.description}}
        />
      </Popover>
    )
    image = <img src={props.urls.spell + props.summoner.image.full} id='summoner'/>
  }

  else if (props.item) {
    info = (
      <Popover id="popover-trigger-hover-focus" title={props.item.name + ' (' + props.item.gold.total + 'g)'}>
        <div
          style={{fontSize: 12}}
          dangerouslySetInnerHTML={{__html: props.item.description}}
        />
      </Popover>
    )
    image = (
      <div id='item-container'>
        <img src={props.urls.item + props.item.image.full} id='item'/>
        <div id='item-border'/>
      </div> 
    )
  }

  return (
    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={info}>
      {image}
    </OverlayTrigger>
  )
}