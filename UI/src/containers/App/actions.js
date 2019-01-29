export const SET_START_END_DATE = 'GLOBAL/SET_START_END_DATE';
export function setStartEndDate(dateObj) {
    return {
        type: SET_START_END_DATE,
        dateObj
    };
}
