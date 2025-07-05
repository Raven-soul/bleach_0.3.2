'use client';

import $ from "jquery"
import { useEffect } from "react";
import { Mobile_list_button_function } from "@/components/page_part/user_side/common/buttons"

export function PageLoad(){
    const futer_fix = (()=>{
        // прикрепление футера к окончанию страницы
        if( $(document).height() <= $(window).height() ){		
            $(".footer-area").addClass("fixed-bottom");
        } else {
            $(".footer-area").attr('class','footer-area');
        }
    });

    const null_mobil_menu = (()=>{
        if($('.menu-block-back').hasClass('active')){
            Mobile_list_button_function();
        }
    });
    
    useEffect(()=>{
        futer_fix();
        null_mobil_menu();
    },);    

    return(
        <div hidden>data</div>
    )
}