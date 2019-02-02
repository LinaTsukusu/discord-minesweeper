import {Client} from 'discord.js'
import * as yargs from 'yargs/yargs'
import {generateGame} from './minesweeper'


const client = new Client()
client.login(process.env.TOKEN)

client.on('message', (message) => {
  const channel = message.channel
  const parser = yargs()
    .option('width', {
      alias: 'w',
      description: 'Set width',
      type: 'number',
      default: 10,
    })
    .option('height', {
      alias: 'h',
      description: 'Set height',
      type: 'number',
      default: 10,
    })
    .option('bombs', {
      alias: 'b',
      description: 'Set bombs amount',
      type: 'number',
      default: 10,
    })
    .version(false)
  const args = parser.parse(message.content.split(' '))

  if (message.author.bot || channel.id !== process.env.CHANNEL_ID || args._[0] !== '/minesweeper' && args._[0] !== '/ms') {
    return
  }
  const game = generateGame(args.width, args.height, args.bombs)
  if (game.length <= 1900) {
    channel.send(game)
  } else {
    // 1900文字超えると壊れる
    channel.send("でかすぎるっぽい")
  }
})
