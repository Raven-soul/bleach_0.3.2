'use client';

import $ from "jquery"
import { useEffect } from "react";

import { UpdateSpoilerValue } from "@/app/app_admin/service_server/UpdateGeneral"

export function SpoilerHead({spoiler_id, spoiler_name}) {
    const func = (()=>{
        $('#hidden-block-' + spoiler_id).toggleClass('active');
    });

    return (
        <h1 className="spoiler-name" onClick={func}>
            {spoiler_name}
        </h1>
    )
}

export function SpoilerElement({spoiler}){
    return (
        <div className="spoiler" id={'spoiler-' + spoiler.id}>
            <div className="spoiler-block">
                <SpoilerHead spoiler_id={spoiler.id} spoiler_name={spoiler.name}/>
                <div className={"spoiler-hidden-block"} id={"hidden-block-" + spoiler.id}>
                    <div dangerouslySetInnerHTML={{ __html: spoiler.description }}></div>
                    {(()=>{
                        if(spoiler.filter_exist == 1) {
                            return( 
                                <SpoilerFilter filter_list={spoiler.Filter}/>
                            )
                        }
                        else { return(<></>) }
                    })()}

                    {(()=>{
                        if(spoiler.spoiler_list_exist == 1){
                            return(
                                <div className={'spoiler-data-block'}>
                                    {spoiler.Content.map((block)=>{
                                        return(
                                            <div className="data-content" 
                                                name={block.name}
                                                level={block.level}
                                                key={"spoiler_content_" + block.id}>
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
                                </div>
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

export function SpoilerFilter({filter_list}) {
    if(filter_list.length == 0) {return(<></>)}

    const setFilter = ((spoiler_id, item_id, filter_name)=>{
        let id_name = '#sp_' + spoiler_id + '_ft_button_' + item_id;
        let filter_is_active = false;

        if($(id_name).hasClass('active')){ filter_is_active = true}
        else {
            $('.filter-button').removeClass('active');
            $(id_name).toggleClass('active');
        }

        if (filter_is_active == false) {
            let spoiler_content_list = $('#spoiler-' + spoiler_id + ' .data-content');

            let content_list = [];
            for(let i=0; i<spoiler_content_list.length; i++){
                content_list.push(
                    {
                        id: i,
                        name: spoiler_content_list[i].getAttribute('name'),
                        level: (!spoiler_content_list[i].getAttribute('level'))? 0 : parseInt(spoiler_content_list[i].getAttribute('level'), 10),
                        html: spoiler_content_list[i].outerHTML
                    }
                )
            }

            let result = [];
            let result_str = '';

            switch (filter_name) {
                case 'level':
                    result = content_list.sort((a, b) => a.level - b.level);
                    break;
                case 'alfavit':
                    result = content_list.sort((a, b) => a.name.localeCompare(b.name));
                    break;
            }

            for(let i = 0; i<result.length; i++){
                result_str += result[i].html;
            }
            
            $('#spoiler-' + spoiler_id + ' .spoiler-data-block').html(result_str);
        }
    });

    return (
        <div className="spoiler-filter">
            <div className="row-2">
                <div className="col filter-header">
                    Сортировка:
                </div>
                <div className="col filter-button-area">
                    {filter_list.map((filter)=>{
                        return(
                            <div key={'spoiler_filter_button_' + filter.id} 
                                 id={'sp_' + filter.spoiler_id + '_ft_button_' + filter.id} 
                                 className={'filter-button ' + filter.filter_class} 
                                 onClick={(()=>{setFilter(filter.spoiler_id, filter.id, filter.name)})}
                                 name={filter.name}
                                 level={filter.level}
                                 > 
                                <span>{filter.text}</span>
                            </div>
                        )
                    })}
                </div>
            </div>            
        </div>
    )
}