import {generateGame} from "@/minesweeper"

describe("MineSweeper", () => {
  it("generateGame", () => {
    const game = generateGame(10, 10, 10)
    expect(game.match(/\|\|:\w+?:\|\|/g)).toHaveLength(10 * 10)
    expect(game.match(/:bomb:/g)).toHaveLength(10)
  })
})