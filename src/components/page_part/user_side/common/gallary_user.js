'use client';

import $ from "jquery"
import Image from 'next/image'
import {Icon} from "@/components/page_part/server_side/common/fontawesome"

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
                            var image_main_block = $('.gallery-data-block .image-main-block');
                            
                            image_main_block.html(data);

                            var calc_height;
                            var calc_width;
                            var window_h = ($(window).height()*80) / 100;
                            var window_w = ($(window).width()*80) / 100;
                            var dt;

                            if(image.width > image.height) {
                                calc_width = window_w;
                                calc_height = (window_w * image.height) / image.width;
                                dt = 1;
                            } 
                            else if(image.width < image.height){
                                calc_height = window_h;
                                calc_width = (window_h * image.width)  / image.height;
                                dt = 2;
                            }
                            else {
                                if(window_w > window_h) {
                                    calc_height = window_h;
                                    calc_width = window_h;
                                    
                                    dt = 3;
                                }
                                else {
                                    calc_height = window_w;
                                    calc_width = window_w;

                                    dt = 4;
                                }
                            }

                            //alert(`data ${dt}, (${window_w} * ${image.width}) / ${image.height} = ${calc_width}`);

                            $('.gallery-data-block .image-main-block img').attr('width', `${calc_width} px`);
                            $('.gallery-data-block .image-main-block img').attr('height', `${calc_height} px`);
                            $('.gallery-data-block .image-main-block img').css(`aspect-ratio`,`${image.width} / ${image.height}`)

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

export function CloseButton() {
    return(
        <button className="close-button" onClick={(()=>{
            $('.gallery-data-block').removeClass('active');
        })}>
            <Icon name={'faCircleXmark'} className={'close-icon'}/>
        </button>
    )
}