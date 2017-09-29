'user strict'
var CELL_COUNT_X = 3;
var CELL_COUNT_Y = 3;

function Game() {

    var neighbourCounter = new NeighbourCounter();
    
    return {
        startGame: function() {
            var cells = []
            for(var row = 0; row < CELL_COUNT_X; row++) {
                cells.push([]);
                for(var col = 0; col < CELL_COUNT_Y; col++) {
                    cells[row][col] = document.getElementById(row + '_' + col);      
                }
            }
        
            var neighbourCountGrid = neighbourCounter.countNeighbours(cells);

            for(var row = 0; row < CELL_COUNT_X; row++) {
                for(var col = 0; col < CELL_COUNT_Y; col++) {
                    var neighbourCount = neighbourCountGrid[row][col];            
                    var cell = cells[row][col];
                    cell.checked = checkForUnderpopulation(neighbourCount, cell);
                    cell.checked = checkForOvercrowding(neighbourCount, cell);
                    cell.checked = checkForMating(neighbourCount, cell);
                }
            }
        }
    }

    function checkForUnderpopulation(neighbourCount, existingCell){
        if(neighbourCount < 2){
            return false;
        }    
        return existingCell.checked;
    }
    
    function checkForOvercrowding(neighbourCount, existingCell){
        if(neighbourCount > 3){
            return false;
        }    
        return existingCell.checked;
    }
    
    function checkForMating(neighbourCount, existingCell){
        if(neighbourCount == 3){
            return true;
        }
        return existingCell.checked;
    }
}

