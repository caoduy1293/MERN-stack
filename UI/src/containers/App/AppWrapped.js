import React from "react";
import {Switch} from "react-router-dom";
import NotFoundPage from '../NotFoundPage/Loadable';

import NewsPage from '../NewsApp/Loadable';
import GalleryPage from '../GalleryPage/Loadable';
import RoomApp from '../RoomApp/Loadable';
import ContactPage from '../ContactPage/Loadable';

import FancyRoute from "../../components/FancyRoute";


const rootRoutes = [
    {
        path: '/news',
        component: NewsPage
    },
    {
        path: '/rooms',
        component: RoomApp
    },
    {
        path: '/gallery',
        component: GalleryPage
    },
    {
        path: '/contact',
        component: ContactPage
    },
    {
        path: '',
        component: NotFoundPage
    }
];

class AppWrapped extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        };
    }
    render() {
        return (
            <>
                <div className="mg-page-title parallax" style={{backgroundPosition: '50% -22px'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>Shinee</h2>
                                {/* <p>Slogan của Shinee</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <Switch>
                    {rootRoutes.map((route, i) =>
                        <FancyRoute key={i} {...route} />
                    )}
                </Switch>
            </>
        );
    }
}

export default AppWrapped;
