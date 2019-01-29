export const SELECTOR_ID_PAGE = 'global';

export const DEFAULT_LOCALE = 'en';
export const LOCAL_STORAGE_ID_KEY = {
    token: 'app-token',
};
export const ROUTE_TREE = {
    dashboard: 'dashboard',
    general: 'general',
    partner: 'partner',
    reservation: 'reservation',
    rooms: 'rooms',
    news: 'news',
    gallery: 'gallery',
    feedback: 'feedback',
    service: 'services',
};
const APP_ROOT_API = '/v1/';
export const API_URL = {
    authApp: {
        login: `${APP_ROOT_API}auth/login`,
        me: `${APP_ROOT_API}auth/me`,
        register: `${APP_ROOT_API}auth/register`,
    },
    dashboardApp: {
        getRooms: `${APP_ROOT_API}rooms`,
        bookRoom: `${APP_ROOT_API}events`,
        getEvents: `${APP_ROOT_API}events?idRoom={idRoom}`,
        getBookedEvents: `${APP_ROOT_API}events/eventsBooked?idRoom={idRoom}&selectedDate={selectedDate}`,
    },
    userApp: {
        getUsers: `${APP_ROOT_API}users`,
    },
    generalApp: {
        getData: `${APP_ROOT_API}general-info`,
    },
    feedbackApp: `${APP_ROOT_API}feedback`,
    galleryApp: `${APP_ROOT_API}gallery`,
    galleryTypes: `${APP_ROOT_API}gallery-category`,
    newsApp: `${APP_ROOT_API}news`,
    newsType: `${APP_ROOT_API}news`,
    partnerApp: `${APP_ROOT_API}partner`,
    reservationApp: `${APP_ROOT_API}reservation`,
    reservationStatus: `${APP_ROOT_API}reservation`,
    clientInfo: `${APP_ROOT_API}reservation`,
    roomApp: `${APP_ROOT_API}rooms`,
    roomAppAvailable: `${APP_ROOT_API}rooms/available`,
    serviceApp: `${APP_ROOT_API}services`,
};
