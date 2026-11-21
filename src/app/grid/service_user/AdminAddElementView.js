'use client';

import $ from "jquery"
import Form from 'next/form'

import { BaseView } from "@/components/page_part/service_user/BasePageView";
import { AddGridValue } from "@/components/page_part/service_server/BaseUpdate"

// базовый шаблон для страниц после layout, 
// то есть общие черты всех страниц сайта, меняется только наполнение
export function PageView({info, paramList, radioList, page_name}){    
    return(
        <BaseView page={AddView(info, paramList, radioList)} page_name={page_name}/>
    );
}

function AddView(info, paramList, radioList){
    return (
        <div className="col">
            <div className="main-brown-data-area">
                <div className="main-content-block container">
                    <div className="row-2">
                        <div className="col form-area">
                            <div className="hide-button-area" hidden>
                                <button className="hide-button">Hide</button>
                                <span className="hide-button-name">
                                    Добавление элемента таблицы
                                </span>
                            </div>                                        
                            <Form action="" className="row-2 form-insert" id="add_group">{/* action={insertVal} */}
                                <div>
                                    <p>Всего элементов: <b>{info.grid_length}</b>, Последнее название: <b>{info.last_name}</b></p>
                                </div>
                                 {paramList.map((param)=>{
                                    return(
                                        <div key={'type_' + param.id}>
                                            <label htmlFor={param.code} className="col-4">{param.row_num} - {param.name}</label>
                                            <select name={param.code} id={param.code} className="col-8">
                                                <option value="" className="null-dt">Выберете значение</option>
                                                {param.content.map((element)=>{
                                                    return(
                                                        <option value={param.item_type + '_' + element.id} key={param.item_type + '_' + element.id}>{element.name}</option>
                                                    )                                                    
                                                })}
                                            </select>
                                        </div>
                                    )
                                })}  
                                <div className="row-2" style={{'margin-top': '10px'}}>
                                    {radioList.map((list)=>{
                                        return(
                                            <div className="checkbox-area" key={'check_group_' + list.id}>
                                                <div className="col-3">
                                                    <p>{list.name}</p>
                                                </div>
                                                <div className="row" key={'check_' + list.id}>
                                                    {list.content.map((element)=>{
                                                        return(
                                                            <div className="col-auto check_item" key={'check_list_' + element.id}> 
                                                                <label htmlFor={list.item_type + '_' + element.id}>{element.name}</label>
                                                                <input type="checkbox" id={list.item_type + '_' + element.id} name={list.item_type + '_' + element.id}/>
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
                                    <label htmlFor="data" className="col-4" style={{'display': 'block'}}>Контент: </label>
                                    <textarea name="data" id="data" className="data"></textarea>                                           
                                </div>
                                <hr/>
                                <div className="submit-button">
                                    <button onClick={(()=>{
                                        let formdata = $('form#add_group').serializeArray();
                                        let postdata = {};

                                        postdata['filters'] = filterBuilder(radioList, formdata) + ',' + filterBuilder(paramList, formdata);

                                        postdata['material_data'] = findElement('material_data', formdata);
                                        postdata['requirements'] = findElement('requirements', formdata);
                                        postdata['name'] = findElement('name', formdata);
                                        postdata['data'] = findElement('data', formdata);

                                        AddGridValue(postdata);
                                    })}>
                                        Добавить
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>                                
                </div>
            </div>
        </div>
    );
}

function filterBuilder(array, formdata){
    let postdata = '';

    array.map((list)=>{
        let stroke = '';
        list.content.map((element)=>{
            let item = formdata.find(function(item) {                 
                return (list.item_type == 'value')? 
                    item.value === (list.item_type + '_' + element.id) : 
                    item.name === (list.item_type + '_' + element.id); });            
            if(item != undefined) {stroke += ((stroke.length > 0)? ',' : '') + element.id;}                                    
        });
        postdata += ((postdata.length > 0)? ',' : '') + '"' + list.code + '":"' + stroke + '"';
    })

    return postdata;
}

function findElement(text, formdata){
    let element = formdata.find(function(item) {                 
        return item.name === text; 
    });
    return (element != undefined)? element.value : '';
}