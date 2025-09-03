'use client';

import $ from "jquery"
import Image from 'next/image'

export function GetGallaryItem({list}){
    const common_h = 75;

    for(let i = 0; i<list.length; i++){
        list[i]['size'] = {
            height: common_h,
            width: (list[i]['width'] * common_h)/list[i]['height']
        }
    }

    return(
        <div class="image-gallery-data-set">
            {list.map((image)=>{
                return(
                    <div id={'image_' + image.id} key={'image_' + image.id} class="image-data" 
                         onClick={(()=>{
                            var data = $('#image_' + image.id).html();
                            $('.gallery-data-block .image-block').html(data);
                            $('.gallery-data-block .image-block img').attr('width', image.width);
                            $('.gallery-data-block .image-block img').attr('height', image.height);

                            $('.gallery-data-block').addClass('active');
                         })}>
                        <Image
                            src={require(`@/../public/img/archive/${image.img_path}`)}
                            height={image.size.height}
                            width={image.size.width}
                            alt={image.name}
                            quality={100}
                        />
                    </div>
                )
            })}
        </div>
        
    )
}