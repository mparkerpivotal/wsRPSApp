function Rps(){
    this.playRound = function(p1Throw, p2Throw, observer){
        new PlayRoundRequest(p1Throw, p2Throw, observer).process()
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer){
    this.process = function(){
        if (isThrowInvalid(p1Throw) || isThrowInvalid(p2Throw))
            observer.invalid()
        else if (isTie())
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

module.exports = {
    Rps
}