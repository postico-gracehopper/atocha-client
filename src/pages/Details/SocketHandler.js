const { io } = require('socket.io-client')
import * as FileSystem from 'expo-file-system'

export const SocketHandler = async (uri) => {
  // const audio = fetch(uri);
  console.log('socket handler entered')

  const socket = io('http://127.0.0.1:3000')

  const audio = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  })
  console.log('audio file (client): ', audio)

  socket.on('send-it', (serverSocket) => {
    console.log('connected to server! (client side)')

    socket.emit('audio', audio)

    // on('data', (chunk) => {
    //   console.log(chunk)
    //   socket.emit('audio', chunk)
    // })
  })

  socket.on('answer', (answer) => {
    //update slice's translatedtext
  })
}
