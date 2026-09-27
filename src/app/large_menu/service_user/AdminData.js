'use client';

import $ from "jquery"
import { Icon } from '@/components/page_part/service_server/fontawesome'
import { futer_fix } from "@/components/page_part/service_user/Load";

import { UpdateTicketContentValue } from "@/app/app_admin/service_server/UpdateGeneral"

export function DataShowButton(){
    const func = (()=>{
        $('.content_data_block').toggle();
        $('.content_data_edit').toggle();
        futer_fix();
    });

    return (
        <button className="show-armament-data-btn" onClick={func}>
            <span className="content_data_block armament-data-type pencil-logo">
                <Icon name="solid_faPenToSquare"/>
            </span>
            <span className="content_data_edit armament-data-type pencil-logo" style={{display: 'none'}}>
                <Icon name="regular_faPenToSquare"/>
            </span>
        </button>
    )
}

export function TicketElementContentBlock(data_block) {
    let block = data_block.data_block;
    
    return (
        <>
            <div className="content_data_block" dangerouslySetInnerHTML={{ __html: block.value }}></div>
            <div className="content_data_edit" style={{display: 'none'}}>
                <textarea 
                    style={{width: '100%', height: '200px'}} 
                    defaultValue={block.value}
                    spoiler_id={block.id}
                    id={"content-data-textarea-" + block.id}
                    ></textarea>
                <div className="col edit-data-submit">                                                        
                    <button
                        onClick={(()=>{UpdateTicketContentValue($('#content-data-textarea-' + block.id).val(), block.id)})}
                    >
                        Обновить
                    </button>
                </div>
            </div>
        </>
    )
}