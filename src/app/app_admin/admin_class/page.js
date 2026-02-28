import $ from "jquery"

import { getPageTitleTemplate } from "@/lib/ControllerDB/crud";
import { PageLoad } from "@/components/page_part/user_side/common/Load";

import { insertTicketGroup, getTicketMenuGroup } from "@/lib/ControllerDB/Repository/AdminRepository";

import Form from 'next/form'

// export async function insertVal(data) {
//     'use server';

//     var a = await insertTicketGroup(data);
//     console.log(a);
//     return false;
// }

export default function Class(param) {
    const { data } = param;
    const pageTitle = getPageTitleTemplate('admin_class');
    const ticketMenu = getTicketMenuGroup();

    return (
        <div class="row-2">
            <div class="col chapter-title-mobile">{pageTitle[0].name}</div>
            <div class="col">
                <PageLoad page_title={pageTitle[0].name} />
                <div class="row-2">
                    <div class="col">
                        <div class="race-class-data-area">
                            <div class="main-content-block container">
                                <div className="row-2">
                                    <div className="col form-area">
                                        <div className="hide-button-area" hidden>
                                            <button className="hide-button">Hide</button>
                                            <span className="hide-button-name">
                                                Добавление пункта меню
                                            </span>
                                        </div>                                        
                                        <Form action="" className="row-2 form-insert" id="add_group">{/* action={insertVal} */}
                                        <div>
                                            <label htmlFor="group_id" className="col-4">1. Group: </label>
                                            <select name="group_id" id="group_id" className="col-8">
                                                <option value="" className="null-dt">Выберете значение</option>
                                                {ticketMenu.map((element)=>{
                                                    return(
                                                        <option value={element.id} key={element.id}>{element.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="name" className="col-4">2. Name: </label>
                                            <input name="name" id="name" className="col-8"/>
                                        </div>
                                        <div>
                                            <label htmlFor="latin_name" className="col-4">3. latin_name: </label>
                                            <input name="latin_name" id="latin_name" className="col-8"/>
                                        </div>
                                        <div>
                                            <label htmlFor="logo" className="col-4">4. logo: </label>
                                            <input name="logo" id="logo" className="col-8" placeholder="class/"/>
                                        </div>
                                        <div>
                                            <label htmlFor="link" className="col-4">5. link: </label>
                                            <input name="link" id="link" className="col-8" placeholder="/class/"/>
                                        </div>
                                        <hr/>
                                        <div className="submit-button">
                                            <button type="submit">Записать</button>
                                        </div>
                                    </Form>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
