class Ship{
    constructor(length, location){
        this.length = length;
        this.location = location;
        this.hits = 0;
   }

   displayHitCount(){
        return(this.hits);
    }

    hit(){
        this.hits++;
    }

    isSunk(){
        if(this.length <= this.hits){
            return true;
        }
        else{
            return false;
        }
    }
}

class GameBoard{
    constructor(){
        this.attacks = [];
        this.hits = [];
        this.misses = [];
        this.ships = [];
    }

    receiveAttack(coords){
        if(this.attacks.includes(coords)){
            return('Cannot Attack Same Coordinate Twice!!')
        }
        else{
            this.attacks.push(coords);
            var attack = 'miss';
            for(let i = 0; i < this.ships.length; i++){
                if(this.ships[i].location.includes(coords)){
                    attack = 'hit';
                    this.ships[i].hit();
                    this.hits.push(coords);
                    if(this.ships[i].isSunk()){
                        attack = 'destroyed'
                    }
                }
                else{
                    this.misses.push(coords);
                }
            }
            if(this.gameOver()){
                return 'Game Over'
            }
            else{
                return attack;
            }
            
        }
    }

    gameOver(){
        var allSunk = true;
        for(let i = 0; i < this.ships.length; i++){
            if(this.ships[i].isSunk() == false){
                allSunk = false;
            }
        }
        return allSunk;
    }
}

class Player{
    constructor(playerType, gameboard){
        this.playerType = playerType;
        this.gameboard = gameboard;
    }
}



export{Ship, GameBoard, Player};