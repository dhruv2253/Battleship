(()=>{"use strict";const e=function(){let e=function(e){let t=[];for(let e=0;e<7;e++){t[e]=[];for(let r=0;r<7;r++)t[e][r]={ship:null,triedHit:!1}}return t}(),t=[];return{board:e,placeShip:function(r,n,o,a=!1){let l=[r,n];if(!1===a){r+o.length-1>=7&&(l=[7-o.length,n]);let a=l[0],i=l[1];for(let t=0;t<o.length;t++)if(e[a+t][i].ship)return!1;t.push(o);for(let t=0;t<o.length;t++)e[a+t][i].ship=o}else{n+o.length-1>=7&&(l=[r,7-o.length]);let a=l[0],i=l[1];for(let t=0;t<o.length;t++)if(e[i+t][a].ship)return!1;t.push(o);for(let t=0;t<o.length;t++)e[i+t][a].ship=o}return!0},shipsOnBoard:t,receiveAttack:function(e,t){let r=this.board[e][t];return!(!r||r.triedHit||(r.triedHit=!0,null!==r.ship&&r.ship.hit(),0))},allSunk:function(){return t.every((e=>e.isSunk()))}}},t=function(){const t=new e,r=function(e,t){return this.opp.gameboard.receiveAttack(e,t)},n=function(e){return Math.floor(Math.random()*e)},o=new Set,a=function(e=n){let t=e(7),l=e(7);if(!o.has(this.opp.gameboard.board[t][l]))return r.call(this,t,l),o.add(this.opp.gameboard.board[t][l]),[t,l];a.call(this,e)};return{gameboard:t,opp:null,attack:r,aiAttack:a}},r=(document.querySelector(".rotate"),document.querySelector(".new-game"),document.querySelector(".user-board"));document.querySelector(".ai-board"),document.querySelector(".status"),function(){const e=new t,n=new t;return e.opp=n,n.opp=e,{createUserBoard:function(){for(let t=0;t<e.gameboard.board.length;t++)for(let n=0;n<e.gameboard.board[t].length;n++){const e=document.createElement("div");r.classList.add("grid-square"),e.dataset.x=n,e.dataset.y=t,r.append(e)}}}}().createUserBoard()})();