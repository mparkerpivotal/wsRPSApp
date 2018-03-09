const {Round} = require("../src/rps")

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

module.exports = roundRepoContract