'use client';

import $ from "jquery"
import { useEffect } from "react";

export function FooterContent({sign, comment, comment_wide}){
    useEffect(()=>{},);

    return(
        <div className="col-auto">
            <div className="row-2">
                <div className="col">
                    <div className="row soul-data-row">
                        <div className="col-auto soul-data d-flex align-items-center">
                            {sign}
                        </div>
                        <div className="col-auto parting-words-col-wide">
                            {comment_wide}
                        </div>
                    </div>
                </div>
                <div className="col parting-words-col">{comment}</div>
            </div>
        </div>
    )
}