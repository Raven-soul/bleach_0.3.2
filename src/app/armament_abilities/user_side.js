'use client';

import $ from "jquery"

import { Icon } from '@/components/page_part/server_side/common/fontawesome'

// function getFilter() {
//     var filter = new Map();
//     var filterTags = $(".filter-grid-group-data-item select");
//     var armamentItems = $(".grid-abilities-data .grid-abilities-item");

//     alert(armamentItems.length);

//     for (var i = 0; i < filterTags.length; i++) {
//         filter.set(filterTags[i].getAttribute("id").split('_')[0], filterTags[i].options[filterTags[i].selectedIndex].value);
//     }

//     return filter;
// }

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
                else if(armament.querySelector('div.' + filter.name).textContent == filter.value) {}
                else {
                    result = false;
                    return;
                }
            }
            else {
                if(filter.value == 'all') {}
                else if(armament.querySelector('div.' + filter.value).textContent == 1) {}
                else {
                    result = false;
                    return;
                }
            }
        });
        
        if(result == true) { 
            armament.style.visibility = "visible"; 
        }
        else {
            armament.style.visibility = "hidden"; 
        }
    }
}

export function ArmamentFilter({filter_list}){
    const func = ((element)=>{
        var selector = '#' + element.target.getAttribute("id");

        if($(selector + ' option:selected').val() == 'discard') {//$().prop('selectedIndex');
            $(element.target).prop('selectedIndex', 0); 
        }

        console.log("------------------------------element");
        console.log(element);
        console.log("------------------------------element");

        getFilterValues();
    });

    return (
        <div className="grid-group-data">   
            {/* {(()=>{console.log(filter_list[2])})()}  */}
            {filter_list.map((element)=>{                
                return(
                    <div className='filter-grid-group-data-item' key={'filter_' + element.id}>            
                        <div className='col'>
                            <select name={element.name} type={element.item_type} id={element.name + '_selector_id'} onChange={func}>
                                <option value='all' disabled selected>{element.translate}</option>
                                {element.content.map((item)=>{
                                    return(
                                        <option value={item.value} armtype={element.item_type} key={'filter_option_' + item.id}>{item.name}</option>
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
                            <div hidden className='type'>{element.type_value}</div>
                            <div hidden className='cost'>{element.cost_value}</div>

                            <div hidden className='hd_lvl'>{element.hd_lvl_value}</div>
                            <div hidden className='kind'>{element.kind_value}</div>
                            <div hidden className='casting_time'>{element.casting_time_value}</div>
                            <div hidden className='range'>{element.range_value}</div>
                            
                            <div hidden className='until_saled'>{element.until_saled}</div>
                            <div hidden className='concentration'>{element.concentration}</div>
                            <div hidden className='minute_1'>{element.minute_1}</div>
                            <div hidden className='minute_2'>{element.minute_2}</div>
                            <div hidden className='minute_5'>{element.minute_5}</div>
                            <div hidden className='minute_10'>{element.minute_10}</div>
                            <div hidden className='round_1'>{element.round_1}</div>
                            <div hidden className='round_2'>{element.round_2}</div>
                            <div hidden className='round_5'>{element.round_5}</div>
                            <div hidden className='instantly'>{element.instantly}</div>
                            <div hidden className='hour'>{element.hour}</div>
                            <div hidden className='day_2'>{element.day_2}</div>
                            <div hidden className='special'>{element.special}</div>

                            <div hidden className='verbal'>{element.verbal}</div>
                            <div hidden className='somatic'>{element.somatic}</div>
                            <div hidden className='material'>{element.material}</div>
                            <div hidden className='released'>{element.released}</div>

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