'use client';

import $ from "jquery"
import { Icon } from '@/components/page_part/service_server/fontawesome'
import { futer_fix } from "@/components/page_part/service_user/Load";

export function DataShowButton(){
    const func = (()=>{
        $('.spoiler_data').toggle();
        $('.spoiler_edit').toggle();
        futer_fix();
    });

    return (
        <button className="show-armament-data-btn" onClick={func}>
            <span className="spoiler_data armament-data-type pencil-logo">
                <Icon name="solid_faPenToSquare"/>
            </span>
            <span className="spoiler_edit armament-data-type pencil-logo" style={{display: 'none'}}>
                <Icon name="regular_faPenToSquare"/>
            </span>
        </button>
    )
}