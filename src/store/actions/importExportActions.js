import {BLOCK_TYPES_LABELS} from "../../types/blockTypes";

export const IMPORT_ACTION_DATA_LOADED = 'IMPORT_ACTION_DATA_LOADED';
export const EXPORT_ACTION_DATA_BUILT = 'EXPORT_ACTION_DATA_BUILT';

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
export function flowImportAction(data) {
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

/**
 *
 */
export function flowExportAction() {
    return (dispatch, getState) => {
        const {flow: {nodes, edges}} = getState();

        const exportFlow = nodes.map((node) => {
            const foundEdge = edges.find((edge) => edge.target === node.id);

            return {
                id: node.id,
                type: node.type,
                text: node.text,
                x: node.x,
                y: node.y,
                parent: foundEdge ? foundEdge.source : '',
                next: "",
            };
        });


        setTimeout(() => {
            dispatch({
                type: EXPORT_ACTION_DATA_BUILT,
                payload: {exportFlow}
            });
        }, 1000);
    };
}