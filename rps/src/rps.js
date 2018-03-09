function Rps(repo){
    this.playRound = function(p1Throw, p2Throw, observer){
        new PlayRoundRequest(p1Throw, p2Throw, observer, repo).process()
    }

    this.getHistory = function(observer){
        if (repo.isEmpty())
            observer.noRounds()
        else
            observer.rounds(repo.getAll())
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer, repo){
    this.process = function(){
        if (isThrowInvalid(p1Throw) || isThrowInvalid(p2Throw))
            processAs("invalid")
        else if (isTie())
            processAs("tie")
        else if (p1Wins())
            processAs("p1Wins")
        else
            processAs("p2Wins")
    }

    function isThrowInvalid(theThrow) {
        return !["rock", "paper", "scissors"].includes(theThrow);
    }

    function isTie() {
        return p1Throw === p2Throw;
    }

    function p1Wins() {
        return p1Throw === "rock" && p2Throw === "scissors" || p1Throw === "scissors" && p2Throw === "paper" || p1Throw === "paper" && p2Throw === "rock";
    }

    function processAs(result) {
        repo.save(new Round(p1Throw, p2Throw, result))
        observer[result]()
    }
}

function Round(p1Throw, p2Throw, result){
    this.p1Throw = p1Throw
    this.p2Throw = p2Throw
    this.result = result
}

module.exports = {
    Rps, Round
}