'use client';

import $ from "jquery"

import Link from 'next/link'

import { Icon } from '@/components/page_part/common/server_side/fontawesome'
import { futer_fix } from "@/components/page_part/common/user_side/Load";

function usingFilters(){
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

export function ArmamentFilter({filter_list}){
    const filters = ((element)=>{
        var selector = '#' + element.target.getAttribute("id");

        if($(selector + ' option:selected').val() == 'discard') {//$().prop('selectedIndex');
            $(element.target).prop('selectedIndex', 0); 
        }

        usingFilters();
        futer_fix();
    });

    const search = (()=>{
        usingFilters();
        futer_fix();
    });

    return (
        <div className="filter-grid-group">
            <div className="grid-group-data">   
                {filter_list.map((element)=>{                
                    return(
                        <div className='filter-grid-group-data-item' key={'filter_' + element.id}>            
                            <div className='col'>
                                <select name={element.name} type={element.item_type} id={element.name + '_selector_id'} onChange={filters} defaultValue={'all'}>
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
            <div className="filter-search-item">
                <input type="text" 
                       name="username"
                       placeholder="Поиск по названию"
                       onChange={search}>
                </input>
            </div>                                                    
        </div>        
    )
}

export function FiltersPrompt({promptData}){
    const SchowPromptData = ((id)=>{
        if(id == 0){
            $('.prompt-type span').removeClass('selected-prompt');
            $('.prompt-description-data div').hide();
            $('.prompt-description').hide();
        }

        if(!$('.prompt-area-main').hasClass('disable')){

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
        }    
    });

    const SchowPromptArea = (()=>{
        $('.prompt-area-main').toggleClass('disable');
        $('.prompt-button-area').toggle();

        SchowPromptData(0);
    });

    return (
        <div className="row-2">
            <div className="col prompt-area">
                <div className="prompt-area-main disable">
                    <div className="prompt-top-button-area prompt-button-area">
                        <button className="prompt-top-button" onClick={SchowPromptArea}>
                            <Icon name={"faChevronDown"}/>
                        </button>
                    </div>
                    <div className="prompt prompt-follower">
                        <div className="prompt-data prompt-type py-1">
                            {promptData.map((element)=>{
                                if(element.filter_name == 'info'){
                                    return(
                                        <span
                                            key={'info_' + element.id} 
                                            id={'prompt_type_' + element.id}
                                            onClick={(()=>{SchowPromptData(element.id)})}
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
                    </div>
                </div>
                <hr/> 
            </div>   
            <div className="col prompt-area">
                <div className="prompt-area-main disable prompt-follower">
                    <div className="prompt" >
                        <div className="prompt-data prompt-type py-1">
                            {promptData.map((element)=>{
                                if(element.filter_name == 'type'){
                                    return(
                                        <span 
                                            className=""
                                            id={'prompt_type_' + element.id}
                                            key={'type_' + element.id} 
                                            onClick={(()=>{SchowPromptData(element.id)})}
                                        ><Icon name={element.logo}/> - {element.name}</span>
                                    )
                                }                                
                            })}
                        </div>
                    </div>
                </div>
                <hr/> 
            </div> 
            <div className="col prompt-area">
                <div className="prompt-area-main disable prompt-follower">
                    <div className="prompt" >
                        <div className="prompt-data prompt-type py-1">
                            {promptData.map((element)=>{
                                if(element.filter_name == 'hollow'){
                                    return(
                                        <span 
                                            className=""
                                            id={'prompt_type_' + element.id}
                                            key={'type_' + element.id} 
                                            onClick={(()=>{SchowPromptData(element.id)})}
                                        ><Icon name={element.logo}/> - {element.name}</span>
                                    )
                                }                                
                            })}
                        </div>
                    </div>
                </div>
            </div> 
            <div className="col prompt-area">
                <div className="prompt-description" style={{ display: "none"}}>
                    <hr/>
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
                </div>
                <hr/>
            </div> 
            <div className="prompt-bottom-button-area prompt-button-area" style={{display:"none"}}>
                <button className="prompt-bottom-button" onClick={SchowPromptArea}>
                    <Icon name={"faChevronUp"}/>
                </button>
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