import {generateGame} from "@/minesweeper"

function testGame(width: number, height: number, bombs: number) {
  const game = generateGame(width, height, bombs)
  expect(game.match(/\|\|:\w+?:\|\|/g)).toHaveLength(width * height)
  expect(game.match(/\n/g)).toHaveLength(height)
  expect(game.match(/:bomb:/g)).toHaveLength(bombs)
}

describe("MineSweeper", () => {
  it("default", () => {
    testGame(10, 10, 10)
  })

  it("20 10 10", () => {
    testGame(20, 10, 10)
  })

  it("10 10 30", () => {
    testGame(10, 10, 30)
  })

  it("10 20 10", () => {
    testGame(10, 20, 10)
  })
})