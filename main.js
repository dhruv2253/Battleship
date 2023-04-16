(()=>{"use strict";const e=function(){let e=function(e){let t=[];for(let e=0;e<7;e++){t[e]=[];for(let a=0;a<7;a++)t[e][a]={ship:null,triedHit:!1}}return t}(),t=[];return{board:e,placeShip:function(a,r,n,o=!1){let i=[a,r];if(!1===o){a+n.length-1>=7&&(i=[7-n.length,r]);let o=i[0],s=i[1];for(let t=0;t<n.length;t++)if(e[o+t][s].ship)return!1;t.push(n);for(let t=0;t<n.length;t++)e[o+t][s].ship=n}else{r+n.length-1>=7&&(i=[a,7-n.length]);let o=i[0],s=i[1];for(let t=0;t<n.length;t++)if(e[o][s+t].ship)return!1;t.push(n);for(let t=0;t<n.length;t++)e[o][s+t].ship=n}return!0},shipsOnBoard:t,receiveAttack:function(e,t){let a=this.board[e][t];return!(!a||a.triedHit||(a.triedHit=!0,null!==a.ship&&a.ship.hit(),0))},allSunk:function(){return t.every((e=>e.isSunk()))}}},t=function(){const t=new e,a=function(e,t){return this.opp.gameboard.receiveAttack(e,t)},r=function(e){return Math.floor(Math.random()*e)},n=new Set,o=function(e=r){let t=e(7),i=e(7);if(!n.has(this.opp.gameboard.board[t][i]))return a.call(this,t,i),n.add(this.opp.gameboard.board[t][i]),[t,i];o.call(this,e)};return{gameboard:t,opp:null,attack:a,aiAttack:o}},a=function(e){return{length:e,hit:function(){0==this.isSunk()&&this.hits++},hits:0,isSunk:function(){return this.hits>=this.length}}},r=document.querySelector(".rotate"),n=document.querySelector(".user-board"),o=document.querySelector(".ai-board"),i=document.querySelector(".status"),s=function(){const e=new t,s=new t;e.opp=s,s.opp=e;let l=e;const d=[a(5),a(4),a(3)];let c=0,u=!1;const h=function(t){let a;a=t==e?document.querySelectorAll(".grid-square"):document.querySelectorAll(".ai-grid-square"),a.forEach((e=>{let a=t.gameboard.board[parseInt(e.dataset.x)][parseInt(e.dataset.y)];null!=a.ship?(e.classList.add("ship"),a.triedHit&&(e.classList.remove("ship"),e.classList.add("damaged"))):a.triedHit&&e.classList.add("miss")}))},g=function(t){i.textContent=t===e?"You won!":"You lost!",document.querySelectorAll(".grid-square").forEach((e=>{e.removeEventListener("mouseover",p),e.removeEventListener("click",m)}))},p=function(t){let a=d[c].length;const r=document.querySelectorAll(".grid-square");let n=parseInt(t.target.dataset.x),o=parseInt(t.target.dataset.y),i=[n,o];if(!1===u){n+a-1>=7&&(i=[7-a,o]);let s=i[0],l=i[1];for(let r=0;r<a;r++)if(e.gameboard.board[s+r][l].ship)return t.target.classList.add("invalid"),void t.target.addEventListener("mouseout",(()=>{t.target.classList.remove("invalid")}));let d=new Set;for(let e=0;e<a;e++)r.forEach((a=>{a.dataset.x===s+e+""&&a.dataset.y===l+""&&(a.classList.add("placeable"),d.add(a)),t.target.addEventListener("mouseout",(()=>{d.forEach((e=>{d.delete(e),e.classList.remove("placeable")}))}))}));return}o+a-1>=7&&(i=[n,7-a]);let s=i[0],l=i[1];for(let r=0;r<a;r++)if(e.gameboard.board[s][l+r].ship)return t.target.classList.add("invalid"),void t.target.addEventListener("mouseout",(()=>{t.target.classList.remove("invalid")}));let h=new Set;for(let e=0;e<a;e++)r.forEach((a=>{a.dataset.x===s+""&&a.dataset.y===l+e+""&&(a.classList.add("placeable"),h.add(a)),t.target.addEventListener("mouseout",(()=>{h.forEach((e=>{h.delete(e),e.classList.remove("placeable")}))}))}))},m=function(t){if(t.target.classList.contains("invalid"))return;let a=d[c];e.gameboard.placeShip(parseInt(t.target.dataset.x),parseInt(t.target.dataset.y),a,u),h(e),c++,c+1>d.length?(document.querySelectorAll(".grid-square").forEach((e=>{e.removeEventListener("mouseover",p),e.removeEventListener("click",m)})),r.style.visibility="hidden",f()):i.textContent=`Place your ${d[c].length} length ship`},f=function(){i.textContent="Strike the enemy!",function(t,a=!0){const r=t.opp,n=r==e?".grid-square":".ai-grid-square";document.querySelectorAll(n).forEach((n=>{n.addEventListener("click",(()=>{if(l===r)return;let o=t.attack(parseInt(n.dataset.x),parseInt(n.dataset.y));o&&null!==r.gameboard.board[parseInt(n.dataset.x)][parseInt(n.dataset.y)].ship?(i.textContent="Ship hit!",r.gameboard.allSunk()&&(i.textContent="You win!",g(e))):i.textContent=o?"Miss!":"Already hit, try again",h(r),!0===o&&(l=r,!0===a&&l!=e&&(s.aiAttack(),h(e),e.gameboard.allSunk()&&(i.textContent="Computer Wins!",g(s)),l=e))}))}))}(e)};return{createUserBoard:function(){for(let t=0;t<e.gameboard.board.length;t++)for(let a=0;a<e.gameboard.board[t].length;a++){const e=document.createElement("div");e.classList.add("grid-square"),e.dataset.x=a,e.dataset.y=t,n.appendChild(e)}},createAiBoard:function(){for(let e=0;e<s.gameboard.board.length;e++)for(let t=0;t<s.gameboard.board[e].length;t++){const a=document.createElement("div");a.classList.add("ai-grid-square"),a.dataset.x=t,a.dataset.y=e,o.appendChild(a)}},startGame:function(){document.querySelector(".new-game").style.visibility="hidden",r.addEventListener("click",(()=>{u=!u,console.log(u)})),i.textContent=`Place your ${d[c].length} length ship`,function(){const e=new a(3),t=new a(4),r=new a(5);s.gameboard.placeShip(0,0,e),s.gameboard.placeShip(1,4,t),s.gameboard.placeShip(5,0,r,!0),h(s)}(),document.querySelectorAll(".grid-square").forEach((e=>{e.addEventListener("mouseover",p),e.addEventListener("click",m)}))}}}(),l=document.querySelector(".new-game");s.createAiBoard(),s.createUserBoard(),l.addEventListener("click",(()=>{s.startGame()}))})();