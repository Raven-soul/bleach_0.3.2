'use client';

import $ from "jquery"
import { useEffect } from "react";

export function futer_fix(){
    // прикрепление футера к окончанию страницы
    if( $(document).height() <= $(window).height() ){		
        $(".footer-area").addClass("fixed-bottom");
    } else {
        $(".footer-area").attr('class','footer-area');
    }
}

export function PageLoad({page_title = 'Онлайн-справочник Bleach D&D 5e'}){

    const title_name = (()=>{
        $(".chapter-title-label").html(page_title);
    });

    useEffect(()=>{
        title_name();
        futer_fix();
    },);    

    return(
        <div name="start_load" hidden>data</div>
    )
}