function genBoard(width, height){
  var board = []
  for (var i = 0; i < height; i++){
    board.push([])
  }
  board.forEach(function(row, index){
    for (var i = 0; i < width; i++){
      row.push({
        row: index,
        col: i,
        content: generateRandomCellContent()
      })
    }
  })
  return board
}

function randomItem(array){
  return array[Math.floor(Math.random() * array.length)]
}

function initHero(){
  return {
    type: 'hero',
    detail: {
      name: 'hero',
      xp: 0,
      hp: 100,
      weapon: {name: 'fist'},
      attack: 5,
      level: 1,
      row: undefined,
      col: undefined
    }
  }
}

function placeHero(state){
  var newState = _.cloneDeep(state)
  var rowIndex = _.random(newState.board.length - 1)
  var colIndex = _.random(newState.board[0].length - 1)
  newState.board[rowIndex][colIndex].content = newState.hero
  newState.hero.detail.row = rowIndex
  newState.hero.detail.col = colIndex
  return newState
}

function createRandomVillian(){
  var hpOptions = [15, 20, 25, 30]
  var names = ['orc','goblin','minotaur']
  var attackOptions = [3, 5, 7, 10]
  var detail = {
    name: randomItem(names),
    hp: randomItem(hpOptions),
    attack: randomItem(attackOptions)
  }
  return createVillian(detail)
}

function createVillian(villianDetail){
  return {
    type: 'villian',
    detail: villianDetail
  }
}

function createWeapon(){
  var weapons = [{name: 'sword', attack: 5}, {name: 'axe', attack: 9}]
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
  var num = Math.random()
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
  hero.detail.attack += weapon.detail.attack
}

function getHealth(health, hero){
  if (hero.detail.hp + health.detail.hp >= 100){
    hero.detail.hp = 100
  } else {
    hero.detail.hp += health.detail.hp
  }
}

function handleCellContent(content, hero){
  switch (content.type) {
    case 'weapon':
      getWeapon(content, hero)
      break;
    case 'health':
      getHealth(content, hero)
    default:
      return
  }
}

function movePlayer(state, key){
  var newState = state                  // mutating for performance (maybe consider something other than cloneDeep)
  var curPosition = newState.board[newState.hero.detail.row][newState.hero.detail.col]
  var newRow = newState.hero.detail.row
  var newCol = newState.hero.detail.col
  var hero = newState.hero
  switch (key) {
    case 37:
      newCol--
      break
    case 38:
      newRow--
      break;
    case 39:
      newCol++
      break;
    case 40:
      newRow++
      break;
    default:
      return
  }

  var newPosition = newState.board[newRow][newCol]

  var content = newPosition.content     // handle content for new cell

  if (content.type === 'villian'){      // handle fighting
    var fightWon = fight(content, hero)
    if (!fightWon) {return newState}    //don't continue e.g. don't move if the fight hasn't been won yet
  } else {                              //handle other cell content
    handleCellContent(content, hero)
  }

  curPosition.content = createEmptyCell()
  hero.detail.row = newRow
  hero.detail.col = newCol
  newPosition.content = hero
  return newState
}


var App = React.createClass({
  getInitialState: function(){
    return {
      board: genBoard(20, 14),
      hero: initHero()
    }
  },
  componentDidMount: function(){
    this.setState(placeHero(this.state))
    document.addEventListener("keydown", this.handleArrowPress)
  },
  componentWillUnmount: function(){
    //remove event listener
  },
  handleArrowPress: function(e){
    var keys = [37,38,39,40]
    keys.indexOf(e.keyCode) >= 0 ? this.setState(movePlayer(this.state, e.keyCode)) : null
  },
  render: function(){
    return (
      <div>
        <Board board={this.state.board}></Board>
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
              <li className="list-group-item">Weapon: {this.state.hero.detail.weapon.name}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
})

var Board = React.createClass({
  render: function(){
    var rows = this.props.board.map(function(row, index){
      return <Row row={row} key={index}/>
    })
    return <div className="gameboard">{rows}</div>
  }
})

var Row = React.createClass({
  render: function(){
    var cells = this.props.row.map(function(cell, index){
      return <Cell cell={cell} key={index}/>
    })
    return (
      <div className="board-row">{cells}</div>
    )
  }
})

var Cell = React.createClass({
  render: function(){
    var content = this.props.cell.content
    var cellClass = "board-cell"
    content.type === 'villian' || content.type === 'hero' ? cellClass += " " + content.detail.name : null
    content.type === 'weapon' ? cellClass += " sprite-items " + content.detail.name : null
    content.type === 'health' ? cellClass += " sprite-icons " + content.detail.name : null
    return <div className={cellClass}></div>
  }
})

var app = React.createElement(App);

ReactDOM.render(app, document.getElementById('content'))
