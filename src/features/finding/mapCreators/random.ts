import SimplexNoise from 'simplex-noise';
import { Cell, CellType, changeCellType, createCell, MAX_BUSH_HEIGHT, MAX_WATER_HEIGHT, MIN_BUSH_HEIGHT } from '../../../common/cell';
import { MapCreator } from '../../../common/map';
import { Size } from '../../../common/size';
import flat from './flat';

const createMoisturedCell = (height: number) => {
    if (height <= MAX_WATER_HEIGHT) {
        return createCell(height, CellType.Water)
    }

    return createCell(height);
}

const createPlantedCell = (unsownCell: Cell) => {
    const chance = Math.random() < 0.5 ? true : false; 
    if (unsownCell.height > MIN_BUSH_HEIGHT && unsownCell.height < MAX_BUSH_HEIGHT && chance) {
        return changeCellType(unsownCell, CellType.Bush);
    }

    return unsownCell;
}

const random: MapCreator = (size: Size) => {
    const simplex = new SimplexNoise();
    const flatMatrix = flat(size);
    const zoom = 7;

    for (let i = 0; i < size.height; i++) {
        for (let j = 0; j < size.width; j++) {
            const cellHeight = simplex.noise2D(i / zoom, j / zoom) + 0.1;
            flatMatrix[i][j] = createPlantedCell(createMoisturedCell(cellHeight));
        }        
    }
    
    return flatMatrix;
}

export default random;