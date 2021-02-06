export function randomNumber() {

    var num = (Math.floor(Math.random() * 9000) + 1000).toString();
    var output = Array.from(String(num), Number);

    if (hasDuplicates(output)) {
        return randomNumber();
    }
    return output;
    
    
}

export function hasDuplicates(arr) {
    return new Set(arr).size !== arr.length;
}

function numberOfBullsAndCows(guess, secret) {
    var bullsAndCows= [0, 0];
    for (let i = 0; i < secret.length; i++) {
        if (guess.includes(secret[i])) {
            if (guess[i] == secret[i]) {
                bullsAndCows[0]++;
            }
            else {
                bullsAndCows[1]++;
            }
        }
    }
    return bullsAndCows;
}

function numberOfCows(guess, secret) {
    return 0;
}

export function bullsAndCows(guesses, secret) {
    let output = "";
    
    for (var i = 0; i < guesses.length; i++) {
        var bc = numberOfBullsAndCows(guesses[i], secret);
        output = output 
        + guesses[i] + " " 
        + bc[0] + "B "
        + bc[1] + "C "
        + "\n";
    }

    return output;
}

export function gameWon(guesses, secret) {

    if (guesses.length == 0) {
        return false
    }

    var g = Array.from(guesses[guesses.length - 1], Number);

    for (var i = 0; i < g.length; ++i) {
        if (g[i] !== secret[i]) return false;
      }
      return true;

}