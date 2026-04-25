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

export function ArmamentAbilitiesList({abilitiesList}){
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