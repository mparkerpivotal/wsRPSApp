const ReactDOM = require("react-dom")
const React = require("react")
const ReactTestUtils = require("react-dom/test-utils")
const PlayForm = require("../src/components/PlayForm")

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

    function fillIn(inputName, inputValue) {
        let input
        input = document.querySelector(`[name='${inputName}']`)
        input.value = inputValue
        ReactTestUtils.Simulate.change(input)
    }

    it('sends the user input to the RPS component', function () {
        let playSpy = jasmine.createSpy("playSpy")
        
        renderForm({play: playSpy})

        fillIn("p1Throw", "foo")
        fillIn("p2Throw", "bar")

        submitForm()

        expect(playSpy).toHaveBeenCalledWith("foo", "bar", jasmine.any(Object))
    })

    function renderForm(rpsStub) {
        renderComponent(<PlayForm rps={rpsStub}/>)
    }

    function submitForm(){
        document.querySelector("button").click()
    }
})