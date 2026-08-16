import $ from "jquery"

import { getPageTitleTemplate } from "@/lib/ControllerDB/crud";
import { PageLoad } from "@/components/page_part/common/user_side/Load";

import { ArmamentTable, FormLoad } from "./user_side";

import { getArmamentList } from "@/lib/ControllerDB/Repository/AdminRepository";
import { insertArmament, getParamType, getParamListByType, getAdditionalParamList, getAdditionalGroupList } from "@/lib/ControllerDB/Repository/AdminRepository";

import Form from 'next/form'

// export async function update(data) {
//     'use server';

//     var a = await insertArmament(data);
//     console.log(a);
//     return false;
// }

export default function Class(param) {
    const { data } = param;

    const aList = getArmamentList();
    const pageTitle = getPageTitleTemplate('admin_armament_ab_update');
    const paramType = getParamType();
    const checkGroup = getAdditionalGroupList();
    
    for(let i = 0; i < paramType.length; i++){
        paramType[i]['param_list'] = getParamListByType(paramType[i].id);
    } 
    for(let i = 0; i < checkGroup.length; i++){
        checkGroup[i]['checkList'] = getAdditionalParamList(checkGroup[i].id);
    }

    

    return (
        <div className="row-2">
            <FormLoad id_element={"submit_button"}/>
            <div className="col chapter-title-mobile">{pageTitle[0].name}</div>
            <div className="col">
                <PageLoad page_title={pageTitle[0].name} />
                <div className="row-2">
                    <div className="col">
                        <div className="race-class-data-area">
                            <div className="main-content-block container">
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
                                            <div className="col-9">
                                                <Form action="" className="row-2 form-insert" id="add_group">{/* action={update} */}
                                                    <div>
                                                        <input name="armament_id" id="armament_id" hidden/>
                                                        <input name="additional_id" id="additional_id" hidden/>
                                                    </div>
                                                    {paramType.map((type)=>{
                                                        return(
                                                            <div key={'type_' + type.id}>
                                                                <label htmlFor={type.latin_name} className="col-4">{type.ord} - {type.name}</label>
                                                                <select name={type.latin_name} id={type.latin_name} className="col-8">
                                                                    <option value="" className="null-dt">Выберете значение</option>
                                                                    {type.param_list.map((element)=>{
                                                                        return(
                                                                            <option value={element.id} key={'param_' + element.id}>{element.name}</option>
                                                                        )                                                                
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
                                                                                    <label htmlFor={'checkbox_' + element.id}>{element.name}</label>
                                                                                    <input type="checkbox" id={'checkbox_' + element.id} name={element.value} className="checkbox_element"/>
                                                                                </div>
                                                                            )                                                                     
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="material_data" className="col-4">Материалы: </label>
                                                        <input name="material_data" id="material_data" className="col-8"/>                                            
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
                                                        <label htmlFor="translate" className="col-4" style={{'display': 'block'}}>Контент перевод: </label>
                                                        <textarea name="translate" id="translate" className="translate"></textarea>                                           
                                                    </div>
                                                    <div>
                                                        <label htmlFor="material_data" className="col-4">id способности: </label>
                                                        <input name="armament_id_lbl" id="armament_id_lbl" className="col-8" readOnly/>  
                                                    </div>
                                                    <div>
                                                        <label htmlFor="data" className="col-4" style={{'display': 'block'}}>Контент: </label>
                                                        <textarea name="data" id="data" className="data"></textarea>                                           
                                                    </div>
                                                    <hr/>
                                                    <div className="submit-button">
                                                        <button type="submit" id={"submit_button"}>Обновить</button>
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
            </div>
        </div>
    );
}
