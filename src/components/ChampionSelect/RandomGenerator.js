import {shuffle, lastItem, randInt, getRandom} from '../Shared'

// build = [name, qwer, ksId, 2 * ssId, 6 * itemId]

const generateRandomBuild = (currentlySelected, data, options, isUltimate) => {
  if (currentlySelected.size == 0) return null
  const randomChamp = getRandom([...currentlySelected])
  let build = {}
  build.champion = data.champions[randomChamp]
  build.keystone = getKeystone(data.masteries)
  build.summoners = getSummoners(data.summoners)
  build.items = getItems(build.champion, build.summoners, data.items, options, true)

  let arr = []
  arr.push(randomChamp)
  arr.push(randomChamp == 'Udyr' ? randInt(0, 3) : randInt(0, 2))
  arr.push(build.keystone.id)
  arr = arr.concat(build.summoners.map(summoner => summoner.id))
  arr = arr.concat(build.items.map(item => item.id))
  return arr
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

const getItems = (champion, summoners, items, options, isUltimate) => {
  const itemList = Object.keys(items).map(item => items[item])
  let validItems = itemList.filter(item =>
    item.gold.total >= 2000 && // Good items only
    !item.into &&
    item.maps['11'] && // Summoners Rift
    !item.hideFromAll && // Jungle items
    item.requiredChampion != "Viktor" && // Viktor items
    !item.name.includes("Quick Charge") // Tear items
  )

  let boots = itemList.filter(item => item.from && item.from[0] == "1001")
  let viktorItem = itemList.find(item => item.requiredChampion == "Viktor" && item.depth == 4)
  let jungleItems = itemList.filter(item =>
    item.gold.total >= 2000 &&
    !item.into &&
    item.maps['11'] &&
    item.hideFromAll
  )

  let itemBuild = []
  if (isUltimate) {

    if (champion.key != 'Cassiopeia' && options.boots) {
      itemBuild.push(getRandom(boots))
    }

    if (summoners.map(summoner => summoner.name).includes('Smite')) {
      itemBuild.push(getRandom(jungleItems))
    }

    if (champion.key != 'Cassiopeia' && !options.boots) {
      if (champion.key == 'Viktor') {
        itemBuild.push(viktorItem)
        viktorItem = null
      }
      if (itemBuild.length == 0) {
        const randomItem = getRandom(validItems)
        if (randomItem.tags.includes("GoldPer")) {
          validItems = validItems.filter(item => !item.tags.includes("GoldPer"))
        }
        if (!options.duplicates) {
          validItems = validItems.filter(item => item != randomItem)
        }
        itemBuild.push(randomItem)
      }
      itemBuild.push(getRandom(boots)) 
    }

    if (champion.key == 'Viktor') {
      itemBuild.push(viktorItem)
    }

    while (itemBuild.length < 6) {
      const randomItem = getRandom(validItems)
      if (randomItem.tags.includes("GoldPer")) {
        validItems = validItems.filter(item => !item.tags.includes("GoldPer"))
      }
      if (!options.duplicates) {
        validItems = validItems.filter(item => item != randomItem)
      }
      itemBuild.push(randomItem)
    }
  }
  return itemBuild
}

export default generateRandomBuild