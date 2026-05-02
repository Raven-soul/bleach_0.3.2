'use client';

import $ from "jquery"

import { Icon } from '@/components/page_part/server_side/common/fontawesome'

function getFilterValues(){
    var filterValues = [];
    // беру список активных фильтров, чтобы получить их значения
    var filterTags = $(".filter-grid-group-data-item select");
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
        if(result == true) { 
            $('#' + armament.getAttribute('id')).show(); 
        }
        else {
            $('#' + armament.getAttribute('id')).hide(); 
        }
    }
}

export function ArmamentFilter({filter_list}){
    const func = ((element)=>{
        var selector = '#' + element.target.getAttribute("id");

        if($(selector + ' option:selected').val() == 'discard') {//$().prop('selectedIndex');
            $(element.target).prop('selectedIndex', 0); 
        }

        getFilterValues();
    });

    return (
        <div className="grid-group-data">   
            {/* {(()=>{console.log(filter_list[2])})()}  */}
            {filter_list.map((element)=>{                
                return(
                    <div className='filter-grid-group-data-item' key={'filter_' + element.id}>            
                        <div className='col'>
                            <select name={element.name} type={element.item_type} id={element.name + '_selector_id'} onChange={func} defaultValue={'all'}>
                                <option value='all' disabled>{element.translate}</option>
                                {element.content.map((item)=>{
                                    return(
                                        <option value={item.id} armtype={element.item_type} key={'filter_option_' + item.id}>{item.name}</option>
                                    )
                                })}                        
                            </select>
                        </div>                                                        
                    </div>
                )
            })}
        </div>
    )
}

export function FiltersPrompt({promptData}){
    return (
        <div className="prompt-area">
            <div className="prompt">
                <div className="prompt-data prompt-type">
                    {promptData.map((element)=>{
                        return(
                            <span key={'type_' + element.id}><Icon name={element.logo}/> - {element.name}</span>
                        )
                    })}
                </div>
                <hr/>
            </div>
        </div>
    )
}

export function ArmamentAbilitiesGridList({abilitiesList}){
    return (
        <div className="grid-abilities-data">
            {abilitiesList.map((element)=>{
                return(
                    <div className="grid-abilities-item px-1" id={'armament_ability_' + element.id} key={'armament_ability_key_' + element.id}>
                        <a href="#" className="abilities-info-block">  
                            {element.param_list.map(param =>{
                                return(
                                    <div hidden className={param.name} value={param.value} key={'key_' + param.name + '_' + param.value}></div>
                                )
                            })}

                            <div className="row abilities-info-block-data">
                                <div className="col left-align-data">                                                                                            
                                    <span className="level">
                                        <span className="gray-font">[</span>{element.cost_name}<span className="gray-font">]</span>
                                    </span>
                                    <span className="school-logo">
                                        <Icon name={element.type_logo}/>
                                    </span>
                                    <span className="name">{element.ab_name}</span>
                                </div>
                                <div className="col-auto components">{element.components}</div>
                            </div>  
                            <hr className="abilities-hr-gradient"/>
                        </a>
                    </div>
                )
            })}
        </div>
    )
}