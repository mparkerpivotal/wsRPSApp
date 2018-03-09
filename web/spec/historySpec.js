const ReactDOM = require("react-dom")
const React = require("react")
const ReactTestUtils = require("react-dom/test-utils")
const History = require("../src/components/History")
const {Round} = require("rps")

describe("history", function () {
    describe("request processes as noRounds", function () {
        beforeEach(function () {
            rpsStub = {getHistory(observer) {observer.noRounds()}}
        })

        it("display 'NO ONE HAS PLAYED. BOO!'", function () {
            renderHistory(rpsStub)
            expect(page()).toContain("NO ONE HAS PLAYED. BOO!")
        })
    })
    
    describe("request returns rounds", function () {
        beforeEach(function () {
            rpsStub = {getHistory(observer) {observer.rounds([new Round("foo", "bar", "baz")])}}
        })

        it("displays the rounds", function () {
            renderHistory(rpsStub)

            expect(page()).toContain("foo")
            expect(page()).toContain("bar")
            expect(page()).toContain("baz")
        })
    })

    let rpsStub

    function renderHistory(rpsStub) {
        renderComponent(<History rps={rpsStub}/>)
    }
})