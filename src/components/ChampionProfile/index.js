'use strict'

import React from 'react'
import Datastore from 'nedb'
import { Row, Col, Popover , OverlayTrigger, FormGroup, InputGroup, FormControl, Button} from 'react-bootstrap'

import {clone, isEmpty, capitalize} from '../Shared'
import NotFound from '../NotFound'

export default class ChampionProfile extends React.Component {
  state = {
    data: [],
    err: false,
    champion: {},
    spell: {},
    spellKey: 0,
    keystone: {},
    summoners: [],
    items: []
  }

  constructor(props) {
    super(props)
    fetch('/url/' + this.props.params.id)
      .then(res => res.json())
      .then(json => {
        if (!isEmpty(json)) {
          this.setState({data: json.build, err: false})
        } else {
          this.setState({err: true})
        }
      })
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
          spellKey: this.state.data[1]
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
          spellKey: this.state.data[1]
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
            <Col xs={12} md={12}>
              <Title url={this.props.params.id} champion={this.state.champion}/>
            </Col>
          </Row>
 
          <Row>
            <Col xs={12} sm={6} md={5}>
              <div style={{display:'flex', marginTop:10, marginLeft: 10}}>
                <div style={{width:150}}>
                  <Pic {...this.props} champion={this.state.champion} />
                </div>
                <div style={{marginLeft: 10}}>
                  <Pic {...this.props} summoner={this.state.summoners[0]} />
                  <Pic {...this.props} summoner={this.state.summoners[1]} />
                </div>
                <Pic {...this.props} keystone={this.state.keystone} />
              </div>
            </Col>
            <Col xs={8} sm={6} md={7}>
              <div id='item-grid'>
                {this.state.items.map(
                  (item, i) => (
                    <div style={{height: 60, marginRight:3, marginBottom: 3}} key={i}>
                      <Pic {...this.props} item={item} />
                    </div>
                  )
                )}
              </div>
            </Col>
            <Col xs={4} sm={3} md={3}>
              <div id='spell-max'>
                <Pic {...this.props} spell={this.state.spell} spellKey={spellKeys[this.state.spellKey]}/>
                <div id='key-bubble'>
                  <h5>{spellKeys[this.state.spellKey]}</h5>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={9} md={9}>
              <div id='url-link'>
                <FormGroup>
                  <InputGroup>
                    <FormControl type="text" value={window.location.toString().replace(/^https*:\/\//i, '')} readOnly='true'/>
                    <InputGroup.Button>
                      <Button>Copy</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              </div>
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

const Title = ({url, champion}) => {
  let adj = url.replace(champion.key, '')
  adj = adj.split(/(?=[A-Z])/, 2).join(" ")
  return (
    <div id='title'>
      <h3><i>{adj}</i></h3>
      <h1>{champion.name}</h1>
    </div>
  )
}

const Pic = props => {
  let info, image
  if (props.champion) {
    return <img src={props.urls.champion + props.champion.image.full} id='champ-large'/>
  }
  if (props.spell && props.spellKey) {
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
  if (props.keystone) {
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
  if (props.summoner) {
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
  if (props.item) {
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