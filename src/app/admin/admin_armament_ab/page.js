import $ from "jquery"

import { getPageTitleTemplate } from "@/lib/ControllerDB/crud";
import { PageLoad } from "@/components/page_part/user_side/common/Load";

import { insertParam, getParamType, getLastAbilityParam, getParamListByType, getAdditionalParamList, getAdditionalGroupList } from "@/lib/ControllerDB/Repository/AdminRepository";

import Form from 'next/form'

// export async function insertVal(data) {
//     'use server';

//     var a = await insertParam(data);
//     console.log(a);
//     return false;
// }


export default function Class(param) {
    const { data } = param;
    const pageTitle = getPageTitleTemplate('admin_armament_ab');
    const paramType = getParamType();
    const checkGroup = getAdditionalGroupList();
    //const checkList = getAdditionalParamList();

    for(let i = 0; i < paramType.length; i++){
        paramType[i]['last_element'] = getLastAbilityParam(paramType[i].latin_name);//classElement.SpecialSpoilerList[i].id);
        paramType[i]['param_list'] = getParamListByType(paramType[i].id);//classElement.SpecialSpoilerList[i].id);
    } 

    for(let i = 0; i < checkGroup.length; i++){
        checkGroup[i]['checkList'] = getAdditionalParamList(checkGroup[i].id);
    }

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
                                        <Form action="" className="row-2 form-insert" id="add_group">{/* action={insertVal} */}
                                            {paramType.map((type)=>{
                                                return(
                                                    <div key={'type_' + type.id}>
                                                        <label htmlFor={type.latin_name} className="col-4">{type.id} {type.name}</label>
                                                        <select name={type.latin_name} id={type.latin_name} className="col-8">
                                                            <option value="" className="null-dt">Выберете значение</option>
                                                            {type.param_list.map((element)=>{
                                                                if(element.id == type.last_element[0].id)
                                                                {
                                                                    return(
                                                                        <option value={element.id} key={'param_' + element.id} selected={true}>{element.name}</option>
                                                                    )
                                                                } else {
                                                                    return(
                                                                        <option value={element.id} key={'param_' + element.id}>{element.name}</option>
                                                                    )
                                                                }                                                                  
                                                            })}
                                                        </select>
                                                    </div> 
                                                )
                                            })}  
                                            <div className="row-2" style={{'margin-top': '10px'}}>
                                                {checkGroup.map((group)=>{
                                                    return(
                                                        <div className="checkbox-area" key={'check_group_' + group.id}>
                                                            <div className="col-3">
                                                                <p>{group.name}</p>
                                                            </div>
                                                            <div className="row" key={'check_' + group.id}>
                                                                {group.checkList.map((element)=>{
                                                                    return(
                                                                        <div className="col-auto check_item" key={'check_list_' + element.id}> 
                                                                            <label htmlFor={element.value}>{element.name}</label>
                                                                            <input type="checkbox" id={element.value} name={element.value}/>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>                                                                                         
                                            <div>
                                                <label htmlFor="name" className="col-4">Название: </label>
                                                <input name="name" id="name" className="col-8"/>                                            
                                            </div>
                                            <div>
                                                <label htmlFor="requirements" className="col-4" style={{'display': 'block'}}>Требования: </label>
                                                <textarea name="requirements" id="requirements" className="requirements"></textarea>                                            
                                            </div>
                                            <div>
                                                <label htmlFor="data" className="col-4" style={{'display': 'block'}}>Контент: </label>
                                                <textarea name="data" id="data" className="data"></textarea>                                           
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
