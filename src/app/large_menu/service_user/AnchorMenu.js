'use client';

import $ from "jquery"
import Image from 'next/image'
import Link from 'next/link'

export function AnchorMenu({elements}){
    return(
        <div className="anchor-menu">
            {elements.map((block)=>{
                if(block.type_name == 'common_block'){   
                    return(
                        <a href={'#data_content_' + block.id} key={'anchor_' + block.id} className='anchor'>{block.name}</a>
                    )
                }
            })}
        </div>
    )
}