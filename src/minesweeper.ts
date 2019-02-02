import * as shuffle from 'shuffle-array'


function parseSpoiler(str: string): string {
  return `||${str}||`
}

export function generateGame(width: number, height: number, bombs: number): string {
  const nums = [
    ':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:',
  ]
  const bomb = ':bomb:'
  const gameBoard = new Array<number>(width * height).fill(0)
  const bombPos = shuffle.pick([...gameBoard.keys()], {picks: bombs})
  bombPos.forEach(v => {
    [v - width - 1, v - width, v - width + 1, v - 1, v + 1, v + width - 1, v + width, v + width + 1]
      .filter((around) => 0 <= around && around < gameBoard.length && gameBoard[around] != -1)
      .forEach((around) => gameBoard[around]++)
    gameBoard[v] = -1
  })

  return gameBoard.map((v, i) => {
    let ret: string
    if (v >= 0) {
      ret = parseSpoiler(nums[v])
    } else {
      ret = parseSpoiler(bomb)
    }
    if (i % width === width - 1) {
      ret = ret + '\n'
    }
    return ret
  }).join('')
}
