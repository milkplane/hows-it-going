import { areEqualCoords, Coords, stringifyCoords } from "../../../common/coords";
import { isInMap, MapData } from "../../../common/map";
import { areEqualTree, createTree, expandTree, getPathToRoot, Tree } from "../../../common/tree";
import { HeuristicFunction, SearchConfigurator, SearchResult, WeightGetter } from "../findingSlice";
import matrixFinder from "./findingFeatures/matrixFinder";
import prioritized from "./findingFeatures/prioritized";

type MappedCoords = {
    [key: string]: number;
}

const getPathfinder: SearchConfigurator = (getHeuristic: HeuristicFunction, getWeight: WeightGetter) => {
    return function (map: MapData, start: Coords, end: Coords): SearchResult {
        const checked: Coords[] = [];
        let path: Coords[] = [];
        const { markAsTaken, isAlreadyTaken } = matrixFinder(map);
        const { addToQueue, isInQueue, isQueueEmpty, extractHighestPriority, updatePriority } = prioritized<Tree>(areEqualTree);
        const canExpandTo = (coords: Coords) => isInMap(coords, map) && !isAlreadyTaken(coords);
        const pathLengths: MappedCoords = {};

        const root = createTree(start);
        pathLengths[stringifyCoords(root.coords)] = 0;
        addToQueue(root, 0);

        while (!isQueueEmpty()) {
            const current = extractHighestPriority();

            if (areEqualCoords(current?.coords, end)) {
                checked.push(current?.coords);
                path = Array.from(getPathToRoot(current));
                return [
                    checked,
                    path,
                ];
            }

            markAsTaken(current?.coords);

            for (let descendant of expandTree(current, 1, canExpandTo).descendants) {
                const pathLength = pathLengths[stringifyCoords(current.coords)] + getWeight(map, descendant.coords) + 1;

                if (isInQueue(descendant) && pathLength >= pathLengths[stringifyCoords(descendant.coords)]) continue;

                pathLengths[stringifyCoords(descendant.coords)] = pathLength;
                const heuristic = getHeuristic(descendant.coords, end);
                const priority = pathLength + heuristic;

                if (isInQueue(descendant)) {
                    updatePriority(descendant, priority);
                } else {
                    addToQueue(descendant, priority);
                }
            }

            checked.push(current.coords);
        }

        return [
            checked,
            path
        ];
    }
}

export default getPathfinder;