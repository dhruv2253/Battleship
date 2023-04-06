const ship = function(length) {
    let hits = 0;
    let sunk = false;
    const hit = function()  {
        if (this.isSunk() == false) {
            this.hits++;
        }   
        
    }

    const isSunk = function() {
        if (length == hits) {
            this.sunk = true;
            
        } else {
            this.sunk = false;
        }
        return this.sunk;
    }


    return {length, hit, hits, sunk, isSunk};

}


export default ship;