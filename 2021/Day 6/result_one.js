const initialState = [1,1,3,1,3,2,1,3,1,1,3,1,1,2,1,3,1,1,3,5,1,1,1,3,1,2,1,1,1,1,4,4,1,2,1,2,1,1,1,5,3,2,1,5,2,5,3,3,2,2,5,4,1,1,4,4,1,1,1,1,1,1,5,1,2,4,3,2,2,2,2,1,4,1,1,5,1,3,4,4,1,1,3,3,5,5,3,1,3,3,3,1,4,2,2,1,3,4,1,4,3,3,2,3,1,1,1,5,3,1,4,2,2,3,1,3,1,2,3,3,1,4,2,2,4,1,3,1,1,1,1,1,2,1,3,3,1,2,1,1,3,4,1,1,1,1,5,1,1,5,1,1,1,4,1,5,3,1,1,3,2,1,1,3,1,1,1,5,4,3,3,5,1,3,4,3,3,1,4,4,1,2,1,1,2,1,1,1,2,1,1,1,1,1,5,1,1,2,1,5,2,1,1,2,3,2,3,1,3,1,1,1,5,1,1,2,1,1,1,1,3,4,5,3,1,4,1,1,4,1,4,1,1,1,4,5,1,1,1,4,1,3,2,2,1,1,2,3,1,4,3,5,1,5,1,1,4,5,5,1,1,3,3,1,1,1,1,5,5,3,3,2,4,1,1,1,1,1,5,1,1,2,5,5,4,2,4,4,1,1,3,3,1,5,1,1,1,1,1,1]

let lanternfishPopulation = initialState
let lanterfishSpawnCount = 0

function decreaseElementsByOne() {
  for (let i = 0; i < lanternfishPopulation.length; i++) {
    lanternfishPopulation[i] -= 1
  }
}

function checkHowManyLanternfishWillSpawn() {
  lanterfishSpawnCount = lanternfishPopulation.filter((x) => x == 0).length
}

function addLanternfishToList() {
  lanternfishPopulation.push(8)
}

function changeZeroesToSixes() {
  for (let i = 0; i < lanternfishPopulation.length; i++) {
    if (lanternfishPopulation[i] == -1) {
      lanternfishPopulation[i] = 6
    }
  }
}

function spawnLanternfishes() {
  for (let i = 0; i < lanterfishSpawnCount; i++) {
    addLanternfishToList()
  }
}

function increaseGenerationAgeBy(days) {
  for (let i = 0; i < days; i++) {
    checkHowManyLanternfishWillSpawn()
    decreaseElementsByOne()
    changeZeroesToSixes()
    spawnLanternfishes()
  }
}

increaseGenerationAgeBy(80)
console.log(lanternfishPopulation.length)
