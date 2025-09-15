'use client';

import $ from "jquery"
import Image from 'next/image'
import { useEffect, useState } from "react";
import {Icon} from "@/components/page_part/server_side/common/fontawesome"

export function GetGallaryItem({list}){
    return(
        <div class="image-gallery-data-set">
            {(()=>{
                let area_w = () => { return getAreaWidth($(window).width()) }; 
                let area_width = area_w();
                let row_gallary = [];
                let row_element_list = [];
                let preview_width = 0;

                let index = 0;
                const common_h_new = 200;
                
                for(let i = 0; i<list.length; i++){
                    var img_w = (list[i]['width'] * common_h_new)/list[i]['height'];                    

                    if((preview_width + img_w + 5) > area_width){
                        index++;

                        let row_data = {
                            row_width_200: preview_width,
                            list: row_element_list,
                            is_last: false
                        }

                        row_gallary.push(row_data); 

                        row_element_list = [];
                        preview_width = 0;

                        preview_width = preview_width + img_w + 5;
                        row_element_list.push(list[i]);

                    }
                    else if((i + 1) == list.length){
                        index++;

                        preview_width = preview_width + img_w + 5;
                        row_element_list.push(list[i]);

                        let row_data = {
                            row_width_200: preview_width,
                            list: row_element_list,
                            is_last: true
                        }

                        row_gallary.push(row_data);
                    }
                    else {
                        preview_width = preview_width + img_w + 5;
                        row_element_list.push(list[i]);
                        
                    }

                    // console.log('---------');
                    // console.log('index = ' + index);
                    // console.log('img_name = ' + list[i].name);

                    // console.log('preview_width + img_w + 5 = ' + (preview_width + img_w + 5));
                    // console.log('preview_width = ' + preview_width);
                    // console.log('img_w = ' + img_w);
                    // console.log('area_width = ' + area_width);                   
                    // console.log('(i + 1) == list.length = ' + ((i + 1) == list.length));                   
                    // console.log('index = ' + index);                   
                    // console.log('row_gallary.is_last = ' + row_gallary[0].is_last);                   
                    // console.log('row_gallary.list = ' + row_gallary[0].list);                   

                }

                for(var i = 0; i<row_gallary.length;i++){
                    var row = row_gallary[i];

                    var start_width, end_width, start_height, end_height;

                    if(row.is_last == false) {
                        start_width = row.row_width_200;
                        end_width = area_width;

                        start_height = common_h_new;
                        end_height = (start_height * end_width) / start_width;

                        row_gallary[i]['end_height'] = end_height;
                    }
                    else{
                        row_gallary[i]['end_height'] = 200;
                    }

                    // console.log(
                    //     ' ---------------- row_gallary = ' + row_gallary[i].row_width_200 
                    //     + ', window = ' + area_width 
                    //     + ', old_h = 200, new_h = ' + row_gallary[i].end_height
                    // );

                    /*
                        row_gallary: {
                            row_width_200: preview_width, -- ширина изображения при высоте 200px
                            list: row_element_list,       -- список картинок в строке
                            is_last: false,               -- заключающие элементы в строке

                            end_height: 200,              -- итоговая высота строки, чтобы изображения были по размеру страницы
                            converted_height: 75          -- итоговая высота строки при учете, что 200px = 75pt для image
                        }
                    */
                }
                
                return(
                    <div className="image-set">
                        {row_gallary.map((row)=>{
                            return(
                                <div className="image-set-row my-2">
                                    {row.list.map((image)=>{
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

                                                        if(calc_height > window_h) {
                                                            calc_height = window_h;
                                                            calc_width = (window_h * image.width)  / image.height;
                                                        }
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
                                                    $('.gallery-data-block .image-main-block img').css(`aspect-ratio`,`${image.width} / ${image.height}`);
                                                    $('.gallery-data-block').addClass('active');
                                                })}
                                            >
                                                <Image
                                                    src={require(`@/../public/img/archive/${image.img_path}`)}
                                                    height={row.end_height}
                                                    width={((image.width * row.end_height) / image.height)}
                                                    alt={image.name}
                                                    quality={100}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )
            })()}            
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

function getAreaWidth(window_w){
    let result;

    if(window_w >= 1400){ 
        result = 1040; 
    }
    else if(window_w >= 1200){ 
        result = 860;
    }
    else if(window_w >= 1000){ 
        result = 680;
    }
    else if(window_w >= 770){ 
        result = 720;
    }
    else { 
        result = 540;
    }

    return result;
}