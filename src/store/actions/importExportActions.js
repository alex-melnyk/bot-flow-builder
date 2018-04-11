import {BLOCK_TYPES_LABELS} from "../../types/blockTypes";

export const IMPORT_ACTION_DATA_LOADED = 'IMPORT_ACTION_DATA_LOADED';

function convertDataToNodes(data) {
    return data.map((item) => ({
        title: `${BLOCK_TYPES_LABELS[item.type]} (${item.id})`,
        id: item.id,
        type: item.type,
        text: item.text,
        x: item.x,
        y: item.y
    }));
}

function convertDataToEdges(data) {
    return data.reduce((acc, item) => {
        if (item.parent) {
            return [
                ...acc,
                {
                    source: item.parent,
                    target: item.id,
                    type: "emptyEdge"
                }
            ];
        }

        return acc;
    }, []);
}

/**
 *
 * @param data
 */
export function dataLoadedAction(data) {

    const nodes = convertDataToNodes(data);
    const edges = convertDataToEdges(data);

    return {
        type: IMPORT_ACTION_DATA_LOADED,
        payload: {
            nodes,
            edges
        }
    };
}