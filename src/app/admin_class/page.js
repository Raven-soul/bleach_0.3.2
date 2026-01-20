import { getPageTitleTemplate } from "@/lib/ControllerDB/crud";
import { PageLoad } from "@/components/page_part/user_side/common/Load";

import { insertTicketType } from "@/lib/ControllerDB/Repository/AdminRepository";

import Form from 'next/form'

// export async function insertVal(data) {
//     'use server';

//     var a = await insertTicketType(data);
//     console.log(a);
//     return false;
// }

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
                                {/* <Form action={insertVal}>                                    
                                    <div>
                                        <label htmlFor="name">Enter your name: </label>
                                        <input name="name" id="name"/>
                                    </div>
                                    <div>
                                        <label htmlFor="discription">Enter your discription: </label>
                                        <input name="discription" id="discription"/>
                                    </div>
                                    <div>
                                        <button type="submit">Submit</button>
                                    </div>
                                </Form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
