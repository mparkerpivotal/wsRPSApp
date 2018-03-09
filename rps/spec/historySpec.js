//Get this test to pass

const {Rps, Round} = require("../src/rps")

describe("history", function () {
    describe("when no one has played", function () {
        it("tells the observer there are no rounds", function () {
            let observer = jasmine.createSpyObj("observer", ["noRounds"])

            new Rps().getHistory(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        });
    });

    /*
    5 Types of Test Doubles:

    1. Dummy  => Blows up
    2. Stub   => canned return values; READ ONLY
    3. Spy    => interrogatable; WRITE ONLY
    4. Mock   => refactor spies into these
    5. Fake   => behavioral mimic; READ/WRITE

     */

    describe("when rounds have been played", function () {
        it('sends the rounds to the observer', function () {
            let rps = new Rps()
            let playRoundObserver = {invalid(){}}
            let observer = jasmine.createSpyObj("observer", ["rounds"])
            let repo = {
                save(){},
                isEmpty(){},
                getAll(){}
            }

            rps.playRound("rock", "sailboat", playRoundObserver, repo)

            rps.getHistory(observer, repo)

            expect(observer.rounds).toHaveBeenCalledWith([
                new Round("rock", "sailboat", "invalid")
            ])
        });
    });
});

function FakeRoundRepo(){

}

fdescribe("round repo contract", function () {
    describe("when no rounds have been saved", function () {
        it('should be empty', function () {
            let repo = new FakeRoundRepo()

            expect(repo.isEmpty()).toBe(true)
        });
    });

    describe("when rounds have been saved", function () {
        it('should not be empty', function () {

        });

        it("should return all the rounds that have been saved", function () {

        });

    });
});