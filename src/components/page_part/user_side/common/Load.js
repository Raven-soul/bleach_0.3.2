'use client';

import $ from "jquery"
import { useEffect } from "react";

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export function PageLoad({page_title = 'Онлайн-справочник Bleach D&D 5e'}){

    const title_name = (()=>{
        $(".chapter-title-label").html(page_title);
    });

    const futer_fix = (()=>{
        // прикрепление футера к окончанию страницы
        if( $(document).height() <= $(window).height() ){		
            $(".footer-area").addClass("fixed-bottom");
        } else {
            $(".footer-area").attr('class','footer-area');
        }
    });

    useEffect(()=>{
        title_name();
        futer_fix();
    },);    

    return(
        <div name="start_load" hidden>data</div>
    )
}