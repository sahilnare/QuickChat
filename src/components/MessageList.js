import React from "react"
import ReactDOM from "react-dom"
import Message from "./Message"

class MessageList extends React.Component {
    componentDidUpdate() {
        const node = ReactDOM.findDOMNode(this)
        node.scrollTop = node.scrollHeight
    }

    render() {
        if(!this.props.roomId) {
            return (
                <div className="join-room">
                    <p>&larr; Join a room!</p>
                </div>
            )
        }
        return (
            <div className="message-list">
                {
                    this.props.messages.map((message, index) => {
                        return (
                            <Message key={index} userName={message.senderId} text={message.parts[0].payload.content}/>
                        )
                    })
                }
                
            </div>
        )
    }
}

export default MessageList

