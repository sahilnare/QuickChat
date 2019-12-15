import React from "react"

class SendMessageForm extends React.Component {
    
    constructor() {
        super()
        this.state = {
            text: ""
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
        this.props.sendMessage(this.state.text)
        this.setState({
            text: ""
        })
    }

    render() {
        
        return (
            <div className="send-message-form">
                <form className="form" onSubmit={this.handleSubmit}>
                    <input 
                        name="text"
                        type="text" 
                        placeholder="Type and hit ENTER" 
                        className="input-field"
                        value={this.state.text}
                        onChange={this.handleChange}
                        disabled={this.props.disabled}
                    />
                </form>
            </div>
        )
    }
}

export default SendMessageForm
