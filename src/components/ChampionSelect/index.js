'use strict'

import React from 'react'
import { browserHistory } from 'react-router'
import Button from 'react-bootstrap/lib/Button'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

import {clone, isEmpty} from '../Shared'
import generateRandomBuild from './RandomGenerator'

export default class ChampionSelect extends React.Component {
  state = {
    currentlySelected: new Set(),
    search: ''
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(this.state.currentlySelected) && nextProps.champions != this.props.champions) {
      this.setState({ currentlySelected: new Set(Object.keys(nextProps.champions)) })
    }
  }

  selectAll = () => {
    this.setState({ currentlySelected: new Set(Object.keys(this.props.champions)) })
  }

  selectNone = () => {
    this.setState({ currentlySelected: new Set() })
  }

  toggleSelected = (e) => {
    let selected = clone(this.state.currentlySelected)
    selected.has(e) ? selected.delete(e) : selected.add(e)
    this.setState({ currentlySelected: selected })
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value })
  }

  randomizeChamp = (isUltimate) => {
    const build = generateRandomBuild(this.state.currentlySelected, this.props, isUltimate)
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

        <div className='display'>
          <h4>Champion Select</h4>
          <Button bsSize='small' onClick={this.selectAll}>Select All</Button>
          <Button bsSize='small' onClick={this.selectNone}>Unselect All</Button>
          
          <small style={{'float': 'right', 'margin': 6}}>
            {this.state.currentlySelected.size + '/' + Object.keys(this.props.champions).length + ' selected'}
          </small>

          <FormGroup>
            <FormControl
              type='text'
              value={this.state.search}
              placeholder='Search...'
              onChange={this.handleChange}
            />
          </FormGroup>

          {!isEmpty(this.props.urls) && !isEmpty(this.props.champions) ?
            <ChampionsGrid
              champions={this.props.champions}
              currentlySelected={this.state.currentlySelected}
              toggleSelected={this.toggleSelected}
              search={this.state.search}
              urls={this.props.urls}
            /> : <img src='/img/loader.gif' style={{width:40, display:'block', margin:'auto'}} />
          }
        </div>
      </div>
    )
  }
}

/* ======================================================================*/

const ChampionsGrid = ({champions, currentlySelected, toggleSelected, search, urls}) => {
  const championList = Object.keys(champions).sort()
  return (
    <div style={{'display': 'flex', 'flexWrap': 'wrap', 'justifyContent': 'center'}}>
      {championList.map((champName, i) => 
        champions[champName].name.toLowerCase().includes(search.toLowerCase()) &&
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
