'use client';

import $ from "jquery"

import Link from 'next/link'

import { Icon } from '@/components/page_part/common/server_side/fontawesome'
import { futer_fix } from "@/components/page_part/common/user_side/Load";

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
        futer_fix();
    });

    return (
        <div className="grid-group-data">   
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
    const func = ((id)=>{
        // блок с цветом логотипа
        if($('#prompt_type_' + id).hasClass('selected-prompt')){
            $('#prompt_type_' + id).toggleClass('selected-prompt');
        }
        else {
            $('.prompt-type span').removeClass('selected-prompt');
            $('#prompt_type_' + id).toggleClass('selected-prompt');
        }                                    
        
        // блок видимости блока описания этого типа
        $('.prompt-description-data div').hide();
        
        if($('#prompt_type_' + id).hasClass('selected-prompt')){
            $('#prompt_description_' + id).show();
        }

        // блок видимости всего блока описания
        if($('.prompt-type span').hasClass('selected-prompt')){
            $('.prompt-description').show();
        }
        else {
            $('.prompt-description').hide();
        }     
    });

    return (
        <div className="row-2">
            <div className="col">
                <div className="prompt-area">
                    <div className="prompt">
                        <div className="prompt-data prompt-type py-1">
                            {promptData.map((element)=>{
                                if(element.filter_name == 'info'){
                                    return(
                                        <span
                                            key={'info_' + element.id} 
                                            id={'prompt_type_' + element.id}
                                            onClick={(()=>{func(element.id)})}
                                        >
                                            {(()=>{
                                                if(element.logo == null){
                                                    if(element.id == 136){
                                                        return(<><span className="components">ВСМВ</span> - Компоненты</>)
                                                    }
                                                    else {
                                                        return(<>{element.name}</>)
                                                    }                                                
                                                }
                                                else {
                                                    return(<><Icon name={element.logo}/> - {element.name}</>)
                                                }
                                            })()}
                                        </span>
                                    )
                                }                                
                            })}
                        </div>
                        <hr/> 
                    </div>
                </div>
            </div>   
            <div className="col">
                <div className="prompt-area">
                    <div className="prompt">
                        <div className="prompt-data prompt-type py-1">
                            {promptData.map((element)=>{
                                if(element.filter_name == 'type'){
                                    return(
                                        <span 
                                            className=""
                                            id={'prompt_type_' + element.id}
                                            key={'type_' + element.id} 
                                            onClick={(()=>{func(element.id)})}
                                        ><Icon name={element.logo}/> - {element.name}</span>
                                    )
                                }                                
                            })}
                        </div>
                        <hr/>
                    </div>
                    <div className="prompt-description" style={{ display: "none"}}>
                        <div className="prompt-description-data row-2">                    
                            {promptData.map((element)=>{
                                return(
                                    <div 
                                        id={'prompt_description_' + element.id}
                                        className="col" 
                                        key={'description_' + element.id} 
                                        dangerouslySetInnerHTML={{ __html: element.description }}
                                    ></div>
                                )
                            })}                    
                        </div>
                        <hr/>
                    </div>
                </div>
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
                        <Link href={element.link + '/' + element.id} className="abilities-info-block">
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
                                    <span className="kind-logo">
                                        {(()=>{
                                            if(element.kind_value == 'ultimate') {
                                                return(<Icon name={'faSquareCaretUp'}/>)
                                            }
                                            else if(element.kind_value == 'ascended') {
                                                return(<Icon name={'faSquareBluesky'}/>)
                                            }
                                            else if(element.kind_value == 'innate') {
                                                return(<Icon name={'faExplosion'}/>)
                                            }
                                        })()}
                                    </span>
                                    <span className="name">{element.ab_name}</span>
                                </div>
                                <div className="col-auto components">
                                    {(()=>{
                                        if(element.is_requirements == true){
                                            return(<><Icon name={'faBookmark'}/>{element.components}</>)
                                        }
                                        else {
                                            return(<>{element.components}</>)
                                        }
                                    })()}
                                    
                                </div>
                            </div>  
                            <hr className="abilities-hr-gradient"/>

                        </Link>
                    </div>
                )
            })}
        </div>
    )
}