
$('<canvas height=300 width=300 id="game_board"></canvas>')
	.insertAfter($('#game_area'))
let HEIGHT = 300
let WIDTH = 300	
let game_board = $('#game_board').get(0)
let game_state = 	[[0,0,0],
					 [0,0,0],
					 [0,0,0]]
let X = 1
let O = 2
context = game_board.getContext('2d')
playerShape = X
$('#game_board').click((mouse)=>{
	let pos = {x: Math.floor(mouse.offsetX/(WIDTH/3)), y: Math.floor(mouse.offsetY/(HEIGHT/3))}
	if(isLegalMove(pos)){
		game_state[pos.x][pos.y] = playerShape
		drawShape(pos.x,pos.y,context, playerShape)
		if(isWin(playerShape)) {
			$('#game_area').text('YOU WIN!')
		}
		if(playerShape === X) {
			playerShape = O
		} else {
			playerShape = X
		}

	}
})

console.log('hey')
draw_board(context)

function draw_board(context){
	context.moveTo(WIDTH/3, 0)
	context.lineTo(WIDTH/3,HEIGHT)
	context.stroke()
	context.moveTo(2*WIDTH/3, 0)
	context.lineTo(2*WIDTH/3,HEIGHT)
	context.stroke()
	context.moveTo(0, HEIGHT/3)
	context.lineTo(WIDTH,HEIGHT/3)
	context.stroke()
	context.moveTo(0, 2*HEIGHT/3)
	context.lineTo(WIDTH,2*HEIGHT/3)
	context.stroke()

}

function drawShape(x, y, context, shape){
	x = (WIDTH/3) * x
	y = (HEIGHT/3) * y
	if(shape === X) {
		context.moveTo(x, y)
		context.lineTo(x+WIDTH/3, y+HEIGHT/3)
		context.stroke()
		context.moveTo(x, y+HEIGHT/3)
		context.lineTo(x+WIDTH/3, y)
	} else {
		context.beginPath()
		context.arc(x+WIDTH/6, y+HEIGHT/6, HEIGHT/6, 0, 2*Math.PI)
	}
	context.stroke()
}

function isLegalMove(movePos) {
	return game_state[movePos.x][movePos.y] == 0
}

function isWin(shape) {
	row = (game_state[0][0] == shape && game_state[0][1] == shape && game_state[0][2] == shape) ||
		(game_state[1][0] == shape && game_state[1][1] == shape && game_state[1][2] == shape) ||
		(game_state[2][0] == shape && game_state[2][1] == shape && game_state[2][2] == shape)

	col = (game_state[0][0] == shape && game_state[1][0] == shape && game_state[2][0] == shape) ||
		(game_state[0][1] == shape && game_state[1][1] == shape && game_state[2][1] == shape) ||
		(game_state[0][2] == shape && game_state[1][2] == shape && game_state[2][2] == shape) 

	diag = game_state[1][1] === shape && ((game_state[0][0] === shape && game_state[2][2] === shape) ||
			(game_state[0][2] === shape && game_state[2][0] === shape))
	console.log(row)
	return (row || col || diag)
		
}
