import $ from "jquery"

import { getPageTitleTemplate } from "@/lib/ControllerDB/crud";
import { PageLoad } from "@/components/page_part/user_side/common/Load";

import { insertParam, getParamType, getLastParam } from "@/lib/ControllerDB/Repository/AdminRepository";

import Form from 'next/form'

// export async function insertVal(data) {
//     'use server';

//     var a = await insertParam(data);
//     console.log(a);
//     return false;
// }

export default function Class(param) {
    const { data } = param;
    const pageTitle = getPageTitleTemplate('admin_param');
    const paramType = getParamType();
    const lastParam = getLastParam();

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
                                                Добавление параметра
                                            </span>
                                        </div>                                        
                                        <Form action="" className="row-2 form-insert" id="add_group">{/* action={insertVal} */}
                                            <div>
                                                <label htmlFor="type" className="col-4">1. Тип: </label>
                                                {(()=>{
                                                    if(lastParam[0].id == null){
                                                        return(
                                                            <select name="type" id="type" className="col-8">
                                                                <option value="" className="null-dt">Выберете значение</option>
                                                                {paramType.map((element)=>{
                                                                    return(
                                                                        <option value={element.id} key={element.id}>{element.name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        )
                                                    }
                                                    else {
                                                        return(
                                                            <select name="type" id="type" className="col-8">
                                                                {paramType.map((element)=>{
                                                                    if(element.id == parseInt(lastParam[0].type)) {
                                                                        return(
                                                                            <option value={element.id} key={element.id} selected={true}>{element.name}</option>
                                                                        )
                                                                    } else {
                                                                        return(
                                                                            <option value={element.id} key={element.id}>{element.name}</option>
                                                                        )
                                                                    }                                                                
                                                                })}
                                                            </select>
                                                        )                                                    
                                                    }
                                                })()}
                                                
                                            </div>
                                            <div>
                                                <label htmlFor="name" className="col-4">2. Название: </label>
                                                <input name="name" id="name" className="col-8"/>                                            
                                            </div>
                                            <div>
                                                <label htmlFor="value" className="col-4">3. Значение: </label>
                                                <input name="value" id="value" className="col-8"/>                                            
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
