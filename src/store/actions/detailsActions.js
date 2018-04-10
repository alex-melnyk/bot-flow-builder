export const DETAILS_ACTION_DRAWER_OPEN = 'DETAILS_ACTION_DRAWER_OPEN';
export const DETAILS_ACTION_DRAWER_CLOSE = 'DETAILS_ACTION_DRAWER_CLOSE';

export function drawerOpenAction() {
    return {type: DETAILS_ACTION_DRAWER_OPEN};
}

export function drawerCloseAction() {
    return {type: DETAILS_ACTION_DRAWER_CLOSE};
}