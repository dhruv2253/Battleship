const Ship = function(length) {
    let hits = 0;
   
    const hit = function()  {
        // if ship is not sunk
        if (this.isSunk() == false) {

            // add hits 
            this.hits++;
        }   
        
    }

    // check if ship is sunk
    const isSunk = function() {
        
        return this.hits >= this.length;
    }


    return {length, hit, hits, isSunk};

}


export default Ship;