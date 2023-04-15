(()=>{"use strict";const e=function(){let e=function(e){let t=[];for(let e=0;e<7;e++){t[e]=[];for(let a=0;a<7;a++)t[e][a]={ship:null,triedHit:!1}}return t}(),t=[];return{board:e,placeShip:function(a,r,n,o=!1){let s=[a,r];if(!1===o){a+n.length-1>=7&&(s=[7-n.length,r]);let o=s[0],i=s[1];for(let t=0;t<n.length;t++)if(e[o+t][i].ship)return!1;t.push(n);for(let t=0;t<n.length;t++)e[o+t][i].ship=n}else{r+n.length-1>=7&&(s=[a,7-n.length]);let o=s[0],i=s[1];for(let t=0;t<n.length;t++)if(e[o][i+t].ship)return!1;t.push(n);for(let t=0;t<n.length;t++)e[o][i+t].ship=n}return!0},shipsOnBoard:t,receiveAttack:function(e,t){let a=this.board[e][t];return!(!a||a.triedHit||(a.triedHit=!0,null!==a.ship&&a.ship.hit(),0))},allSunk:function(){return t.every((e=>e.isSunk()))}}},t=function(){const t=new e,a=function(e,t){return this.opp.gameboard.receiveAttack(e,t)},r=function(e){return Math.floor(Math.random()*e)},n=new Set,o=function(e=r){let t=e(7),s=e(7);if(!n.has(this.opp.gameboard.board[t][s]))return a.call(this,t,s),n.add(this.opp.gameboard.board[t][s]),[t,s];o.call(this,e)};return{gameboard:t,opp:null,attack:a,aiAttack:o}},a=function(e){return{length:e,hit:function(){0==this.isSunk()&&this.hits++},hits:0,isSunk:function(){return this.hits>=this.length}}},r=document.querySelector(".rotate"),n=document.querySelector(".new-game"),o=document.querySelector(".user-board"),s=document.querySelector(".ai-board"),i=document.querySelector(".status"),l=function(){const e=new t,l=new t;e.opp=l,l.opp=e;let d=e;const c=[a(5),a(4),a(3)];let u=0,h=!1;const g=function(t){let a;a=t==e?document.querySelectorAll(".grid-square"):document.querySelectorAll(".ai-grid-square"),a.forEach((e=>{let a=t.gameboard.board[parseInt(e.dataset.x)][parseInt(e.dataset.y)];null!=a.ship?(e.classList.add("ship"),a.triedHit&&(e.classList.remove("ship"),e.classList.add("damaged"))):a.triedHit&&e.classList.add("miss")}))},p=function(t){i.textContent=t===e?"You won!":"You lost!",document.querySelectorAll(".grid-square").forEach((e=>{e.removeEventListener("mouseover",m),e.removeEventListener("click",f)}))},m=function(t){let a=c[u].length;const r=document.querySelectorAll(".grid-square");let n=parseInt(t.target.dataset.x),o=parseInt(t.target.dataset.y),s=[n,o];if(!1===h){n+a-1>=7&&(s=[7-a,o]);let i=s[0],l=s[1];for(let r=0;r<a;r++)if(e.gameboard.board[i+r][l].ship)return t.target.classList.add("invalid"),void t.target.addEventListener("mouseout",(()=>{t.target.classList.remove("invalid")}));let d=new Set;for(let e=0;e<a;e++)r.forEach((a=>{a.dataset.x===i+e+""&&a.dataset.y===l+""&&(a.classList.add("placeable"),d.add(a)),t.target.addEventListener("mouseout",(()=>{d.forEach((e=>{d.delete(e),e.classList.remove("placeable")}))}))}));return}o+a-1>=7&&(s=[n,7-a]);let i=s[0],l=s[1];for(let r=0;r<a;r++)if(e.gameboard.board[i][l+r].ship)return t.target.classList.add("invalid"),void t.target.addEventListener("mouseout",(()=>{t.target.classList.remove("invalid")}));let d=new Set;for(let e=0;e<a;e++)r.forEach((a=>{a.dataset.x===i+""&&a.dataset.y===l+e+""&&(a.classList.add("placeable"),d.add(a)),t.target.addEventListener("mouseout",(()=>{d.forEach((e=>{d.delete(e),e.classList.remove("placeable")}))}))}))},f=function(t){if(t.target.classList.contains("invalid"))return;let a=c[u];e.gameboard.placeShip(parseInt(t.target.dataset.x),parseInt(t.target.dataset.y),a,h),console.log(u),g(e),console.log(c.length),u++,u+1>c.length?(document.querySelectorAll(".grid-square").forEach((e=>{e.removeEventListener("mouseover",m),e.removeEventListener("click",f)})),r.style.visiblity="hidden",v()):i.textContent=`Place your ${c[u].length} length ship`},v=function(){i.textContent="Strike the enemy!",function(t,a=!0){const r=t.opp,n=r==e?".grid-square":".ai-grid-square";document.querySelectorAll(n).forEach((n=>{n.addEventListener("click",(()=>{if(d===r)return;let o=t.attack(parseInt(n.dataset.x),parseInt(n.dataset.y));o&&null!==r.gameboard.board[parseInt(n.dataset.x)][parseInt(n.dataset.y)].ship?(i.textContent="Ship hit!",r.gameboard.allSunk()&&(i.textContent="You win!",p(e))):i.textContent=o?"Miss!":"Already hit, try again",g(r),!0===o&&(d=r,!0===a&&d!=e&&(l.aiAttack(),g(e),e.gameboard.allSunk()&&(i.textContent="Computer Wins!",p(l)),d=e))}))}))}(e)};return{createUserBoard:function(){for(let t=0;t<e.gameboard.board.length;t++)for(let a=0;a<e.gameboard.board[t].length;a++){const e=document.createElement("div");e.classList.add("grid-square"),e.dataset.x=a,e.dataset.y=t,e.textContent=`${a}, ${t}`,o.appendChild(e)}},createAiBoard:function(){for(let e=0;e<l.gameboard.board.length;e++)for(let t=0;t<l.gameboard.board[e].length;t++){const a=document.createElement("div");a.classList.add("ai-grid-square"),a.dataset.x=t,a.dataset.y=e,a.textContent=`${t}, ${e}`,s.appendChild(a)}},startGame:function(){n.style.visiblity="hidden",r.addEventListener("click",(()=>{h=!h,console.log(h)})),i.textContent=`Place your ${c[u].length} length ship`,function(){const e=new a(3),t=new a(4),r=new a(5);l.gameboard.placeShip(0,0,e),l.gameboard.placeShip(1,4,t),l.gameboard.placeShip(5,0,r,!0),g(l)}(),document.querySelectorAll(".grid-square").forEach((e=>{e.addEventListener("mouseover",m),e.addEventListener("click",f)}))}}}(),d=document.querySelector(".new-game");l.createAiBoard(),l.createUserBoard(),d.addEventListener("click",(()=>{l.startGame()}))})();