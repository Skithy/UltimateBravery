import {shuffle, lastItem, ranInt} from '../Shared'

// build = [name, qwer, ksId, 2 * ssId, 6 * itemId]

const generateRandomBuild = (currentlySelected, data, isUltimate) => {
  if (currentlySelected.size == 0) return null
  const randomChamp = getRandom([...currentlySelected])
  let build = {}
  build.champion = data.champions[randomChamp]
  build.keystone = getKeystone(data.masteries)
  build.summoners = getSummoners(data.summoners)
  build.items = getItems(build.champion, build.summoners, data.items, true, true)

  let arr = []
  arr.push(randomChamp)
  arr.push(randomChamp == 'Udyr' ? ranInt(0, 3) : ranInt(0, 2))
  arr.push(build.keystone.id)
  arr = arr.concat(build.summoners.map(summoner => summoner.id))
  arr = arr.concat(build.items.map(item => item.id))
  return arr
}

const getItems = (champion, summoners, items, isUltimate, hasDuplicates) => {
  const itemList = Object.keys(items).map(item => items[item])
  let validItems = itemList.filter(item =>
    item.gold.total >= 2000 && // Good items only
    !item.into &&
    item.maps['11'] && // Summoners Rift
    !item.hideFromAll && // Jungle items
    item.requiredChampion != "Viktor" && // Viktor items
    !item.name.includes("Quick Charge") // Tear items
  )
  const boots = itemList.filter(item => item.from && item.from[0] == "1001")
  const viktorItem = itemList.find(item => item.requiredChampion == "Viktor" && item.depth == 4)
  const jungleItems = itemList.filter(item =>
    item.gold.total >= 2000 &&
    !item.into &&
    item.maps['11'] &&
    item.hideFromAll
  )

  let itemBuild = []
  if (isUltimate) {
    if (champion.key != 'Cassiopeia') {
      itemBuild.push(getRandom(boots))
    }

    if (champion.key == 'Viktor') {
      itemBuild.push(viktorItem)
    }

    if (summoners.map(summoner => summoner.name).includes('Smite')) {
      
      itemBuild.push(getRandom(jungleItems))
    }        

    while (itemBuild.length < 6) {
      const randomItem = getRandom(validItems)
      if (randomItem.tags.includes("GoldPer")) {
        validItems = validItems.filter(item => !item.tags.includes("GoldPer"))
      }
      if (!hasDuplicates) {
        validItems = validItems.filter(item => item != randomItem)
      }
      itemBuild.push(randomItem)
    }
  }
  return itemBuild
}

const getSummoners = (summoners) => {
  const summonerList = Object.keys(summoners).map(summoner => summoners[summoner])
  return shuffle(summonerList.filter(summoner => summoner.modes.includes('CLASSIC'))).slice(0,2)
}

const getKeystone = (masteries) => {
  const randomTree = getRandom(Object.keys(masteries.tree))
  const keyStoneId = getRandom(lastItem(masteries.tree[randomTree]).masteryTreeItems).masteryId
  return masteries.data[keyStoneId]
}

const getRandom = (arr) => arr[Math.floor(Math.random()*arr.length)]

export default generateRandomBuild