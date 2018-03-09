//Get this test to pass

const {Rps, Round} = require("../src/rps")
const FakeRoundRepo = require("./FakeRoundRepo")

//Remember: Make the change easy, then make the easy change

//Step 1: get the history spec passing
//Step 2: get the history AND play round spec passing
//Step 3: implement the frontend for this story
//Step 4: (BONUS): see it work for realz, like in a browser

describe("history", function () {
    let rps

    beforeEach(function () {
        rps = new Rps(new FakeRoundRepo())
    })

    describe("when no one has played", function () {
        it("tells the observer there are no rounds", function () {
            let observer = jasmine.createSpyObj("observer", ["noRounds"])

            rps.getHistory(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        });
    });

    describe("when rounds have been played", function () {
        it('sends the rounds to the observer', function () {
            let playRoundObserver = {invalid(){}, tie(){}, p1Wins(){}, p2Wins(){}}
            let observer = jasmine.createSpyObj("observer", ["rounds"])

            rps.playRound("rock", "sailboat", playRoundObserver)
            rps.playRound("rock", "rock", playRoundObserver)
            rps.playRound("rock", "scissors", playRoundObserver)
            rps.playRound("rock", "paper", playRoundObserver)

            rps.getHistory(observer)

            expect(observer.rounds).toHaveBeenCalledWith([
                new Round("rock", "sailboat", "invalid"),
                new Round("rock", "rock", "tie"),
                new Round("rock", "scissors", "p1Wins"),
                new Round("rock", "paper", "p2Wins"),
            ])
        });
    });
});

