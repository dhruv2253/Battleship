const ship = function(length, hits, sunk) {
    const hit = () =>  {
        if (isSunk == false) {
            hits++;
        }
       
        return hits;

    }

    const isSunk = () => {
        if (length == hits) {
            sunk = true;
            
        } else {
            sunk = false;
        }
        return sunk;
    }

    return {length, hit, isSunk};

}


export default ship;