import {Client} from 'discord.js'
import * as program from 'commander'
import {generateGame} from './minesweeper'


const client = new Client()
client.login(process.env.TOKEN)

client.on('message', (message) => {
  const channel = message.channel
  const command = message.content.split(' ')
  if (message.author.bot || channel.id !== process.env.CHANNEL_ID || command[0] !== '/minesweeper') {
    return
  }
  program.version('1.0.0')
    .alias('ms')
    .description('マインスイーパーを生成します')
    .option("-w, --width <width>", "Set width", parseInt,10)
    .option("-h, --height <height>", "Set height", parseInt,10)
    .option("-b, --bombs <bombs>", "Set bombs amount", parseInt,10)
    .parse(command)

  channel.send(generateGame(program.width, program.height, program.bombs))
})
