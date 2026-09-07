'use client';

import $ from "jquery"
import Image from 'next/image'


export function NewsImage({image, height, width, name}){    
    return (
        <div className="news-image-area">
            <Image
                src={require(`@/../public/img/articles/${image}`)}
                alt={name}
                quality={100}
                height={height}
                width={width}
                //style={{height: `50%`, width: `50%`}}
            />
        </div>
    )
}