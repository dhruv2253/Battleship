const ship = function(length) {
    let hits = 0;
   
    const hit = function()  {
        if (this.isSunk() == false) {
            this.hits++;
        }   
        
    }

    const isSunk = function() {
        return this.hits >= this.length;
    }


    return {length, hit, hits, isSunk};

}


export default ship;