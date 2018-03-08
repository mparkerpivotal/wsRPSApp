const ReactDOM = require("react-dom")
const React = require("react")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
    }
    
    handleSubmit() {
        this.setState({result: "INVALID"})
    }

    render() {
        return <div>
            {this.state.result}
            <button onClick={this.handleSubmit.bind(this)}>PLAY</button>
        </div>
    }
}

describe("play form", function () {

    describe("request processes as invalid", function () {
        it("display 'INVALID'", function () {
            let domFixture = document.createElement("div")
            domFixture.id = "hello!!!"
            document.body.appendChild(domFixture)

            let alwaysInvalidRps = {
                play(p1, p2, observer){
                    observer.invalid()
                }
            }

            ReactDOM.render(
                <PlayForm rps={alwaysInvalidRps}/>,
                domFixture
            )

            expect(domFixture.innerText).not.toContain("INVALID")
            document.querySelector("button").click()
            expect(domFixture.innerText).toContain("INVALID")
        })
    })
})