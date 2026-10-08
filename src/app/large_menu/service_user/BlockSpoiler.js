'use client';

import $ from "jquery"
import { useEffect } from "react";

import { UpdateSpoilerValue } from "@/app/app_admin/service_server/UpdateGeneral"

export function SpoilerHead({spoiler_id, spoiler_name}) {
    const func = (()=>{
        $('#spoiler-'+ spoiler_id).toggleClass('active');
        $('.hb-' + spoiler_id).toggleClass('active');
    });

    return (
        <h1 className="hide-next" id={spoiler_id} onClick={func}>
            {spoiler_name}
        </h1>
    )
}

export function SpoilerFilter({filter}) {
    if(filter.length == 0) {return(<></>)}

    const setFilter = ((spoiler_id, button_id)=>{
        let id_name = '#sp_' + spoiler_id + '_ft_button_' + button_id;

        if($(id_name).hasClass('active')){}
        else {
            $('.filter-button').removeClass('active');
            $(id_name).toggleClass('active');
        }
    });

    return (
        <div className="spoiler-filter">
            <div className="row-2">
                <div className="col filter-header">
                    Сортировка:
                </div>
                <div className="col filter-button-area">
                    {filter.map((button)=>{
                        return(
                            <div key={'spoiler_filter_button_' + button.id} 
                                 id={'sp_' + button.spoiler_id + '_ft_button_' + button.id} 
                                 className={'filter-button ' + button.filter_class} 
                                 onClick={(()=>{setFilter(button.spoiler_id, button.id)})}
                                 > 
                                <span>{button.text}</span>
                            </div>
                        )
                    })}
                </div>
            </div>            
        </div>
    )
}

export function SpoilerElement({spoiler}){
    return (
        <div className="spoiler">
            <div className="spoiler-block">
                <SpoilerHead spoiler_id={spoiler.id} spoiler_name={spoiler.name}/>
                <div className={"hidden-data-item hb-" + spoiler.id}>
                    <div dangerouslySetInnerHTML={{ __html: spoiler.description }}></div>
                    {(()=>{
                        if(spoiler.filter_exist == 1) {
                            return( 
                                <SpoilerFilter filter={spoiler.Filter}/>
                            )
                        }
                        else { return(<></>) }
                    })()}

                    {(()=>{
                        if(spoiler.spoiler_list_exist == 1){
                            return(
                                <>
                                    {spoiler.Content.map((block)=>{
                                        return(
                                            <div className="data-content" key={"spoiler_content_" + block.id}>
                                                {(() => {
                                                    if(block.h5_tag == 1) return(
                                                        <h5>{block.name}</h5>
                                                    )
                                                    else return(
                                                        <h4>{block.name}</h4>
                                                    )
                                                })()}
                                                <p className="level">{block.requirements}</p>
                                                <div className="content_data_block" dangerouslySetInnerHTML={{ __html: block.value }}></div>
                                                <div className="content_data_edit" style={{display: 'none'}}>
                                                    <textarea 
                                                        style={{width: '100%', height: '200px'}} 
                                                        defaultValue={block.value}
                                                        spoiler_id={block.id}
                                                        id={"spoiler-data-textarea-" + block.id}
                                                        ></textarea>
                                                    <div className="col edit-data-submit">                                                        
                                                        <button
                                                            onClick={(()=>{UpdateSpoilerValue($('#spoiler-data-textarea-' + block.id).val(), block.id)})}
                                                        >
                                                            Обновить
                                                        </button>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>
                                        )
                                    })}
                                </>
                            )
                        }
                        else { return(<></>) }
                    })()}
                </div>
            </div>
        </div>
    )
}

export function SpoilerBlock({block_name, block_description, spoiler_list}){
    if(block_name != ''){
        return (
            <div className="spoiler-area">
                <h1>{block_name}</h1>
                <p>{block_description}</p>
                {spoiler_list.map((spoiler)=>{
                    return(
                        <SpoilerElement spoiler={spoiler} key={"spoiler_" + spoiler.id}/>
                    )
                })}
            </div>
        )
    }
    else {
        return (
            <div>
                {spoiler_list.map((spoiler)=>{
                    return(
                        <SpoilerElement spoiler={spoiler} key={"spoiler_" + spoiler.id}/>
                    )
                })}
            </div>
        )
    }    
}