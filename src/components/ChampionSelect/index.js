'use strict'

import React from 'react'
import { browserHistory } from 'react-router'
import Button from 'react-bootstrap/lib/Button'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Label from 'react-bootstrap/lib/Label'

import {clone, isEmpty, capitalize} from '../Shared'
import generateRandomBuild from './RandomGenerator'

export default class ChampionSelect extends React.Component {
  state = {
    currentlySelected: new Set(),
    search: '',
    filter: {
      assassin: true,
      fighter: true,
      mage: true,
      marksman: true,
      support: true,
      tank: true
    },
    options: {
      duplicates: true,
      boots: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(this.state.currentlySelected) && nextProps.champions != this.props.champions) {
      this.setState({ currentlySelected: new Set(Object.keys(nextProps.champions)) })
    }
  }

  selectAll = () => {
    let selected = clone(this.state.currentlySelected)
    for (let key in this.props.champions) {
      const champion = this.props.champions[key]
      if (champion.name.toLowerCase().includes(this.state.search.toLowerCase())) {
        for (let i in champion.tags) {
          let tag = champion.tags[i].toLowerCase()
          if (tag == 'tank,melee') {
            tag = 'tank'
          }
          if (this.state.filter[tag]) {
            if (!selected.has(key)) {
              selected.add(key)
            }
          }
        }
      }
    }
    this.setState({ currentlySelected: selected })
  }

  selectNone = () => {
    let selected = clone(this.state.currentlySelected)
    for (let key in this.props.champions) {
      const champion = this.props.champions[key]
      if (champion.name.toLowerCase().includes(this.state.search.toLowerCase())) {
        for (let i in champion.tags) {
          let tag = champion.tags[i].toLowerCase()
          if (tag == 'tank,melee') {
            tag = 'tank'
          }
          if (this.state.filter[tag]) {
            if (selected.has(key)) {
              selected.delete(key)
            }
          }
        }
      }
    }
    this.setState({ currentlySelected: selected })
  }

  toggleSelected = (e) => {
    let selected = clone(this.state.currentlySelected)
    selected.has(e) ? selected.delete(e) : selected.add(e)
    this.setState({ currentlySelected: selected })
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value })
  }

  toggleOptions = (option) => {
    let options = clone(this.state.options)
    options[option] = !options[option]
    this.setState({ options: options })
  }

  toggleFilter = (tag) => {
    let filter = clone(this.state.filter)
    if (tag == 'all') {
      for (let o in filter) {filter[o] = true}
    } else if (tag == 'none') {
      for (let o in filter) {filter[o] = false}
    } else {
      filter[tag] = !filter[tag]
    }
    this.setState({ filter: filter })
  }

  randomizeChamp = (isUltimate) => {
    const build = generateRandomBuild(this.state.currentlySelected, this.props, this.state.options, isUltimate)
    if (build) {
      fetch('/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          build: build
        })
      })
      .then(res => res.text())
      .then(body => {
        window.scrollTo(0, 0)
        browserHistory.push('/brave/' + body)
      })
    }
  }

  render() {
    return (
      <div>
        <BraveryButtons randomizeChamp={this.randomizeChamp} />

        <Options
          options={this.state.options}
          toggleOptions={this.toggleOptions}
        />

        <div className='display'>
          <h4>Champion Select</h4>

          <ChampFilter
            filter={this.state.filter}
            toggleFilter={this.toggleFilter}
          />

          <Button bsSize='small' onClick={this.selectAll}>Select Visible</Button>
          <Button bsSize='small' onClick={this.selectNone}>Unselect Visible</Button>
          
          <small style={{'float': 'right', 'margin': 6}}>
            {this.state.currentlySelected.size + '/' + Object.keys(this.props.champions).length + ' selected'}
          </small>

          <FormGroup>
            <FormControl
              type='text'
              value={this.state.search}
              placeholder='Search...'
              onChange={this.handleSearch}
            />
          </FormGroup>

          {!isEmpty(this.props.urls) && !isEmpty(this.props.champions) ?
            <ChampionsGrid
              champions={this.props.champions}
              currentlySelected={this.state.currentlySelected}
              toggleSelected={this.toggleSelected}
              search={this.state.search}
              filter={this.state.filter}
              urls={this.props.urls}
            /> : <img src='/img/loader.gif' style={{width:40, display:'block', margin:'auto'}} />
          }
        </div>
      </div>
    )
  }
}

/* ======================================================================*/

const ChampionsGrid = ({champions, currentlySelected, toggleSelected, search, filter, urls}) => {
  const championList = Object.keys(champions).sort()
  return (
    <div style={{'display': 'flex', 'flexWrap': 'wrap', 'justifyContent': 'center'}}>
      {championList.filter(champName => {
        const champion = champions[champName]
        if (champion.name.toLowerCase().includes(search.toLowerCase())) {
          for (var i in champion.tags) {
            let tag = champion.tags[i].toLowerCase()
            if (tag == 'tank,melee') {
              tag = 'tank'
            }
            if (filter[tag]) {
              return true
            }
          }
        }
        return false
      }).map((champName, i) => 
        <ChampionPic
          champion={champions[champName]}
          selected={currentlySelected.has(champName)}
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
    <OverlayTrigger placement='bottom' overlay={tooltip}>
      <img
        src={url + champion.image.full}
        onClick={() => toggleSelected(champion.key)}
        className={selected ? 'champ-small' : 'champ-small disabled'}
      />
    </OverlayTrigger>
  )
}

/* ======================================================================*/

const Options = ({options, toggleOptions}) => {
  return (
    <div className='display'>
      <h4>Options</h4>
      <div id='options-container'>
        <Label
          style={options.duplicates ? {backgroundColor: '#2b3e50'} : null}
          onClick={() => toggleOptions('duplicates')}
          >Duplicates
        </Label>
        <Label
          style={options.boots ? {backgroundColor: '#2b3e50'} : null}
          onClick={() => toggleOptions('boots')}
          >Boots First
        </Label>
      </div>
    </div>
  )
}

const ChampFilter = ({filter, toggleFilter}) => {
  return (
    <div id='options-container'>
      <Label
        style={allFalse(filter) ? {backgroundColor: '#2b3e50'} : null}
        onClick={() => toggleFilter('none')}
        >Show None
      </Label>
      <Label
        style={allTrue(filter) ? {backgroundColor: '#2b3e50'} : null}
        onClick={() => toggleFilter('all')}
        >Show All
      </Label>

      {Object.keys(filter).map(tag =>
        <Label
          style={filter[tag] ? {backgroundColor: '#2b3e50'} : null}
          onClick={() => toggleFilter(tag)}
          key={tag}
          >{capitalize(tag)}
        </Label>
      )}
    </div>
  )
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

const allTrue = (obj) => {
  for (let o in obj) {
    if (!obj[o]) return false
  }
  return true
}

const allFalse = (obj) => {
  for (let o in obj) {
    if (obj[o]) return false
  }
  return true
}