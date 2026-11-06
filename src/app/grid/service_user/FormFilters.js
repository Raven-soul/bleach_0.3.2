'use client';

import $ from "jquery"

import Link from 'next/link'
import { Icon } from '@/components/page_part/service_server/fontawesome'
import { futer_fix } from "@/components/page_part/service_user/Load";

export function FormFilters({filters}){
    if(filters == null) return(<></>)
    else return (
        <div className="filter-grid-group">
            <div className="grid-group-data"> 
                {filters.map((filter)=>{            
                    return(
                        <div className='filter-grid-group-data-item' key={'filter_' + filter.id}>            
                            <div className='col'>
                                <select name={filter.code} type={filter.item_type} id={filter.code + '_selector_id'} defaultValue={'all'} onChange={SetFilter}>
                                    <option value='all' disabled>{filter.name}</option>
                                    {filter.content.map((item)=>{
                                        return(
                                            <option value={item.id} armtype={filter.item_type} key={'filter_option_' + item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>                                                        
                        </div>
                    )
                })}
                <div className='filter-grid-group-data-item'>
                    <div className='col'>
                        <div onClick={ResetFilters} 
                            className="filter-grid-group-button">
                            <span style={{
                                paddingLeft: "5px",
                                paddingTop: "2px",
                                verticalAlign: "bottom"
                            }}>
                                Очистить фильтры
                            </span>
                            <span className="x-lbl">
                                <Icon name={'faX'}/>
                            </span>
                        </div>
                    </div>
                </div>
            </div> 
            <div className="filter-search-item">
                <input type="text" 
                       name="username"
                       placeholder="Поиск по названию"
                       onChange={CommonSearch}
                       >
                </input>
            </div>                                                    
        </div>        
    )
}

function SetFilter (element){
    var selector = '#' + element.target.getAttribute("id");

    if($(selector + ' option:selected').val() == 'discard') {
        $(element.target).prop('selectedIndex', 0); 
    }

    // FilterSearch();
    futer_fix(); 
}

function ResetFilters (){        
    $(".filter-search-item input").val('');
    $(".filter-grid-group-data-item select").prop('selectedIndex', 0);

    // FilterSearch();
    futer_fix();
}

function CommonSearch (){
    // FilterSearch();
    futer_fix();
}

function FilterSearch(){
    var filterValues = [];

    // беру список активных фильтров, чтобы получить их значения
    var filterTags = $(".filter-grid-group-data-item select");
    var searchTagValue = ($(".filter-search-item input").length > 0)? 
        $(".filter-search-item input").val() :
        null;

    // получаю значения фильтров
    for(var i = 0; i < filterTags.length; i++){
        let filter = filterTags[i];

        filterValues.push({
            name : filter.getAttribute('name'),
            type : filter.getAttribute('type'),
            value : filter.options[filter.selectedIndex].value
        });
    }

    // беру список способностей для фильтрации
    var armamentItems = $(".grid-abilities-data .grid-abilities-item");

    for(var j = 0; j < armamentItems.length; j++){
        var armament = armamentItems[j];
        var result = true;

        filterValues.forEach(filter => {
            if(filter.type == 'value'){
                if(filter.value == 'all') {}
                else if(armament.querySelector('div.' + filter.name).getAttribute('value') == filter.value) {}
                else {
                    result = false;
                    return;
                }
            }
            else {
                var arr = armament.querySelector('div.' + filter.name).getAttribute('value').split(',');

                if(filter.value == 'all') {}
                else if(arr != null && arr.indexOf( filter.value ) != -1) {}
                else {
                    result = false;
                    return;
                }
            }
        });

        // применение поиска (введене с клавиатуры)
        if(searchTagValue != null && searchTagValue != ""){
            var armament_name = armament.querySelector('div.name').getAttribute('value');

            if(!armament_name.toLowerCase().includes(searchTagValue.toLowerCase())){
                result = false;
            }
        }

        if(result == true) { 
            $('#' + armament.getAttribute('id')).show(); 
        }
        else {
            $('#' + armament.getAttribute('id')).hide(); 
        }
    }
}