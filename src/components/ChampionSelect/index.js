'use strict'

import React from 'react'
import Datastore from 'nedb'
import Button from 'react-bootstrap/lib/Button'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

import {clone, isEmpty} from '../Shared'

let db = {}
db.urls = new Datastore({filename: '/data/urls.db', autoload: true})
db.champions = new Datastore({filename: '/data/champions.db', autoload: true})

export default class ChampionSelect extends React.Component {
  state = {
    currentlySelected: new Set(),
    champions: [],
    urls: {},
    search: ''
  }

  constructor() {
    super()
    db.champions.find({})
      .sort({name: 1})
      .exec((err, champions) => this.setState({
        champions: champions,
        currentlySelected: new Set(champions.map(champion => champion.key))
      }))
    db.urls.findOne({}, (err, doc) => this.setState({urls: doc}))
  }

  selectAll = () => {
    this.setState({currentlySelected: new Set(this.state.champions.map(champion => champion.key))})
  }

  selectNone = () => {
    this.setState({currentlySelected: new Set()})
  }

  toggleSelected = (e) => {
    let list = clone(this.state.currentlySelected)
    list.has(e) ? list.delete(e) : list.add(e)
    this.setState({currentlySelected: list})
  }

  handleChange = (e) => {
    this.setState({search: e.target.value})
  }

  randomizeChamp = (cat) => {
    console.log("TODO")
  }

  render() {
    return (
      <div>
        <BraveryButtons randomizeChamp={this.randomizeChamp} />

        <div className='display'>
          <h4>Champion Select</h4>
          <Button bsSize='small' onClick={this.selectAll}>Select All</Button>
          <Button bsSize='small' onClick={this.selectNone}>Unselect All</Button>
          
          <small style={{'float': 'right', 'margin': 6}}>
            {this.state.currentlySelected.size + ' of ' + this.state.champions.length + ' selected'}
          </small>

          <FormGroup>
            <FormControl
              type='text'
              value={this.state.search}
              placeholder='Search...'
              onChange={this.handleChange}
            />
          </FormGroup>

          {!isEmpty(this.state.urls) && !isEmpty(this.state.champions) ?
            <ChampionsGrid
              champions={this.state.champions}
              currentlySelected={this.state.currentlySelected}
              toggleSelected={this.toggleSelected}
              search={this.state.search}
              urls={this.state.urls}
            /> : <img src='/img/loader.gif' style={{width:40, display:'block', margin:'auto'}} />
          }
        </div>
      </div>
    )
  }
}

/* ======================================================================*/

const ChampionsGrid = ({champions, currentlySelected, toggleSelected, search, urls}) => {
  return (
    <div style={{'display': 'flex', 'flexWrap': 'wrap', 'justifyContent': 'center'}}>
      {champions.map((champion, i) => 
        champion.name.toLowerCase().includes(search.toLowerCase()) &&
        <ChampionPic
          champion={champion}
          selected={currentlySelected.has(champion.key)}
          toggleSelected={toggleSelected}
          url={urls.champion}
          key={i}
        />
      )}
    </div>
  )
}


const ChampionPic = ({champion, selected, toggleSelected, url}) => {
  const tooltip = <Tooltip id='tooltip'>{champion.name}</Tooltip>
  return (
    <OverlayTrigger placement='top' overlay={tooltip}>
      <img
        src={url + champion.image.full}
        onClick={() => toggleSelected(champion.key)}
        className={selected ? 'champ-small' : 'champ-small disabled'}
      />
    </OverlayTrigger>
  )
}

/* ======================================================================*/

const Options = ({}) => {
  return null
}

/* ======================================================================*/

const BraveryButtons = ({randomizeChamp}) => (
  <div style={{'marginBottom': 20}}>
    <Button
      bsStyle='primary'
      onClick={() => randomizeChamp(true)}
      style={{'width': '50%'}}
    >ULTIMATE<br/>BRAVERY</Button>
    <Button
      bsStyle='success'
      onClick={() => randomizeChamp(false)}
      style={{'width': '50%'}}
    >OMEGA<br/>BRAVERY</Button>
  </div>
)
