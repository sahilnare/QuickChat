import React from "react"

class RoomList extends React.Component {
    render() {
        const orderedRooms = this.props.rooms.sort((a, b) => a.id - b.id)
        return (
            <div className="room-list">
                <ul>
                    <h3>Your rooms:</h3>
                    {
                        orderedRooms.map(room => {
                            const active = this.props.roomId === room.id ? "-active" : ""
                            return (
                                <li key={room.id} className="room">
                                    <a 
                                        onClick={() => this.props.subscribeToRoom(room.id)} 
                                        href="#"
                                        className={"room-btn" + active}
                                    >#{room.name}</a>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>
        )
    }
}

export default RoomList