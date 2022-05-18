import { useAppSelector } from "../../app/hooks";
import { CellColorGetter, CellType, getCellColor, getRoughness } from "../../common/cell";
import { areEqualCoords, createCoords } from "../../common/coords";
import { getCell } from "../../common/map";
import endImage from '../../images/treasure-chest.png'
import startImage from '../../images/person.png'
import styled, { css } from "styled-components";
import { createColor, createGradient, createGradientPoint, stringifyColor } from "../../common/rgb";

type CellCoords = {
    row: number;
    column: number;
}

const Tile = styled.td`
    background-color: ${props => props.color};
    min-width: 50px;
    height: 50px;
    display: inline-flex;
`

const gameObject = css`
    background-size: cover;
    flex: 1;
    margin: 10%;
`

const StartImage = styled.div`
    ${gameObject}
    background-image: url(${startImage});
`

const EndImage = styled.div`
    ${gameObject}
    background-image: url(${endImage});
`

const groundColor = createGradient(
    createGradientPoint(createColor(155, 118, 83), 0),
    createGradientPoint(createColor(255, 253, 234), 0.5),
    createGradientPoint(createColor(126, 113, 107), 0.75),
    createGradientPoint(createColor(246, 245, 243), 1)
)

const waterColor = createGradient(
    createGradientPoint(createColor(155, 118, 83), 0),
    createGradientPoint(createColor(205, 237, 247), 1)
)

const bushColor = createGradient(
    createGradientPoint(createColor(205, 237, 247), 1)
)

const getTypedColor: CellColorGetter = (type: CellType) => {
    if (type === CellType.Bush) return bushColor;
    if (type === CellType.Water) return waterColor;
    return groundColor;
}

const primaryPath = createColor(209, 164, 105);
const primaryVisited = createColor(199, 199, 197);

const MapCell = (props: CellCoords) => {
    const coords = createCoords(props.row, props.column);
    const cell = useAppSelector(state => getCell(state.map.map, coords));
    const roughness = useAppSelector(state => getRoughness(getCell(state.map.map, coords)));
    const type = useAppSelector(state => getCell(state.map.map, coords).type)
    const terrainColor = getCellColor(cell, getTypedColor);
    const start = useAppSelector(state => state.map.start);
    const end = useAppSelector(state => state.map.end);
    return <Tile color={stringifyColor(terrainColor)}>
        {areEqualCoords(coords, start) ? <StartImage /> : null}
        {areEqualCoords(coords, end) ? <EndImage /> : null}
    </Tile>
}

export default MapCell;