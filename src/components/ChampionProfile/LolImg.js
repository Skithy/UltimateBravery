'use strict'

import React from 'react'
import { Popover, OverlayTrigger } from 'react-bootstrap'

const LolImg = props => {
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

  else {
    return null
  }

  return (
    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={info}>
      {image}
    </OverlayTrigger>
  )
}

export default LolImg