'use client';

import $ from "jquery"
import Image from 'next/image'
import Link from 'next/link'

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

export function SpoilerElement({spoiler}){
    return (
        <div className="spoiler">
            <div className="spec-info-block">
                <SpoilerHead spoiler_id={spoiler.id} spoiler_name={spoiler.name}/>
                <div className={"hidden-data-item hb-" + spoiler.id}>
                    <div dangerouslySetInnerHTML={{ __html: spoiler.description }}></div>
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
                        else {
                            return(<></>)
                        }
                    })()}
                </div>
            </div>
        </div>
    )
}

export function SpoilerBlock({block_name, block_description, spoiler_list}){
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