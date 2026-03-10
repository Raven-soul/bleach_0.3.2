import "bootstrap/dist/css/bootstrap.min.css";
import "./../components/css/common.css";
import "./../components/css/multiplatform.css";

import {Menu} from "../components/page_part/server_side/index/menu";
import {Footer} from "../components/page_part/server_side/index/footer";
import {GallaryMain} from "../components/page_part/server_side/common/gallary";
import {Mobile_list_button} from "../components/page_part/user_side/common/buttons.js";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

//import {FontAwesome, Jquery} from "../components/page_part/user_side/scripts/header";
import Image from 'next/image'
import Link from 'next/link'

import home_logo from "@/../public/img/home/home_button_logo_white.png";
import dnd_su_logo from "@/../public/img/home/dnd_su_logo.png";

export const metadata = {
  title: "Bleach D&D 5e",
  description: "Rules for playing DND in the Bleach universe",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru" >
            <body> 
                <div className="main-block">
                    <GallaryMain/>
                    <header>
                        <div className="stub-header">data</div>
                        <div className="header-area">
                            <div className="container">
                                <div className="row-2">
                                    <div className="col">
                                        <div className="row d-flex justify-content-between">
                                            <div className="col-auto d-flex align-items-center">
                                                <div className="row">
                                                    <div className="col-auto p-0 d-flex align-items-center">
                                                        <Link href="/" className="home-link d-flex align-items-center">
                                                            <Image
                                                                src={home_logo}
                                                                className={"home-link_ico"}
                                                                height={24}
                                                                width={122}
                                                                alt="home"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="col-auto chapter-title">
                                                        <div className="chapter-title-label">
                                                            Онлайн-справочник Bleach D&D 5e
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto p-0 d-flex align-items-center">
                                                <div className="row">
                                                    <div className="col">
                                                        <a href="https://dnd.su" className="dnd-su-link">
                                                            <Image
                                                                src={dnd_su_logo}
                                                                className={"dnd-su-ico"}
                                                                width={25}
                                                                height={25}
                                                                alt="dnd su"
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="col list-button">
                                                        <Mobile_list_button />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <content>
                        <div className="content-area my-2">
                            <div className="container content-container">
                                <div className="row">
                                    <div className="col menu-block-back"></div>
                                    <Menu />
                                    <div className="col p-0 info-block">
                                        <div className="row-2">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </content>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
