import React from "react"

class NewRoomForm extends React.Component {

    constructor() {
        super()
        this.state = {
            roomName: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.createNewRoom(this.state.roomName)
        this.setState({
            roomName: ""
        })
    }

    render() {
        return (
            <div className="new-room-form">
                <form class="room-form" onSubmit={this.handleSubmit}>
                    <input 
                        name="roomName"
                        value={this.state.roomName}
                        onChange={this.handleChange}
                        type="text" 
                        placeholder="New Room" 
                        required 
                        class="room-input" 
                    />
                    <button className="new-room-btn">Add</button>
                </form>
            </div>
        )
    }
}

export default NewRoomForm
