import {
    GET_ROOMS, GOT_ROOMS, GET_PARTNERS, GOT_PARTNERS,
    GET_SERVICES, GOT_SERVICES
} from './constants';

export function getRooms() {
    return {
        type: GET_ROOMS
    };
}
export function gotRooms(data) {
    return {
        type: GOT_ROOMS,
        data
    };
}

export function getPartners() {
    return {
        type: GET_PARTNERS
    };
}
export function gotPartners(data) {
    return {
        type: GOT_PARTNERS,
        data
    };
}

export function getServices() {
    return {
        type: GET_SERVICES
    };
}
export function gotServices(data) {
    return {
        type: GOT_SERVICES,
        data
    };
}
