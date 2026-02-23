import $ from "jquery"

import { getPageTitleTemplate } from "@/lib/ControllerDB/crud";
import { PageLoad } from "@/components/page_part/user_side/common/Load";

import { ArmamentTable } from "@/components/page_part/user_side/admin/controller";

import { getArmamentList } from "@/lib/ControllerDB/Repository/AdminRepository";
import { insertArmament, getParamType, getLastAbilityParam, getParamListByType, getAdditionalParamList, getAdditionalGroupList } from "@/lib/ControllerDB/Repository/AdminRepository";

import Form from 'next/form'

// export async function insertVal(data) {
//     'use server';

//     var a = await insertArmament(data);
//     console.log(a);
//     return false;
// }


export default function Class(param) {
    const { data } = param;
    const pageTitle = getPageTitleTemplate('admin_armament_ab_update');
    // const paramType = getParamType();
    // const checkGroup = getAdditionalGroupList();
    // //const checkList = getAdditionalParamList();

    // for(let i = 0; i < paramType.length; i++){
    //     paramType[i]['last_element'] = getLastAbilityParam(paramType[i].latin_name);//classElement.SpecialSpoilerList[i].id);
    //     paramType[i]['param_list'] = getParamListByType(paramType[i].id);//classElement.SpecialSpoilerList[i].id);
    // } 

    // for(let i = 0; i < checkGroup.length; i++){
    //     checkGroup[i]['checkList'] = getAdditionalParamList(checkGroup[i].id);
    // }

    const aList = getArmamentList();

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
                                                Добавление способности вооружения
                                            </span>
                                        </div>    
                                        <div className="row">
                                            <div className="col-3">
                                                <ArmamentTable list={aList}/>
                                            </div>
                                            <div className="col-auto">

                                            </div>
                                        </div>
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
