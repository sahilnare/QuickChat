import React from 'react';
import Chatkit from '@pusher/chatkit-client'
import { tokenUrl, instanceLocator } from "./config"
import MessageList from "./components/MessageList"
import SendMessageForm from "./components/SendMessageForm"
import NewRoomForm from "./components/NewRoomForm"
import RoomList from "./components/RoomList"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createNewRoom = this.createNewRoom.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: "thorbowski",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.getRooms()
        
      })
      .catch(error => {
        console.error("error on connecting:", error);
      })
      
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(error => console.log("error on joinable rooms:", error))
  }

  subscribeToRoom(roomId) {
    this.setState({messages: []})
    this.currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      messageLimit: 50,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
          // console.log(currentUser.id, message.parts[0].payload.content, message.createdAt)
        }
      },
    })
    .then(room => {
      this.setState({roomId: room.id})
      this.getRooms()
    })
      .catch(err => console.log('error on subscribing to room: ', err))
  }

  sendMessage(messageToSend) {
    this.currentUser.sendSimpleMessage({
      text: messageToSend,
      roomId: this.state.roomId
    })
  }

  createNewRoom(roomName) {
    this.currentUser.createRoom({
      name: roomName
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log('Error: ', err))
  }

  render() {
    // console.log(this.state.messages)
    return (
      <div className="container">
        <Navbar />
        <RoomList 
          roomId={this.state.roomId}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} 
          subscribeToRoom={this.subscribeToRoom}
        />
        <MessageList roomId={this.state.roomId} messages={this.state.messages}/>
        <NewRoomForm createNewRoom={this.createNewRoom}/>
        <SendMessageForm sendMessage={this.sendMessage} disabled={!this.state.roomId}/>
        <Footer />
      </div>
    );
  }
}

export default App;
