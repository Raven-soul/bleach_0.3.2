'use client';

import $ from "jquery"
import Image from 'next/image'


export function AboutImage({image, height, width, name}){    
    return (
        <div className="news-image-area">
            <Image
                src={require(`@/../public/img/about/${image}`)}
                alt={name}
                quality={100}
                height={height}
                width={width}
                style={{maxWidth: `100%`, height:'auto', borderRadius: '5px'}}
            />
        </div>
    )
}