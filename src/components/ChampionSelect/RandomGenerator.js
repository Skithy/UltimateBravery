

const makeItemBuild = (items, isUltimate, hasDuplicates, isViktor) => {
  const itemArray = Object.keys(items).map(item => items[item])
  let validItems = itemArray.filter(item =>
    item.gold.total >= 2000 && // Good items only
    !item.into &&
    item.maps['11'] && // Summoners Rift
    !item.hideFromAll && // Jungle items
    item.requiredChampion != "Viktor" && // Viktor items
    !item.name.includes("Quick Charge") // Tear items
  )
  const boots = itemArray.filter(item => item.from && item.from[0] == "1001")
  const viktorItem = itemArray.find(item => item.requiredChampion == "Viktor" && item.depth == 4)

  let itemBuild = []
  if (isUltimate) {
    itemBuild.push(getRandom(boots))
    if (isViktor) {
      itemBuild.push(viktorItem)
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
