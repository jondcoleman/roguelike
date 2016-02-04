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

function initHero(state){
  var newState = _.cloneDeep(state)
  var rowIndex = _.random(newState.board.length - 1)
  var colIndex = _.random(newState.board[0].length - 1)
  var hero = {
    type: 'hero',
    detail: {
      name: 'hero',
      xp: 0,
      hp: 100,
      weapon: undefined,
      attack: 5,
      level: 1,
      row: rowIndex,
      col: colIndex
    }
  }
  newState.hero = hero
  newState.board[rowIndex][colIndex].content = hero
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

function createEmptyCell(){
  return {
    type: 'empty'
  }
}

function generateRandomCellContent(){
  var num = Math.random()
  if (num < 0.05) {
    return createRandomVillian()
  } else {
    return createEmptyCell()
  }
}

function movePlayer(state, key){
  var newState = state // mutating for performance (maybe consider something other than cloneDeep)
  var curPosition = newState.board[newState.hero.detail.row][newState.hero.detail.col]
  var newRow = newState.hero.detail.row
  var newCol = newState.hero.detail.col
  var hero = newState.hero
  if (key === 37) {
    newCol--
  } else if (key === 38) {
    newRow--
  } else if (key === 39) {
    newCol++
  } else if (key === 40) {
    newRow++
  } else {
    return
  }
  var newPosition = newState.board[newRow][newCol]
  if (newPosition.content.type === 'villian') {
    var villian = newPosition.content
    console.log("start ", hero.detail.hp, villian.detail.hp, hero.detail.attack, villian.detail.attack)
    villian.detail.hp -= hero.detail.attack
    console.log(villian.detail)  
    if (villian.detail.hp > 0) {
      hero.detail.hp -= villian.detail.attack
      console.log("start ", hero.detail.hp, villian.detail.hp)
      if (hero.detail.hp <= 0) {
        alert("You died")
      }
      return newState
    }
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
      board: genBoard(20, 14)
    }
  },
  componentDidMount: function(){
    this.setState(initHero(this.state))
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
    console.log()
    return <Board board={this.state.board}></Board>
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
    return <div className={cellClass}></div>
  }
})

var app = React.createElement(App);

ReactDOM.render(app, document.getElementById('content'))
