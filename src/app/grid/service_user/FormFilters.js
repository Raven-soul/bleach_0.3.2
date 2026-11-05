'use client';

import $ from "jquery"

import Link from 'next/link'
import { Icon } from '@/components/page_part/service_server/fontawesome'
import { futer_fix } from "@/components/page_part/service_user/Load";

export function FormFilters({filters}){
    // const 

    // const ResetFilters = (()=>{        
    //     $(".filter-search-item input").val('');
    //     $(".filter-grid-group-data-item select").prop('selectedIndex', 0); //.val('discard');

    //     usingFilters();
    //     futer_fix();
    // })

    // const CommonSearch = (()=>{
    //     usingFilters();
    //     futer_fix();
    // });

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
                {/* {filter_list.map((element)=>{                
                    return(
                        <div className='filter-grid-group-data-item' key={'filter_' + element.id}>            
                            <div className='col'>
                                <select name={element.name} type={element.item_type} id={element.name + '_selector_id'} onChange={SetFilter} defaultValue={'all'}>
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
                })} */}
                <div className='filter-grid-group-data-item'>
                    <div className='col'>
                        <div //onClick={ResetFilters} 
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
                       //onChange={CommonSearch}
                       >
                </input>
            </div>                                                    
        </div>        
    )
}

function SetFilter (element){
    var selector = '#' + element.target.getAttribute("id");

    if($(selector + ' option:selected').val() == 'discard') {//$().prop('selectedIndex');
        $(element.target).prop('selectedIndex', 0); 
    }

    //     usingFilters();
    //     futer_fix();
    // 
}