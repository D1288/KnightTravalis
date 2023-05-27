const squareData = new Map()

function ChessSquare(x, y) {
    const xPos = x
    const yPos = y;
    let previousSquare;

    const KnightMoves = [
        [1, 2], [1, -2],
        [-1, 2], [-1, -2],
        [2, 1], [2, -1],
        [-2, 1], [-2, -1]
    ]

    function createKnightMoves() {
        return KnightMoves.map(newSquareFrom).filter(Boolean)
    }

    function newSquareFrom([xOffset, yOffset]) {
        const [newX, newY] = [xPos + xOffset, yPos + yOffset]
        if (0 <= newX && newX < 8 && 0 <= newY && newY < 8) return ChessSquare(newX, newY)
    }

    function getPrevious() {
        return previousSquare
    }

    function setPrevious(newPrevious) {
        if (!previousSquare) return newPrevious
    }

    function name() {
        return `${x}, ${y}`
    }

    if (squareData.has(name())) return squareData.get(name())
    else {
        const newSquare = { name, getPrevious, setPrevious, createKnightMoves }
        squareData.set(name(), newSquare)
        return newSquare;
    }
}


function knightTravails(start, finish) {
    squareData.clear()
    const beginning = ChessSquare(...start)
    const ending = ChessSquare(...finish)
    const queue = [ending]


    while (!queue.includes(start)) {
        const currentSquare = queue.shift()
        const enqueueList = currentSquare.createKnightMoves()
        enqueueList.forEach(square => square.setPrevious(currentSquare))
        queue.push(...enqueueList)
    }

    const path = [beginning]
    while (!path.includes(ending)) {
        const nextSquare = path.at(-1).getPrevious()
        path.push(nextSquare)
    }

    console.log(`Shortest path was ${path.length - 1} moves`)
    console.log("The moves were:");
    path.forEach(square => console.log(square.name()))
}