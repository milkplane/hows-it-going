import { Coords, CoordsShift, createShiftedCoords, getNeighboursCoords, stringifyCoords } from "./coords";

export type Tree = {
    coords: Coords;
    parent: Tree | null;
    descendants: Tree[];
}

type MappedInfo<T> = {
    mappedValue: T;
    coords: Coords;
}

type GetValueBasedOnDepth<T> = (depth: number) => T;

type ExpandableAreaChecker = (coords: Coords) => boolean;

export const createTree = (coords: Coords, parent: Tree | null = null): Tree => {
    return {
        coords: coords,
        parent: parent,
        descendants: [],
    }
}

const getDescendantsCoords = (coords: Coords, canExpandTo: ExpandableAreaChecker): Coords[] => {
    return getNeighboursCoords(coords).filter((coords) => canExpandTo(coords));
}

const createDescendants = (tree: Tree, canExpandTo: ExpandableAreaChecker): Tree[] => {
    const ancestorsCoords: Coords[] = getDescendantsCoords(tree.coords, canExpandTo);

    return ancestorsCoords.map((coords) => createTree(coords, tree));
}

export const expandTree = (root: Tree, expandCount: number, canExpandTo: ExpandableAreaChecker = () => true): Tree => {
    const takenCoords: string[] = [stringifyCoords(root.coords)];
    const canExpandAndNotTaken = (coords: Coords) => {
        return canExpandTo(coords) &&
            !takenCoords.includes(stringifyCoords(coords));

    }
    let queue: Tree[] = [root];

    for (let i = 0; i < expandCount && queue.length !== 0; i++) {
        let queueBeforeNextExpand = [...queue];
        queue = [];

        while (queueBeforeNextExpand.length !== 0) {
            const current = queueBeforeNextExpand.shift() as Tree;
            const descendants = createDescendants(current, canExpandAndNotTaken);
            current.descendants = descendants;
            descendants.forEach(descendant => takenCoords.push(stringifyCoords(descendant.coords)));
            queue.push(...descendants);
        }
    }

    return root;
}

export const arrayFromTree = <T>(tree: Tree, getValueBasedOnDepth: GetValueBasedOnDepth<T>, depth = 1): MappedInfo<T>[] => {
    const mappedValue = getValueBasedOnDepth(depth);
    const mappedInfo: MappedInfo<T> = {
        mappedValue,
        coords: tree.coords
    }
    let mappedInfos: MappedInfo<T>[] = [mappedInfo];

    tree.descendants.forEach(descendant => {
        mappedInfos = mappedInfos.concat(arrayFromTree(descendant, getValueBasedOnDepth, depth + 1));
    });

    return mappedInfos;
}

export const getPathToRoot = (tree: Tree) => {
    const stack = [];
    let currentTree: Tree | null = tree;

    while (currentTree !== null) {
        stack.unshift(currentTree.coords);
        currentTree = currentTree.parent;
    }

    return stack[Symbol.iterator]();
}

export const areEqualTree = (tree1: Tree, tree2: Tree) => {
    return tree1.coords.i === tree2.coords.i &&
        tree1.coords.j === tree2.coords.j;
}