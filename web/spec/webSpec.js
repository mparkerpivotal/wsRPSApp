const ReactDOM = require("react-dom")
const React = require("react")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
    }
    
    handleSubmit() {
        this.props.rps.play("p1 throw placeholder", "p2 throw placeholder", this)
    }

    invalid(){
        this.setState({result: "INVALID"})
    }

    tie(){
        this.setState({result: "TIE"})
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
        beforeEach(function () {
            renderForm({play(p1, p2, observer){observer.invalid()}})
        })

        it("display 'INVALID'", function () {
            expect(page()).not.toContain("INVALID")
            submitForm()
            expect(page()).toContain("INVALID")
        })
    })

    describe("request processes as tie", function () {
        beforeEach(function () {
            renderForm({play(p1, p2, observer){observer.tie()}})
        })

        it("display 'TIE'", function () {
            expect(page()).not.toContain("TIE")
            submitForm()
            expect(page()).toContain("TIE")
        })
    })

    let domFixture

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "hello!!!"
        document.body.appendChild(domFixture)
    }

    beforeEach(function () {
        setupDOM()
    })

    afterEach(function () {
        domFixture.remove()
    })

    function renderForm(alwaysInvalidRps) {
        ReactDOM.render(
            <PlayForm rps={alwaysInvalidRps}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText;
    }

    function submitForm() {
        document.querySelector("button").click()
    }
})