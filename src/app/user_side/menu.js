'use client';

import $ from "jquery"
import Link from 'next/link'

import { Icon } from '@/components/page_part/common/server_side/fontawesome'


export function Menu_stroke_link({link, logo, show, name, key}){    
    var check_strike = (()=>{
        if(show == 1) return (name)
        else return(<strike>{name}</strike>)
    });

    const func = (()=>{
        if($('.menu-block-back').hasClass('active')){
            Mobile_list_button_function();
        }
    });

    return (
        <li key={key}>
            <Link href={link} className="w-100 p-0" onClick={func}>
                <div className="row m-0">
                    <div className="col-1 p-0 image-data">
                        <Icon name={logo}/>
                    </div>
                    <div className="col content-data strike_line">
                        {check_strike()}
                    </div>
                </div>
            </Link>
        </li>
    )
}

export function ChevronМenuButton ({selection_id, selection_name, chevrone, hide_section}) {
    let hideTagClassName = "." + hide_section + "-" + selection_id;
    let chevronClassName_s = "." + chevrone + "-" + selection_id + "-show";
    let chevronClassName_h = "." + chevrone + "-" + selection_id + "-hide";

    const func = (()=>{
        if ( $(hideTagClassName).css("display") == "none" ){
            $(hideTagClassName).css("display","block");
            $(chevronClassName_s).css("display","block");
            $(chevronClassName_h).css("display","none");
        } else {
            $(hideTagClassName).css("display","none");
            $(chevronClassName_s).css("display","none");
            $(chevronClassName_h).css("display","block");
        }
    });

    return (
        <button id={selection_id} className="col w-100 px-3 menu-block-section-name-button" onClick={func}>
            <div className="row d-flex justify-content-between">
                <div className="col label">
                    {selection_name}
                </div>
                <div className={"col-auto d-flex align-items-center"}>
                    <div className={chevrone + "-" + selection_id + "-show"}><Icon name={'faChevronDown'}/></div>
                    <div className={chevrone + "-" + selection_id + "-hide"} style={{display: "none"}}><Icon name={'faChevronLeft'}/></div>
                </div>
            </div>
        </button>
    )
}

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