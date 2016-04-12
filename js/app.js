/* global React, ReactDOM, _*/
/* eslint complexity: [2, 10]*/
/* eslint no-param-reassign: [0]*/
/* eslint react/prefer-es6-class: [0] */
/* eslint arrow-body-style: [2, "always"] */
/* eslint react/no-multi-comp: [0] */
/* eslint max-len: [2, 120] */

/*eslint-disable */
const boardTemplate = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
[0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,2,0,0,0,4,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,2,0,0,0,4,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,3,4,4,4,4,0,2,2,2,2,2,2,2,2,2],
[0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,2,1,1,1,1,1,1,1,2],
[0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,2,1,1,1,1,1,1,1,2],
[0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,2,1,1,1,1,1,1,1,2],
[0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,2,1,1,1,1,1,1,1,2],
[0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,2,1,1,1,1,1,1,1,2],
[0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,2,2,2,3,2,2,2,2,2],
[0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,3,2,2,0,0,0,0,0,0,0,0,4,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,2,3,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0],
[0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0],
[0,0,0,0,0,2,3,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,4,0,0,0,0,0],
[0,0,0,0,0,2,1,1,1,1,1,1,1,2,4,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,2,2,2,2,2,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0],
[0,0,0,0,0,2,1,1,1,1,1,1,1,2,4,0,0,0,0,0,0,0,0,0,0,4,2,1,1,1,1,1,1,1,2,0,0,4,0,0,0,0,0,0,4,0,0,0,0,4],
[0,0,0,0,0,2,1,1,1,1,1,1,1,2,4,0,0,0,0,0,0,0,0,0,0,4,2,1,1,1,1,1,1,1,2,0,0,4,0,0,0,0,0,0,4,0,0,0,0,4],
[0,0,0,0,0,2,1,1,1,1,1,1,1,2,4,0,0,0,0,0,0,0,0,0,0,4,3,1,1,1,1,1,1,1,2,0,0,4,0,0,0,0,0,0,4,0,0,0,0,4],
[0,0,0,0,0,2,1,1,1,1,1,1,1,3,4,4,4,4,4,4,4,4,4,4,0,4,2,1,1,1,1,1,1,1,2,0,0,4,0,0,0,0,0,0,4,0,0,0,0,4],
[0,0,0,0,0,2,1,1,1,1,1,1,1,2,4,0,0,0,0,0,0,0,0,4,0,4,2,1,1,1,1,1,1,1,2,0,0,4,0,0,0,0,0,0,4,0,0,0,0,4],
[0,0,0,0,0,2,1,1,1,1,1,1,1,2,4,0,0,0,0,0,0,0,0,4,0,4,2,2,2,2,2,2,2,2,2,0,0,4,0,0,0,0,0,0,4,0,0,0,0,4],
[0,0,0,0,0,2,2,2,3,2,2,2,2,2,4,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,4],
[0,0,0,0,0,0,0,0,4,0,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,2,2,2,2,0,0,0,4],
[0,0,0,0,0,0,4,4,4,0,4,0,0,0,4,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,4,2,1,1,1,1,1,1,3,4,4,4,4],
[0,2,2,2,2,2,3,2,4,4,4,4,4,4,4,0,0,0,2,1,1,1,1,1,1,1,2,0,2,2,2,2,2,2,2,2,2,4,2,1,1,1,1,1,1,2,0,0,0,4],
[0,2,1,1,1,1,1,2,4,0,4,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,2,0,2,1,1,1,1,1,1,1,2,4,2,1,1,1,1,1,1,2,0,0,0,4],
[0,2,1,1,1,1,1,2,4,0,4,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,2,0,2,1,1,1,1,1,1,1,2,4,2,1,1,1,1,1,1,2,0,0,0,4],
[0,2,1,1,1,1,1,2,4,0,4,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,2,0,2,1,1,1,1,1,1,1,2,4,2,1,1,1,1,1,1,2,0,0,0,4],
[0,2,1,1,1,1,1,2,4,0,4,0,0,0,0,0,0,4,2,1,1,1,1,1,1,1,2,0,2,1,1,1,1,1,1,1,2,4,3,1,1,1,1,1,1,2,0,0,0,4],
[0,2,1,1,1,1,1,2,4,0,4,0,0,0,0,0,0,4,2,1,1,1,1,1,1,1,2,4,3,1,1,1,1,1,1,1,2,4,2,1,1,1,1,1,1,2,0,0,0,4],
[0,2,1,1,1,1,1,2,4,0,4,0,0,0,0,0,0,4,2,1,1,1,1,1,1,1,2,4,2,1,1,1,1,1,1,1,2,4,2,1,1,1,1,1,1,2,0,0,0,4],
[0,2,1,1,1,1,1,2,4,0,4,0,0,0,0,0,0,4,2,2,2,2,2,3,3,2,2,4,2,3,2,2,2,3,2,2,2,4,2,1,1,1,1,1,1,2,0,0,0,4],
[0,2,1,1,1,1,1,2,4,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,4,4,4,4,4,4,4,4,4,4,4,2,2,2,2,2,2,2,2,0,0,0,4],
[0,2,2,3,2,2,2,2,4,0,4,0,0,0,0,0,2,2,2,2,2,2,3,2,4,0,0,0,0,4,0,0,0,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4],
[0,0,0,4,0,0,0,0,4,0,4,0,0,0,0,0,2,1,1,1,1,1,1,2,4,0,0,0,0,4,0,0,0,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4],
[0,0,0,4,0,0,0,0,4,0,4,0,0,0,0,0,2,1,1,1,1,1,1,3,4,4,4,4,4,4,4,4,4,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4],
[0,0,0,4,0,0,0,0,4,0,4,0,0,0,0,0,2,1,1,1,1,1,1,2,4,0,0,0,0,4,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4],
[0,2,2,3,2,2,2,2,3,2,4,0,0,0,0,0,2,1,1,1,1,1,1,2,4,0,0,0,0,4,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4],
[0,2,1,1,1,1,1,1,1,2,4,0,0,0,0,0,2,1,1,1,1,1,1,2,4,0,0,0,0,4,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4],
[0,2,1,1,1,1,1,1,1,2,4,0,0,0,0,0,2,1,1,1,1,1,1,2,4,0,0,0,0,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,4,4,4,4],
[0,2,1,1,1,1,1,1,1,2,4,0,0,0,0,0,2,2,2,2,2,2,2,2,4,0,0,0,0,4,0,0,0,0,0,0,0,0,2,2,2,2,2,2,3,2,4,0,0,4],
[0,2,1,1,1,1,1,1,1,2,4,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,4,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,2,4,0,0,4],
[0,2,1,1,1,1,1,1,1,2,4,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,2,3,2,2,2,2,0,0,0,0,2,1,1,1,1,1,1,2,4,0,0,4],
[0,2,1,1,1,1,1,1,1,2,4,0,0,0,0,0,0,0,0,0,0,0,0,4,2,1,1,1,1,1,1,1,1,2,0,0,0,0,2,1,1,1,1,1,1,2,4,0,0,4],
[0,2,2,2,2,2,2,2,3,2,4,0,0,0,0,0,0,0,0,0,0,0,0,4,3,1,1,1,1,1,1,1,1,2,0,0,0,0,2,1,1,1,1,1,1,2,4,0,0,4],
[0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,2,0,0,0,0,2,1,1,1,1,1,1,2,4,0,0,4],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,2,0,0,0,0,2,1,1,1,1,1,1,2,4,0,0,4],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,2,0,0,0,0,2,2,2,2,2,2,2,2,4,0,0,4],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4]]
/*eslint-enable */

const damageVariance = 0.2

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function initHero() {
  return {
    type: 'hero',
    detail: {
      name: 'hero',
      xp: 0,
      hp: 100,
      maxHP: 100,
      weapon: { detail: { name: 'fist' } },
      attack: 5,
      level: 1,
      row: undefined,
      col: undefined
    },
    messages: ['Game Initialized'],
    getWeapon(weapon) {
      this.detail.weapon = weapon
      this.detail.attack = weapon.detail.attack * this.detail.level
    },
    getHealth(health) {
      if (this.detail.hp + health.detail.hp >= this.detail.maxHP) {
        this.detail.hp = this.detail.maxHP
      } else {
        this.detail.hp += health.detail.hp
      }
    },
    loseHealth(hp) {
      this.detail.hp -= hp
    },
    getXP(xp) {
      this.detail.xp += xp
      this.checkLevelUp()
    },
    checkLevelUp() {
      if (this.detail.xp > (100 * this.detail.level)) {
        this.detail.level++
        this.detail.attack *= this.detail.level
        this.detail.maxHP += 25
        this.detail.hp = this.detail.maxHP
        this.messages.push('Level Up! Attack increased and MaxHP increased by 25!')
      }
    }
  }
}

function placeCharacter(characterType, state) {
  const rowIndex = _.random(state.board.length - 1)
  const colIndex = _.random(state.board[0].length - 1)
  // don't place the character in a wall
  if (state.board[rowIndex][colIndex].content.type !== 'wall') {
    if (characterType === 'hero') {
      state.board[rowIndex][colIndex].content = state.hero
      state.hero.detail.row = rowIndex
      state.hero.detail.col = colIndex
    } else if (characterType === 'boss') {
      state.board[rowIndex][colIndex].content = createBoss()
    }
    return state
  }
  return placeCharacter(characterType, state)
}

function placeHero(state) {
  return placeCharacter('hero', state)
}

function placeBoss(state) {
  return placeCharacter('boss', state)
}

function createBoss() {
  const bossDetail = {
    level: 5,
    name: 'Dragon',
    attack: 40,
    hp: 200
  }
  return createVillian(bossDetail)
}

function createVillian(villianDetail) {
  return {
    type: 'villian',
    detail: villianDetail,
    loseHealth(hp) {
      this.detail.hp -= hp
    }
  }
}

function createRandomVillian() {
  const level = randomItem([1, 2, 3, 4])
  const hpOptions = [15, 20, 25, 30]
  const names = ['orc', 'goblin', 'minotaur']
  const attackOptions = [3, 5, 7, 10]
  const detail = {
    level,
    name: randomItem(names),
    hp: randomItem(hpOptions) * level,
    attack: randomItem(attackOptions) * level
  }
  return createVillian(detail)
}

function createWeapon() {
  const weapons = [{ name: 'sword', attack: 8 }, { name: 'axe', attack: 11 }]
  return {
    type: 'weapon',
    detail: randomItem(weapons)
  }
}

function createHealth() {
  return {
    type: 'health',
    detail: {
      name: 'health',
      hp: 25
    }
  }
}

function createEmptyCell() {
  return {
    type: 'empty'
  }
}

function generateRandomCellContent() {
  const num = Math.random()
  if (num < 0.025) {
    return createRandomVillian()
  } else if (num < 0.050) {
    return createWeapon()
  } else if (num < 0.075) {
    return createHealth()
  }
  return createEmptyCell()
}

function genBoard() {
  const board = boardTemplate.map((row, index) => {
    return row.map((cell, i) => {
      if (cell !== 0) {
        return {
          row: index,
          col: i,
          content: generateRandomCellContent()
        }
      }
      return {
        row: index,
        col: i,
        content: { type: 'wall' }
      }
    })
  })
  return board
}

function getMaxAttackValues(attackValue) {
  return {
    minAttack: attackValue * (1 - damageVariance),
    maxAttack: attackValue * (1 + damageVariance)
  }
}

function fight(villian, hero) {
  // console.log('fight', villian.detail.hp, hero.detail.attack)
  const fightBoss = villian.detail.name === 'Dragon'
  const heroRange = getMaxAttackValues(hero.detail.attack)
  const villianRange = getMaxAttackValues(villian.detail.attack)
  const damageToVillian = Math.round(_.random(heroRange.minAttack, heroRange.maxAttack))
  const damageToHero = Math.round(_.random(villianRange.minAttack, villianRange.maxAttack))
  if (fightBoss) {
    hero.messages.push(`YOU'VE ENCOUNTERED THE BOSS:
       A ${villian.detail.level} ${villian.detail.name} (HP: ${villian.detail.hp}).`)
  } else {
    hero.messages.push(`Fighting a level
       ${villian.detail.level} ${villian.detail.name} (HP: ${villian.detail.hp}).`)
  }
  villian.loseHealth(damageToVillian)
  if (villian.detail.hp > 0) {
    hero.messages.push(`You did ${damageToVillian}
       damage to the ${villian.detail.name} (HP: ${villian.detail.hp}).`)
    hero.loseHealth(damageToHero)
    hero.messages.push(`The ${villian.detail.name} did ${damageToHero} damage to you.`)
    if (hero.detail.hp <= 0) {
      hero.messages.push('You died!  Resetting...')
      return 'reset-death'
    }
    return 'lose'
  }
  if (fightBoss) {
    hero.messages.push('You have defeated the Dragon Boss and have won the game!!  Resetting...')
    return 'reset-win'
  }
  const xpGained = villian.detail.level * 10
  hero.messages.push(`You defeated the ${villian.detail.name} and gained ${xpGained} XP`)
  hero.getXP(xpGained)
  return 'win'
}

function handleCellContent(content, hero) {
  switch (content.type) {
    case 'weapon':
      hero.getWeapon(content)
      hero.messages.push(`You picked up a Weapon: ${content.detail.name}
         with average attack power of ${content.detail.attack}`)
      break
    case 'health':
      hero.getHealth(content)
      hero.messages.push(`You picked up health`)
      break
    default:
      return
  }
}

function movePlayer(state, key) {
  const newState = state  // mutating for performance
  const curPosition = newState.board[newState.hero.detail.row][newState.hero.detail.col]
  let newRow = newState.hero.detail.row
  let newCol = newState.hero.detail.col
  const hero = newState.hero
  switch (key) {
    case 37:
      newCol--
      break
    case 38:
      newRow--
      break
    case 39:
      newCol++
      break
    case 40:
      newRow++
      break
    default:
      return newState
  }

  const newPosition = newState.board[newRow][newCol]

  const content = newPosition.content     // handle content for new cell

  if (content.type === 'wall') { // handle wall
    return newState
  } else if (content.type === 'villian') { // handle fighting
    const fightResult = fight(content, hero)
    if (fightResult.includes('reset')) {
      return fightResult
    } else if (fightResult === 'lose') { // don't move(continue) if the fight hasn't been won yet
      return newState
    }
  } else { // handle other cell content
    handleCellContent(content, hero)
  }
  curPosition.content = createEmptyCell()
  hero.detail.row = newRow
  hero.detail.col = newCol
  newPosition.content = hero
  return newState
}

class App extends React.Component {
  constructor() {
    super()
    this.placeHero = this.placeHero.bind(this)
    this.placeBoss = this.placeBoss.bind(this)
    this.reset = this.reset.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleArrowPress = this.handleArrowPress.bind(this)
    this.state = {
      board: genBoard(),
      hero: initHero(),
      showModal: false,
      modalMessage: {}
    }
  }
  componentDidMount() {
    this.placeHero()
    this.placeBoss()
    document.addEventListener('keydown', this.handleArrowPress)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleArrowPress)
  }
  getVisibleBoard() {
    const ranges = { // default ranges
      rowLowerRange: 0,
      rowUpperRange: this.state.board.length,
      colLowerRange: 0,
      colUpperRange: this.state.board[0].length
    }
    // set visible row ranges
    if (this.state.hero.detail.row < 7) {
      ranges.rowUpperRange = 14
    } else if (this.state.hero.detail.row > this.state.board.length - 8) {
      ranges.rowLowerRange = this.state.board.length - 15
    } else {
      ranges.rowLowerRange = this.state.hero.detail.row - 7
      ranges.rowUpperRange = this.state.hero.detail.row + 7
    }
    // set visible column ranges
    if (this.state.hero.detail.col < 10) {
      ranges.colUpperRange = 20
    } else if (this.state.hero.detail.col > this.state.board[0].length - 11) {
      ranges.colLowerRange = this.state.board[0].length - 21
    } else {
      ranges.colLowerRange = this.state.hero.detail.col - 10
      ranges.colUpperRange = this.state.hero.detail.col + 10
    }

    // extract visible portion of board
    let visibleBoard = this.state.board.slice(ranges.rowLowerRange, ranges.rowUpperRange)
    visibleBoard = visibleBoard.map((row) => {
      return row.slice(ranges.colLowerRange, ranges.colUpperRange)
    })
    return visibleBoard
  }
  closeModal() {
    this.reset()
  }
  handleArrowPress(e) {
    const keys = [37, 38, 39, 40]
    if (keys.indexOf(e.keyCode) >= 0) {
      const moveResults = movePlayer(this.state, e.keyCode)
      if (typeof moveResults === 'string') {
        if (moveResults === 'reset-death') {
          this.setState({
            showModal: true,
            modalMessage: {
              title: 'You died!',
              body: 'Better luck next time!  Close this dialog to begin again.'
            }
          })
        } else {
          this.setState({
            showModal: true,
            modalMessage: {
              title: 'You won!',
              body: 'Great job! Close this dialog to begin again.'
            }
          })
        }
      } else {
        this.setState(moveResults)
      }
    }
  }
  reset() {
    const newState = {
      hero: initHero(),
      board: genBoard(),
      showModal: false,
      modalMessage: {}
    }
    this.setState(newState, () => {
      this.placeHero()
      this.placeBoss()
    })
  }
  placeHero() {
    this.setState(placeHero(this.state))
  }
  placeBoss() {
    this.setState(placeBoss(this.state))
  }
  render() {
    console.log('render', this.state)
    const visibleBoard = this.getVisibleBoard()
    // console.log(visibleBoard)
    return (
      <div>
        {this.state.showModal ?
          <ResetDialog modalMessage={this.state.modalMessage} closeModal={this.closeModal}/>
          : null}
        <Board board={visibleBoard} />
        <div className="row hero-detail-container">
          <div className="col-md-4">
            <ul className="list-group">
              <li className="list-group-item">Level: {this.state.hero.detail.level}</li>
              <li className="list-group-item">XP: {this.state.hero.detail.xp}</li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul className="list-group">
              <li className="list-group-item">HP: {this.state.hero.detail.hp}</li>
              <li className="list-group-item">Attack: {this.state.hero.detail.attack}</li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul className="list-group">
              <li className="list-group-item">
                Weapon: {this.state.hero.detail.weapon.detail.name}
              </li>
            </ul>
          </div>
        </div>
        <div className="row hero-detail-container">
          <div clasName="col-md-12">
            <Messages messages={this.state.hero.messages}/>
          </div>
        </div>
      </div>
    )
  }
}

const Board = ({ board }) => {
  const rows = board.map((row, index) => {
    return <Row row={row} key={index}/>
  })
  return (
    <div className="gameboard">{rows}</div>
  )
}

const Row = ({ row }) => {
  const cells = row.map((cell, index) => {
    return <Cell cell={cell} key={index}/>
  })
  return (
    <div className="board-row">{cells}</div>
  )
}

const Cell = ({ cell }) => {
  const content = cell.content
  let cellClass = 'board-cell'
  if (content.type === 'villian' || content.type === 'hero') {
    cellClass += ` ${content.detail.name}`
  } else if (content.type === 'weapon') {
    cellClass += ` sprite-items ${content.detail.name}`
  } else if (content.type === 'health') {
    cellClass += ` sprite-icons ${content.detail.name}`
  } else if (content.type === 'wall') {
    cellClass += ` wall`
  }
  return <div className={cellClass}></div>
}

const Messages = ({ messages }) => {
  const recentMessages = messages.slice().reverse().slice(0, 8).map((message, index) => {
    return <li key={index}>{message}</li>
  })
  return (
    <ul className="list-group">
      {recentMessages}
    </ul>
  )
}

const ResetDialog = ({ modalMessage, closeModal }) => {
  return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">{modalMessage.title}</h4>
          </div>
          <div className="modal-body">
            <p>{modalMessage.body}</p>
          </div>
        </div>
      </div>
  )
}

const app = React.createElement(App)

ReactDOM.render(app, document.getElementById('content'))
