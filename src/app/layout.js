import "bootstrap/dist/css/bootstrap.min.css";
import "./../components/css/common.css";
import "./../components/css/multiplatform.css";
import {Menu} from "../components/page_part/server_side/index/menu";
import {Footer} from "../components/page_part/server_side/index/footer";

import {Mobile_list_button} from "../components/page_part/user_side/common/buttons.js";
import Image from 'next/image'

import home_logo from "@/../public/img/home/home_button_logo_white.png";
import dnd_su_logo from "@/../public/img/home/dnd_su_logo.png";

export const metadata = {
  title: "Bleach D&D 5e",
  description: "Rules for playing DND in the Bleach universe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body> {/*onload="awake(0)">*/}
         {/* <Onload/> */}
         <div class="main-block">
            <header>
              <div class="stub-header">data</div>
              <div class="header-area">
                  <div class="container">
                      <div class="row-2">
                          <div class="col">
                              <div class="row d-flex justify-content-between">
                                  <div class="col-auto d-flex align-items-center">
                                      <div class="row">
                                          <div class="col-auto p-0 d-flex align-items-center">
                                              <a href="homeLink" class="home-link d-flex align-items-center">
                                                  <Image
                                                    src={home_logo}
                                                    className={"home-link_ico"}
                                                    height={24}
                                                    width={122}
                                                    alt="home"
                                                  />
                                              </a>
                                          </div>
                                          <div class="col-auto chapter-title">
                                              <div class="chapter-title-label">
                                                  Онлайн-справочник Bleach D&D 5e
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col-auto p-0 d-flex align-items-center">
                                      <div class="row">
                                          <div class="col">
                                              <a href="https://dnd.su" class="dnd-su-link">
                                                  <Image
                                                    src={dnd_su_logo}
                                                    className={"dnd-su-ico"}
                                                    width={25}
                                                    height={25}
                                                    alt="dnd su"
                                                  />
                                              </a>
                                          </div>
                                          <div class="col list-button">
                                              <Mobile_list_button/>
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
              <div class="content-area my-2">
                  <div class="container content-container">
                      <div class="row">  
                          <div class="col menu-block-back"></div>                        
                          <Menu/>
                          <div class="col p-0 info-block">
                              <div class="row-2">
                                {children}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </content>
            <Footer/>
         </div>
      </body>
    </html>
  );
}
