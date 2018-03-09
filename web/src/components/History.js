const React = require("react")

class History extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        this.props.rps.getHistory(this)
    }

    noRounds(){
        this.setState({display: <NoRounds/>})
    }

    rounds(rs){
        this.setState({display: <Rounds rounds={rs}/>})
    }

    render() {
        return <div>
            {this.state.display}
        </div>
    }
}

class NoRounds extends React.Component {
    render(){
        return <h1>
            NO ONE HAS PLAYED. BOO!
        </h1>
    }
}

class Rounds extends React.Component {
    render(){
        return <table>
            <thead>
                <tr>
                    <td>p1</td>
                    <td>p2</td>
                    <td>result</td>
                </tr>
            </thead>
            <tbody>
                {this.props.rounds.map((r, i) => <tr key={i}>
                    <td>{r.p1Throw}</td>
                    <td>{r.p2Throw}</td>
                    <td>{r.result}</td>
                </tr>)}
            </tbody>
        </table>
    }
}

module.exports = History