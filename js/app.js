/* global React, ReactDOM, _*/
/* eslint complexity: [2, 10]*/
/* eslint react/prefer-es6-class: [0] */
/* eslint arrow-body-style: [2, "always"] */
/* eslint react/no-multi-comp: [0] */

const boardTemplate = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
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
      weapon: { detail: { name: 'fist' } },
      attack: 5,
      level: 1,
      row: undefined,
      col: undefined
    },
    getWeapon(weapon) {
      this.detail.weapon = weapon
      this.detail.attack = weapon.detail.attack
    },
    getHealth(health) {
      if (this.detail.hp + health.detail.hp >= 100) {
        this.detail.hp = 100
      } else {
        this.detail.hp += health.detail.hp
      }
    },
    loseHealth(hp) {
      this.detail.hp -= hp
    }
  }
}

function placeHero(state) {
  const newState = _.cloneDeep(state)
  const rowIndex = _.random(newState.board.length - 1)
  const colIndex = _.random(newState.board[0].length - 1)
  // don't place the hero in a wall
  if (newState.board[rowIndex][colIndex].content.type !== 'wall') {
    newState.board[rowIndex][colIndex].content = newState.hero
    newState.hero.detail.row = rowIndex
    newState.hero.detail.col = colIndex
    return newState
  }
  return placeHero(state)
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
  const hpOptions = [15, 20, 25, 30]
  const names = ['orc', 'goblin', 'minotaur']
  const attackOptions = [3, 5, 7, 10]
  const detail = {
    name: randomItem(names),
    hp: randomItem(hpOptions),
    attack: randomItem(attackOptions)
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

function genBoard(width, height) {
  let board = boardTemplate.map((row, index) => {
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
  const heroRange = getMaxAttackValues(hero.detail.attack)
  const villianRange = getMaxAttackValues(villian.detail.attack)
  const damageToVillian = Math.round(_.random(heroRange.minAttack, heroRange.maxAttack))
  const damageToHero = Math.round(_.random(villianRange.minAttack, villianRange.maxAttack))
  console.log(damageToVillian)
  villian.loseHealth(damageToVillian)
  if (villian.detail.hp > 0) {
    hero.loseHealth(damageToHero)
    console.log(damageToHero)
    if (hero.detail.hp <= 0) alert('You died!')
    return false // did not win yet
  }
  return true
}


function handleCellContent(content, hero) {
  switch (content.type) {
    case 'weapon':
      hero.getWeapon(content)
      break
    case 'health':
      hero.getHealth(content)
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

  if (content.type === 'wall') {          // handle wall
    return newState
  }

  if (content.type === 'villian') {      // handle fighting
    const fightWon = fight(content, hero)
    if (!fightWon) { return newState }    // don't move(continue) if the fight hasn't been won yet
  } else {                              // handle other cell content
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
    this.handleArrowPress = this.handleArrowPress.bind(this)
    this.state = {
      board: genBoard(40,30),
      hero: initHero()
    }
  }
  componentDidMount() {
    this.placeHero()
    document.addEventListener('keydown', this.handleArrowPress)
  }
  componentWillUnmount() {
    // remove event listener
  }
  placeHero() {
    this.setState(placeHero(this.state))
  }
  handleArrowPress(e) {
    const keys = [37, 38, 39, 40]
    // console.log(this.state)
    if (keys.indexOf(e.keyCode) >= 0) this.setState(movePlayer(this.state, e.keyCode))
  }
  getVisibleBoard() {
    return this.state.board.slice(this.state.hero.detail.row - 7, this.state.hero.detail.row + 6)
  }
  render() {
    return (
      <div>
        <Board board={this.getVisibleBoard()} />
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

const app = React.createElement(App)

ReactDOM.render(app, document.getElementById('content'))
