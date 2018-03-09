function Rps(){
    this.playRound = function(p1Throw, p2Throw, observer, repo){
        new PlayRoundRequest(p1Throw, p2Throw, observer, repo).process()
    }

    this.getHistory = function(observer, repo){
        if (repo.isEmpty())
            observer.noRounds()
        else
            observer.rounds(repo.getAll())
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer, repo){
    this.process = function(){
        if (isThrowInvalid(p1Throw) || isThrowInvalid(p2Throw)) {
            repo.save(new Round(p1Throw, p2Throw, "invalid"))
            observer.invalid()
        } else if (isTie())
            observer.tie()
        else if (p1Wins())
            observer.p1Wins()
        else
            observer.p2Wins()
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
}

function Round(p1Throw, p2Throw, result){
    this.p1Throw = p1Throw
    this.p2Throw = p2Throw
    this.result = result
}

module.exports = {
    Rps, Round
}