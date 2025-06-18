import "bootstrap/dist/css/bootstrap.min.css";
import "./../components/css/common.css";
import "./../components/css/multiplatform.css";
import {Menu} from "./../components/page_part/menu";

export const metadata = {
  title: "Bleach D&D 5e",
  description: "Rules for playing DND in the Bleach universe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body> {/*onload="awake(0)">*/}
         <div class="main-block">
            
            <content>
              <div class="content-area my-2">
                  <div class="container content-container">
                      <div class="row">
                          <div clas="col menu-block-back"></div>
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
            <footer>
              <script src="https://kit.fontawesome.com/a98fe6b196.js" crossorigin="anonymous"></script>
            </footer>
         </div>
      </body>
    </html>
  );
}
