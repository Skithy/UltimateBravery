'use strict'

import React from 'react'
import copy from 'copy-to-clipboard'
import { Row, Col, Popover , OverlayTrigger, FormGroup, InputGroup, FormControl, Button} from 'react-bootstrap'

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
    let spellKeys = ['Q', 'W', 'E', 'R']
    if (!isEmpty(this.state.champion) &&
        !isEmpty(this.state.spell) &&
        !isEmpty(this.state.keystone) &&
        !isEmpty(this.state.summoners) &&
        !isEmpty(this.state.items) &&
        !isEmpty(this.props.urls)) {
      profile = (
        <div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Title
                urlId={this.props.params.id}
                champion={this.state.champion}
                colour={this.state.colour}
              />
            </Col>
          </Row>
 
          <Row>
            <Col xs={12} sm={6} md={6} lg={5}>
              <div style={{display:'flex', marginTop:10, marginLeft: 10}}>
                <div style={{width:140}}>
                  <Pic {...this.props} champion={this.state.champion} />
                </div>
                <div style={{marginLeft: 10}}>
                  <Pic {...this.props} summoner={this.state.summoners[0]} />
                  <Pic {...this.props} summoner={this.state.summoners[1]} />
                </div>
                <Pic {...this.props} keystone={this.state.keystone} />
              </div>
            </Col>
            
            <Col xs={9} sm={6} md={6} lg={7}>
              <Items 
                items={this.state.items}
                urls={this.props.urls}
              />
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <Spell
                spell={this.state.spell}
                spellKey={spellKeys[this.state.spellKey]}
                urls={this.props.urls}
              />
            </Col>
            <Col xs={12} sm={9} md={9} lg={9}>
              <UrlLink/>
            </Col>
          </Row>
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
      <h1 style={{color: colour}}>{champion.name.toUpperCase()}</h1>
    </div>
  )
}

const Items = ({items, urls}) => (
  <div id='item-grid'>
    <div id='item-row'>
      <Item item={items[0]} urls={urls}/>
      <Item item={items[1]} urls={urls}/>
      <Item item={items[2]} urls={urls}/>
    </div>
    <div id='item-row'>
      <Item item={items[3]} urls={urls}/>
      <Item item={items[4]} urls={urls}/>
      <Item item={items[5]} urls={urls}/>
    </div>
  </div>
)

const Item = ({item, urls}) => (
  <div id='item-container'>
    <Pic item={item} urls={urls}/>
  </div>
)

const Spell = ({spell, spellKey, urls}) => (
  <div id='spell-container'>
    <Pic spell={spell} spellKey={spellKey} urls={urls} />
    <div id='key-bubble'>
      <h5>{spellKey}</h5>
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
    image = <img src={props.urls.spell + props.spell.image.full} id='spell' />
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
      <div style={{height: 60}}>
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