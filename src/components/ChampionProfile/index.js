'use strict'

import React from 'react'
import Measure from 'react-measure'
import fileDownload from 'react-file-download'
import copy from 'copy-to-clipboard'
import { Row, Col, Popover, OverlayTrigger, Tooltip, Button, Glyphicon, FormControl, FormGroup, InputGroup} from 'react-bootstrap'

import LolImg from './LolImg'
import NotFound from '../NotFound'
import {clone, isEmpty, capitalize, getRandom} from '../Shared'

const spellKeys = ['Q', 'W', 'E', 'R']

export default class ChampionProfile extends React.Component {
  state = {
    data: [],
    err: false,
    champion: {},
    spell: {}, spellKey: 0,
    keystone: {},
    summoners: [],
    items: [],
    splash: {
      dimensions: {
        width: -1,
        height: -1
      }
    },
    title: {
      dimensions: {
        width: -1,
        height: -1
      }
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
          spell: champion.spells[this.state.data[1]]
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
          spell: champion.spells[this.state.data[1]]
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

    if ( !isEmpty(this.state.champion)
      && !isEmpty(this.state.spell) 
      && !isEmpty(this.state.keystone)
      && !isEmpty(this.state.summoners)
      && !isEmpty(this.state.items)
      && !isEmpty(this.props.urls)
    ) {
      profile = (
        <div>
          <ChampionSplash 
            champion={this.state.champion}
            urls={this.props.urls}
            dimensions={this.state.splash.dimensions}
            updateDimensions={(dimensions) => {this.setState({ splash: {dimensions} })}}
          />
          <ChampionTitle
            urlId={this.props.params.id}
            champion={this.state.champion}
            dimensions={this.state.title.dimensions}
            updateDimensions={(dimensions) => {this.setState({ title: {dimensions} })}}
          />

          <div id='build-body'>
            
            <Spell
              spell={this.state.spell}
              spellKey={spellKeys[this.state.data[1]]}
              urls={this.props.urls}
            />

            <Summoners
              summoners={this.state.summoners}
              urls={this.props.urls}
            />            

            <Keystone
              keystone={this.state.keystone}
              urls={this.props.urls}
            />
            
            <Items
              champion={this.state.champion}
              items={this.state.items}
              urls={this.props.urls}
            />

            <div id='fade-divider' />

            <UrlLink />
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

const ChampionSplash = ({champion, dimensions, updateDimensions, urls}) => {
  const { width, height } = dimensions
  const cropHeight = height < 1000 ? height * (0.6 + 0.4 * (1000 - width) / 1000 ) : height * 0.6
  
  return(
    <div style={{height: height ? cropHeight : 100, overflow:'hidden'}}>
      <Measure onMeasure={updateDimensions}>
        <div>
          <img
            src={urls.splash + champion.key + '_0.jpg'}
            style={{width: '100%'}}
          />
        </div>
      </Measure>
    </div>
  )
}

const ChampionTitle = ({urlId, champion, dimensions, updateDimensions}) => {
  const adjs = urlId.split(/(?=[A-Z])/, 2).join(" ")
  
  return(
    <Measure onMeasure={updateDimensions}>
      <div id='title' style={{top: -dimensions.height}}>
        <h3>{adjs}</h3>
        <h1>{champion.name.toUpperCase()}</h1>
      </div>
    </Measure>
  )
}

const Spell = ({spell, spellKey, urls}) => {
  return (
    <div style={{margin: 'auto'}}>
      <h5>Max First</h5>
      <LolImg
        spell={spell}
        spellKey={spellKey}
        urls={urls}
      />
    </div>
  )
}

const Keystone = ({keystone, urls}) => {
  return (
    <div style={{margin: 'auto'}}>
      <h5>Keystone</h5>
      <LolImg
        keystone={keystone}
        urls={urls}
      />
    </div>
  )
}

const Summoners = ({summoners, urls}) => {
  return (
    <div style={{margin: 'auto'}}>
      <h5>Summoner Spells</h5>
      <div id='summoners-container'>
        <LolImg
          summoner={summoners[0]}
          urls={urls}
        />
        <LolImg
          summoner={summoners[1]}
          urls={urls}
        />
      </div>
    </div>
  )
}

const Items = ({champion, items, urls}) => {
  const tooltip = <Tooltip id="tooltip">Download Item Set</Tooltip>
  const downloadInfo = (
    <Popover id="popover-trigger-hover-focus" title='Using Item Sets'>
      <p style={{fontSize:12}}>To use the item set in-game, save the downloaded json file to: </p>
      <p style={{fontSize:12}}>\League of Legends\Config\Champions\ <b>{champion.key}</b>\Recommended\</p>
    </Popover>
  )
  return(
    <div id='items-container'>
      <h5>Item Build</h5>
      <OverlayTrigger placement="bottom" overlay={tooltip}>
        <Button bsSize="xsmall"><Glyphicon glyph="download-alt" /></Button>
      </OverlayTrigger>
      <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={downloadInfo}>
        <Button bsSize="xsmall"><Glyphicon glyph="question-sign" /></Button>
      </OverlayTrigger>
      <div id='item-grid'>
        <div id='item-row'>
          <LolImg item={items[0]} urls={urls}/>
          <LolImg item={items[1]} urls={urls}/>
          <LolImg item={items[2]} urls={urls}/>
        </div>
        <div id='item-row'>
          <LolImg item={items[3]} urls={urls}/>
          <LolImg item={items[4]} urls={urls}/>
          <LolImg item={items[5]} urls={urls}/>
        </div>
      </div>
    </div>
  )
}

const UrlLink = () => {
  const url = window.location.toString().replace(/^https*:\/\//i, '')
  return(
    <div id='url-container'>
      <h5>URL</h5>
      <FormGroup>
        <InputGroup>
          <FormControl type="text" value={url} readOnly='true'/>
          <InputGroup.Button>
            <Button 
              style={{border:'1px solid #ebebeb'}}
              onClick={() => copy(url)}
            >Copy
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </div>
  )
}
