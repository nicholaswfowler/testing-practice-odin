import { Ship, GameBoard, Player } from './index.js';

const content = document.querySelector("#container");

function createGrid(length, total){
    total += Number(length);
    length++;
    let x = ['A','B','C','D','E','F','G','H','I','J'];
    let y = 1;
    let xTracker = 0;

    for(let i = 1; i <= total; i++){
        const div = document.createElement("div");
        div.setAttribute('style', `border: 1px solid black; height: ${500/length}px; width: ${500/length}px;`) 
        div.id = `${x[xTracker - 1]}${y - 1}`;
        div.textContent = `${x[xTracker - 1]}${y - 1}`;
        if(i % length == 1){
            xTracker++;
        }
        if(y == 11){
            y = 1;
        }
        else{
            y++;
        }
        content.appendChild(div);
    }

    const endChild = document.querySelectorAll(`#container>div:nth-child(${length}n + 1)`);
    endChild.forEach((value)=> {
        value.setAttribute('style', 'width: 100%; height: 0px; border: 0;');
        value.id = '';
        value.textContent = '';
    });
}

function showShips(location){
    for(var i = 0; i < location.length; i++){
        document.getElementById(`${location[i]}`).style.backgroundColor='green';
    }
}

const newGame = document.querySelector(".new-game-btn");
newGame.addEventListener("click", ()=>{
    document.querySelectorAll('div').forEach((value) => value.style.backgroundColor = 'white');
    const player = new Player('human', new GameBoard());
    const cpu = new Player('cpu', new GameBoard());
    for(let i = 1; i < 6; i++){
        var start = prompt(`Starting Coordinates of Ship ${i}`).toUpperCase();
        var end = prompt(`Ending Coordinates of Ship ${i}`).toUpperCase();
        if(start[0] != end[0] && start[1] != end[1]){
            start = prompt(`SHIPS MUST BE IN A STRAIGHT LINE!! Please Re-Enter Starting Coordinates of Ship ${i}`).toUpperCase();
            end = prompt(`SHIPS MUST BE IN A STRAIGHT LINE!! Please Re-Enter Ending Coordinates of Ship ${i}`).toUpperCase();
        }
        const playerShip = shipCoords(start, end);
        const cpuShip = getCpuShips();
        player.gameboard.ships.push(new Ship(playerShip.length,playerShip));
        showShips(playerShip);
        cpu.gameboard.ships.push(new Ship(cpuShip.length, cpuShip));
    }
})

function shipCoords(start, end){
    var coords = [start];
    if(start[0] > end[0]){
        let currCoord = String.fromCharCode(start.charCodeAt(0) - 1);
        while(currCoord != end[0]){
            coords.push(`${currCoord}${start[1]}`.toUpperCase());
            currCoord = String.fromCharCode(currCoord.charCodeAt(0) - 1)
        }
        coords.push(end.toUpperCase());
        return(coords);
    }
    else if(start[0] < end[0]){
        let currCoord = String.fromCharCode(start.charCodeAt(0) + 1);
        while(currCoord != end[0]){
            coords.push(`${currCoord}${start[1]}`.toUpperCase());
            currCoord = String.fromCharCode(currCoord.charCodeAt(0) + 1)
        }
        coords.push(end.toUpperCase());
        return(coords);
    }
    else if(start[0] == end[0]){
        if(start[1] > end[1]){
            let currCoord = start[1] - 1;
            while(currCoord != end[1]){
                coords.push(`${start[0]}${currCoord}`.toUpperCase());
                currCoord = currCoord- 1;
            }
            coords.push(end.toUpperCase());
            return(coords);
        }
        
        else if(start[1] < end[1]){
            let currCoord = Number(start[1]) + 1;
            while(currCoord != end[1]){
                coords.push(`${start[0]}${currCoord}`.toUpperCase());
                currCoord = currCoord + 1;
            }
            coords.push(end.toUpperCase());
            return(coords);
        }
    }
}

function getCpuShips(){
    const range = 10;
    const a = String.fromCharCode(0|Math.random()*range+97)
    const b = 0|(Math.random() * (11 - 1) + 1);
    const vertOrHoriz = Math.round(Math.random());
    var xy;
    // if horiz
    if(vertOrHoriz == 0){
        xy = 0|(Math.random() * (11 - 1) + 1);
        while(xy == b){
            xy = 0|(Math.random() * (11 - 1) + 1);
        }
        xy = `${a}${xy}`;
    }
    // else vert
    else{
        xy = String.fromCharCode(0|Math.random()*range+97)
        while(xy == a){
            xy = String.fromCharCode(0|Math.random()*range+97)
        }
        xy = `${xy}${b}`;
    }
    return shipCoords(`${a}${b}`, xy);
}

createGrid(10, 100);
