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

    p1Wins(){
        this.setState({result: "P1 Wins!"})
    }

    p2Wins(){
        this.setState({result: "P2 Wins!"})
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

    describe("request processes as p1Wins", function () {
        beforeEach(function () {
            renderForm({play(p1, p2, observer){observer.p1Wins()}})
        })

        it("display 'P1 Wins!'", function () {
            expect(page()).not.toContain("P1 Wins!")
            submitForm()
            expect(page()).toContain("P1 Wins!")
        })
    })


    describe("request processes as p2Wins", function () {
        beforeEach(function () {
            renderForm({play(p1, p2, observer){observer.p2Wins()}})
        })

        it("display 'P2 Wins!'", function () {
            expect(page()).not.toContain("P2 Wins!")
            submitForm()
            expect(page()).toContain("P2 Wins!")
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