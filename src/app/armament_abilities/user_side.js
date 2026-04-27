'use client';

import $ from "jquery"
import { Icon } from '@/components/page_part/server_side/common/fontawesome'

export function ArmamentFilter({element}){
    const func = (()=>{
        var selector = '#' + element.name + '_selector_id';

        if($(selector + ' option:selected').val() == 'discard') {//$().prop('selectedIndex');
            $(selector).prop('selectedIndex', 0); 
        }
    });

    return (
        <div className='filter-grid-group-data-item'>
            <div className='col'>
                <select name={element.name} id={element.name + '_selector_id'} onChange={func}>
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
                    <div class="grid-abilities-item px-1">
                        <a href="#" class="abilities-info-block">  
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

                            <div class="row abilities-info-block-data">
                                <div class="col left-align-data">                                                                                            
                                    <span class="level">
                                        <span class="gray-font">[</span>{element.cost_name}<span class="gray-font">]</span>
                                    </span>
                                    <span class="school-logo">
                                        <Icon name={element.type_logo}/>
                                    </span>
                                    <span class="name">{element.ab_name}</span>
                                </div>
                                <div class="col-auto components">{element.components}</div>
                            </div>  
                            <hr class="abilities-hr-gradient"/>
                        </a>
                    </div>
                )
            })}
        </div>
    )
}