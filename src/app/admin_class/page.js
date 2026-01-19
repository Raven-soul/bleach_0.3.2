import { getPageTitleTemplate } from "@/lib/ControllerDB/crud";
import { getClassMenuGroupContent, getClassMenuContent } from "@/lib/ControllerDB/Repository/ClassRepository";
import { PageLoad } from "@/components/page_part/user_side/common/Load";

import { PageMenuItem } from "@/components/page_part/user_side/common/buttons"

export default function Class(param) {
    const { data } = param;
    const pageTitle = getPageTitleTemplate('admin_class');

    return (
        <div class="row-2">
            <div class="col chapter-title-mobile">{pageTitle[0].name}</div>
            <div class="col">
                <PageLoad page_title={pageTitle[0].name} />
                <div class="row-2">
                    <div class="col chapter-title-mobile">{pageTitle[0].name}</div>
                    <div class="col">
                        <div class="race-class-data-area">
                            <div class="main-content-block">
                                <form action="" method="get" class="form-example">
                                    <div class="form-example">
                                        <label for="name">Enter your name: </label>
                                        <input type="text" name="name" id="name" required />
                                    </div>
                                    <div class="form-example">
                                        <label for="email">Enter your email: </label>
                                        <input type="email" name="email" id="email" required />
                                    </div>
                                    <div class="form-example">
                                        <input type="submit" value="Subscribe!" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    );
}
