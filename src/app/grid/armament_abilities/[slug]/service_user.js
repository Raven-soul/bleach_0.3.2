'use client';

import $ from "jquery"
import { Icon } from '@/components/page_part/service_server/fontawesome'
import { futer_fix } from "@/components/page_part/service_user/Load";


export function Logo({name}){
    return (
        <span className="armament-data-type">
            <Icon name={name}/>
        </span>
    )
}

export function DataShowButton(){
    const func = (()=>{
        $('.eye-logo').toggle();
        $('.eng-content-data').toggle();
        futer_fix();
    });

    return (
        <button className="show-armament-data-btn" onClick={func}>
            <span className="armament-data-type eye-logo">
                <Icon name="regular_faEye"/>
            </span>
            <span className="armament-data-type eye-logo" style={{'display': 'none'}}>
                <Icon name="regular_faEyeSlash"/>
            </span>
        </button>
    )
}