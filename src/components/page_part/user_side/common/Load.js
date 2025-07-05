'use client';

import $ from "jquery"
import { useEffect } from "react";

export function PageLoad(){
    const futer_fix = (()=>{
        // прикрепление футера к окончанию страницы
        if( $(document).height() <= $(window).height() ){		
            $(".footer-area").addClass("fixed-bottom");
        } else {
            $(".footer-area").attr('class','footer-area');
        }
    });

    useEffect(()=>{
        futer_fix();
    },);    

    return(
        <div name="start_load" hidden>data</div>
    )
}