const React = require("react")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
    }

    handleSubmit() {
        this.props.rps.play(this.state.p1Throw, this.state.p2Throw, this)
    }

    invalid(){
        this.setState({result: "INVALID"})
    }

    tie(){
        this.setState({result: "TIE"})
    }

    p1Wins(){
        this.setState({result: "P1 Wins!"})
    }

    p2Wins(){
        this.setState({result: "P2 Wins!"})
    }

    handleThrowChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return <div>
            {this.state.result}
            <input name="p1Throw" onChange={this.handleThrowChange.bind(this)}/>
            <input name="p2Throw" onChange={this.handleThrowChange.bind(this)}/>
            <button onClick={this.handleSubmit.bind(this)}>PLAY</button>
        </div>
    }
}

module.exports = PlayForm