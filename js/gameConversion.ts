let CELL_COUNT_X:number = 3;
let CELL_COUNT_Y:number = 3;

class Game{
    neighbourCounter:NeighbourCounter = new NeighbourCounter();

        public startGame() {
            let cells:Array<Array<HTMLInputElement>> = [];

            for(let row:number = 0; row < CELL_COUNT_X; row++) {
                cells.push([]);

                for(let col:number = 0; col < CELL_COUNT_Y; col++) {
                    cells[row][col] = <HTMLInputElement>document.getElementById(row + '_' + col);      
                }
            }
        
            let neighbourCountGrid:Array<Array<number>> = this.neighbourCounter.countNeighbours(cells);

            for(let row:number = 0; row < CELL_COUNT_X; row++) {
                for(let col:number = 0; col < CELL_COUNT_Y; col++) {
                    let neighbourCount:number = neighbourCountGrid[row][col];            
                    let cell:HTMLInputElement = cells[row][col];
                    cell.checked = this.checkForUnderpopulation(neighbourCount, cell);
                    cell.checked = this.checkForOvercrowding(neighbourCount, cell);
                    cell.checked = this.checkForMating(neighbourCount, cell);
                }
            }
        }

        private checkForUnderpopulation(neighbourCount:number, existingCell:HTMLInputElement){
            if(neighbourCount < 2){
                return false;
            }    
            return existingCell.checked;
        }

        private checkForOvercrowding(neighbourCount:number, existingCell:HTMLInputElement){
            if(neighbourCount > 3){
                return false;
            }    
            return existingCell.checked;
        }

        private checkForMating(neighbourCount:number, existingCell:HTMLInputElement){
            if(neighbourCount == 3){
                return true;
            }
            return existingCell.checked;
        }
}
