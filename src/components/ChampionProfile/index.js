'use strict'

import React from 'react'
import Datastore from 'nedb'

let db = new Datastore({autoload: true})

const ProfileLink = props => {
  db.find({}, function (err, docs) {
      console.log(docs)
  })
  return(<h1>{props.params.id }</h1>)
}

const ChampionProfile = ({champion, items, getImgUrl}) => {
  return(
    <div>
      <h1>{champion.name}</h1>
      <ChampImg imgUrl={getImgUrl("champion") + champion.image.full} />
      {items.map((item, i) => <ItemImg imgUrl={getImgUrl("item") + item.image.full} key={i} />)}
    </div>
  )
}

const ChampImg = ({imgUrl}) => (
  <img
    src={imgUrl}
    className="champ-large"
  />
)

const ItemImg = ({imgUrl}) => (
  <img
    src={imgUrl}
    className="champ-small"
  />
)

export default ProfileLink
