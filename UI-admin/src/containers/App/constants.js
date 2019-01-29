export const SELECTOR_ID_PAGE = 'global';

export const DEFAULT_LOCALE = 'en';
export const LOCAL_STORAGE_ID_KEY = {
    token: 'app-token',
};
export const ROUTE_TREE = {
    dashboard: 'dashboard',
    dashboardTitle: 'dashboard',
    general: 'general',
    generalTitle: 'general',
    partner: 'partner',
    partnerTitle: 'partner',
    reservation: 'reservation',
    reservationTitle: 'reservation',
    reservationDetails: 'details',
    reservationDetailsTitle: 'details',
    reservationAdd: 'add',
    reservationAddTitle: 'add',
    rooms: 'rooms',
    roomsTitle: 'rooms',
    roomDetails: 'details',
    roomDetailsTitle: 'details',
    roomsAdd: 'add',
    roomsAddTitle: 'add',
    news: 'news',
    newsTitle: 'news',
    newsDetails: 'details',
    newsDetailsTitle: 'details',
    newsAdd: 'add',
    newsAddTitle: 'add',
    gallery: 'gallery',
    galleryTitle: 'gallery',
    feedback: 'feedback',
    feedbackTitle: 'feedback',
    service: 'services',
    serviceTitle: 'services',
    login: 'login'
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
    // generalApp: {
    //     getData: `${APP_ROOT_API}general-info`,
    // },
    feedbackApp: `${APP_ROOT_API}feedback`,
    galleryApp: `${APP_ROOT_API}gallery`,
    galleryTypes: `${APP_ROOT_API}gallery-category`,
    newsApp: `${APP_ROOT_API}news`,
    newsType: `${APP_ROOT_API}news-category`,
    partnerApp: `${APP_ROOT_API}partner`,
    reservationApp: `${APP_ROOT_API}reservation`,
    reservationAppMarkReleased: `${APP_ROOT_API}reservation/mark-released`,
    reservationAppPending: `${APP_ROOT_API}reservation/pending`,
    clientInfo: `${APP_ROOT_API}reservation`,
    roomApp: `${APP_ROOT_API}rooms`,
    roomAppAvailable: `${APP_ROOT_API}rooms/available`,
    serviceApp: `${APP_ROOT_API}services`,
};
