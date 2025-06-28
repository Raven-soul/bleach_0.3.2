'use client';

import $ from "jquery"
import { useEffect } from "react";

export function FooterContent({sign, comment, comment_wide}){
    useEffect(()=>{
        // прикрепление футера к окончанию страницы
        if( $(document).height() <= $(window).height() ){		
            $(".footer-area").addClass("fixed-bottom");
        } else {
            $(".footer-area").attr('class','footer-area');
        }
    },);

    return(
        <div class="col-auto">
            <div class="row-2">
                <div class="col">
                    <div class="row soul-data-row">
                        <div class="col-auto soul-data d-flex align-items-center">
                            {sign}
                        </div>
                        <div class="col-auto parting-words-col-wide">
                            {comment_wide}
                        </div>
                    </div>
                </div>
                <div class="col parting-words-col">{comment}</div>
            </div>
        </div>
    )
}