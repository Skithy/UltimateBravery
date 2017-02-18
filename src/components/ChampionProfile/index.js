'use strict'

import React from 'react'
import Datastore from 'nedb'

import {clone, isEmpty} from '../Shared'
import NotFound from '../NotFound'

export default class ChampionProfile extends React.Component {
  state = {
    data: [],
    err: false,
    champion: {},
    spell: {},
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
    
    if (!isEmpty(this.state.champion) &&
        !isEmpty(this.state.spell) &&
        !isEmpty(this.state.keystone) &&
        !isEmpty(this.state.summoners) &&
        !isEmpty(this.state.items) &&
        !isEmpty(this.props.urls)) {
      profile = (
        <div>
          <h1>{this.props.params.id.split(/(?=[A-Z])/).join(" ")}</h1>
          <Pic {...this.props} champion={this.state.champion} />
          <Pic {...this.props} spell={this.state.spell} />
          <Pic {...this.props} keystone={this.state.keystone} />
          <Pic {...this.props} summoner={this.state.summoners[0]} />
          <Pic {...this.props} summoner={this.state.summoners[1]} />
          {this.state.items.map(
            (item, i) => <Pic {...this.props} item={item} key={i} />
          )}
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

const ChampionProfilel = ({champion, items, getImgUrl}) => {
  return(
    <div>
      <h1>{champion.name}</h1>
      <ChampImg imgUrl={getImgUrl("champion") + champion.image.full} />
      {items.map((item, i) => <ItemImg imgUrl={getImgUrl("item") + item.image.full} key={i} />)}
    </div>
  )
}

const Pic = props => {
  if (props.champion) {
    return <img src={props.urls.champion + props.champion.image.full} />
  }
  if (props.spell) {
    return <img src={props.urls.spell + props.spell.image.full} />
  }
  if (props.keystone) {
    return <img src={props.urls.mastery + props.keystone.image.full} />
  }
  if (props.summoner) {
    return <img src={props.urls.spell + props.summoner.image.full} />
  }
  if (props.item) {
    return <img src={props.urls.item + props.item.image.full} />
  }
  return <h1>Cat</h1>
}