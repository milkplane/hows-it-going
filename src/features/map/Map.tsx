import { useEffect } from "react";
import { MouseEvent } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { areEqualCoords, Coords, createCoords } from "../../common/coords";
import { useGameObjectDrag, useTool } from "./hooks";
import MapRow from "./MapRow";
import { endChanged, startChanged } from "./mapSlice";

const Map = (props: any) => {
    const height = useAppSelector(state => state.map.size.height);
    const [hoveredCell, setHoveredCell] = useState<Coords>(createCoords(3, 3));
    const handleToolPressed = useTool(hoveredCell);
    const start = useAppSelector(state => state.map.start);
    const end = useAppSelector(state => state.map.end);
    const handleStartPressed = useGameObjectDrag(start, hoveredCell, startChanged);
    const handleEngChanging = useGameObjectDrag(end, hoveredCell, endChanged);

    const onMapPressed = (event: MouseEvent<HTMLTableSectionElement>) => {
        if (areEqualCoords(hoveredCell, start)) {
            handleStartPressed(event);
        } else if (areEqualCoords(hoveredCell, end)) {
            handleEngChanging(event);
        } else {
            handleToolPressed(event);
        }
    }

    const rows = [];

    for (let i = 0; i < height; i++) {
        rows.push(<MapRow key={i} row={i} onCellChanged={setHoveredCell} />)
    }

    return <table>
        <tbody onMouseDown={onMapPressed}>
            {rows}
        </tbody>
    </table>
}

export default Map;