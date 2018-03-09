//Get this test to pass

const {Rps, Round} = require("../src/rps")

//Remember: Make the change easy, then make the easy change

//Step 1: get the history spec passing
//Step 2: get the history AND play round spec passing
//Step 3: implement the frontend for this story
//Step 4: (BONUS): see it work for realz, like in a browser

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

    fdescribe("when rounds have been played", function () {
        it('sends the rounds to the observer', function () {
            let rps = new Rps()
            let playRoundObserver = {invalid(){}}
            let observer = jasmine.createSpyObj("observer", ["rounds"])
            let repo = new FakeRoundRepo()

            rps.playRound("rock", "sailboat", playRoundObserver, repo)

            rps.getHistory(observer, repo)

            expect(observer.rounds).toHaveBeenCalledWith([
                new Round("rock", "sailboat", "invalid")
            ])
        });
    });
});

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

function roundRepoContract(repoClass){
    describe("round repo contract", function () {
        let repo

        beforeEach(function () {
            repo = new repoClass()
        })

        describe("when no rounds have been saved", function () {
            it('should be empty', function () {
                expect(repo.isEmpty()).toBe(true)
            })
        })

        describe("when rounds have been saved", function () {
            let round

            beforeEach(function () {
                round = new Round("foo", "bar", "baz")
                repo.save(round)
            })

            it('should not be empty', function () {
                expect(repo.isEmpty()).toBe(false)
            })

            it("should return all the rounds that have been saved", function () {
                expect(repo.getAll()).toEqual([round])
            })

        })
    })
}

roundRepoContract(FakeRoundRepo)