/* global React, ReactDOM, _*/
/* eslint complexity: [2, 10]*/

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
      weapon: { name: 'fist' },
      attack: 5,
      level: 1,
      row: undefined,
      col: undefined
    }
  }
}

function placeHero(state) {
  let newState = _.cloneDeep(state)
  let rowIndex = _.random(newState.board.length - 1)
  let colIndex = _.random(newState.board[0].length - 1)
  newState.board[rowIndex][colIndex].content = newState.hero
  newState.hero.detail.row = rowIndex
  newState.hero.detail.col = colIndex
  return newState
}

function createVillian(villianDetail){
  return {
    type: 'villian',
    detail: villianDetail
  }
}

function createRandomVillian() {
  let hpOptions = [15, 20, 25, 30]
  let names = ['orc','goblin','minotaur']
  let attackOptions = [3, 5, 7, 10]
  let detail = {
    name: randomItem(names),
    hp: randomItem(hpOptions),
    attack: randomItem(attackOptions)
  }
  return createVillian(detail)
}

function createWeapon(){
  let weapons = [{name: 'sword', attack: 5}, {name: 'axe', attack: 9}]
  return {
    type: 'weapon',
    detail: randomItem(weapons)
  }
}

function createHealth(){
  return {
    type: 'health',
    detail: {
      name: 'health',
      hp: 25
    }
  }
}

function createEmptyCell(){
  return {
    type: 'empty'
  }
}

function generateRandomCellContent(){
  let num = Math.random()
  if (num < 0.025) {
    return createRandomVillian()
  } else if (num < 0.050) {
    return createWeapon()
  } else if (num < 0.075){
    return createHealth()
  } else {
    return createEmptyCell()
  }
}

function getWeapon(weapon, hero){
  hero.detail.weapon = weapon.detail
  hero.detail.attack = weapon.detail.attack
}

function getHealth(health, hero){
  if (hero.detail.hp + health.detail.hp >= 100){
    hero.detail.hp = 100
  } else {
    hero.detail.hp += health.detail.hp
  }
}

function fight(villian, hero){
  console.log('fight', villian.detail.hp, hero.detail.attack)
  villian.detail.hp -= hero.detail.attack
  if (villian.detail.hp > 0) {
    hero.detail.hp -= villian.detail.attack
    hero.detail.hp <= 0 ? alert('You died!') : null
    return false //did not win yet
  }
  return true
}


function handleCellContent(content, hero){
  switch (content.type) {
  case 'weapon':
    getWeapon(content, hero)
    break
  case 'health':
    getHealth(content, hero)
    break
  default:
    return
  }
}

function movePlayer(state, key){
  let newState = state  // mutating for performance (maybe consider something other than cloneDeep)
  let curPosition = newState.board[newState.hero.detail.row][newState.hero.detail.col]
  let newRow = newState.hero.detail.row
  let newCol = newState.hero.detail.col
  let hero = newState.hero
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
    return
  }

  let newPosition = newState.board[newRow][newCol]

  let content = newPosition.content     // handle content for new cell

  if (content.type === 'villian'){      // handle fighting
    let fightWon = fight(content, hero)
    if (!fightWon) {return newState}    //don't move(continue) if the fight hasn't been won yet
  } else {                              //handle other cell content
    handleCellContent(content, hero)
  }

  curPosition.content = createEmptyCell()
  hero.detail.row = newRow
  hero.detail.col = newCol
  newPosition.content = hero
  return newState
}

function genBoard(width, height) {
  const board = []
  for (let i = 0; i < height; i++) {
    board.push([])
  }
  board.forEach((row, index) => {
    for (let i = 0; i < width; i++) {
      row.push({
        row: index,
        col: i,
        content: generateRandomCellContent()
      })
    }
  })
  return board
}


let App = React.createClass({
  getInitialState: function(){
    return {
      board: genBoard(20, 14),
      hero: initHero()
    }
  },
  componentDidMount: function(){
    this.setState(placeHero(this.state))
    document.addEventListener('keydown', this.handleArrowPress)
  },
  componentWillUnmount: function(){
    //remove event listener
  },
  handleArrowPress: function(e){
    let keys = [37,38,39,40]
    keys.indexOf(e.keyCode) >= 0 ? this.setState(movePlayer(this.state, e.keyCode)) : null
  },
  render: function(){
    return (
      <div>
        <Board board={this.state.board}></Board>
        <div className='row hero-detail-container'>
          <div className='col-md-4'>
            <ul className='list-group'>
              <li className='list-group-item'>Level: {this.state.hero.detail.level}</li>
              <li className='list-group-item'>XP: {this.state.hero.detail.xp}</li>
            </ul>
          </div>
          <div className='col-md-4'>
            <ul className='list-group'>
              <li className='list-group-item'>HP: {this.state.hero.detail.hp}</li>
              <li className='list-group-item'>Attack: {this.state.hero.detail.attack}</li>
            </ul>
          </div>
          <div className='col-md-4'>
            <ul className='list-group'>
              <li className='list-group-item'>Weapon: {this.state.hero.detail.weapon.name}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
})

let Board = React.createClass({
  render: function(){
    let rows = this.props.board.map(function(row, index){
      return <Row row={row} key={index}/>
    })
    return <div className='gameboard'>{rows}</div>
  }
})

let Row = React.createClass({
  render: function(){
    let cells = this.props.row.map(function(cell, index){
      return <Cell cell={cell} key={index}/>
    })
    return (
      <div className='board-row'>{cells}</div>
    )
  }
})

let Cell = React.createClass({
  render: function(){
    let content = this.props.cell.content
    let cellClass = 'board-cell'
    if (content.type === 'villian' || content.type === 'hero') {
      cellClass += ' ' + content.detail.name
    } else if (content.type === 'weapon') {
      cellClass += ' sprite-items ' + content.detail.name
    } else if (content.type === 'health') {
      cellClass += ' sprite-icons ' + content.detail.name
    }
    return <div className={cellClass}></div>
  }
})

let app = React.createElement(App)

ReactDOM.render(app, document.getElementById('content'))
