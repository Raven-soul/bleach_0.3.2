import { getFooterTemplate } from "@/lib/ControllerDB/crud"
import { FooterContent } from "@/components/page_part/user_side/index/footer"

export async function Footer() {
    const footerTemplate = getFooterTemplate();

    let sign = footerTemplate[1].value;
    let comment = footerTemplate[2].value;
    let comment_wide = footerTemplate[3].value;

    return (
        <footer suppressHydrationWarning>
          <div class="footer-area">
            <div class="container">
              <div class="row-2 d-flex justify-content-center">
                <FooterContent sign={sign} comment={comment} comment_wide={comment_wide}/>                      
              </div>
            </div>
          </div>
        </footer>
    )    
}