const React = require("react")
const ReactDOM = require("react-dom")
const {Rps, Round} = require("rps")
const PlayForm = require("./src/components/PlayForm")
const History = require("./src/components/History")

function FakeRoundRepo(){
    let rounds = []

    this.isEmpty = function(){
        return rounds.length === 0
    }

    this.save = function(r){
        rounds.push(r)
    }

    this.getAll = function(){
        return rounds
    }
}

let roundRepo = new FakeRoundRepo()

roundRepo.save(new Round("foo", "bar", "invalid"))
roundRepo.save(new Round("rock", "rock", "tie"))

let rps = new Rps(roundRepo)

class App extends React.Component {
    render(){
        return <div>
            <PlayForm rps={this.props.rps}/>
            <History rps={this.props.rps}/>
        </div>
    }
}

ReactDOM.render(
    <App rps={rps}/>,
    document.querySelector("#app")
)