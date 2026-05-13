'use client';

import $ from "jquery"
import Image from 'next/image'
import { useEffect, useState } from "react";
import {Icon} from "@/components/page_part/common/server_side/fontawesome"

export function GetGallaryItem({list}){

    return(
        <div className="image-gallery-data-set">
            {(()=>{
                const window_w = useWindowSize().width - 15;
                const area_width = getAreaWidth(window_w);
                
                let row_gallary = [];
                let row_element_list = [];
                let preview_width = 0;

                let index = 0;
                const common_h_new = 200;

                //console.log('----------------------------------------');
                
                for(let i = 0; i<list.length; i++){
                    var img_w = (list[i]['width'] * common_h_new)/list[i]['height'];                    

                    if((preview_width + img_w + 5) > area_width){
                        // Сноска полной строки по ширене экрана!!
                        // записывает изображение сверх строки на следующую

                        // console.log('---------------------');
                        // console.log('image_name = ' + list[i].name);
                        // console.log('margin = ' + list[i].margin_left);
                        // console.log('width + img = ' + (preview_width + img_w));
                        // console.log('width = ' + preview_width);
                        // console.log('area_width = ' + area_width);
                        // console.log('index = ' + i);
                        // console.log('type row');

                        let row_data = {
                            row_width_200: preview_width,
                            list: row_element_list,
                            is_last: false,
                            id: index
                        }

                        row_gallary.push(row_data); 

                        row_element_list = [];
                        preview_width = 0;

                        list[i]['margin_left'] = 0;

                        preview_width = preview_width + img_w + list[i].margin_left;
                        row_element_list.push(list[i]);

                        if((i + 1) == list.length){
                            index++;

                            let row_data = {
                                row_width_200: preview_width,
                                list: row_element_list,
                                is_last: true,
                                id: index
                            }

                            row_gallary.push(row_data);
                        }

                        index++;

                    }
                    else if((i + 1) == list.length){
                        // Ловец, принимает и выводит незавершенную строку изображений. длина строки не обязательно должна быть по размеру экрана!

                        // console.log('---------------------');
                        // console.log('image_name = ' + list[i].name);
                        // console.log('margin = ' + list[i].margin_left);
                        // console.log('width + img = ' + (preview_width + img_w));
                        // console.log('width = ' + preview_width);
                        // console.log('area_width = ' + area_width);
                        // console.log('index = ' + i);
                        // console.log('type last');

                        if(row_element_list.length == 0){
                            list[i]['margin_left'] = 0;
                        }
                        else {
                            list[i]['margin_left'] = 5;
                        }
                        

                        preview_width = preview_width + img_w + list[i].margin_left;
                        row_element_list.push(list[i]);

                        let row_data = {
                            row_width_200: preview_width,
                            list: row_element_list,
                            is_last: true,
                            id: index
                        }

                        row_gallary.push(row_data);
                    }
                    else {
                        // Наполнитель, наполняет строку изображениями, по очереди

                        if(i != 0){
                            list[i]['margin_left'] = 5;
                        }
                        else {
                            list[i]['margin_left'] = 0;
                        }                        
                        
                        // console.log('---------------------');
                        // console.log('image_name = ' + list[i].name);
                        // console.log('margin = ' + list[i].margin_left);
                        // console.log('width + img = ' + (preview_width + img_w));
                        // console.log('width = ' + preview_width);
                        // console.log('area_width = ' + area_width);
                        // console.log('index = ' + i);
                        // console.log('type just');

                        preview_width = preview_width + img_w + list[i].margin_left;
                        row_element_list.push(list[i]);
                    }
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

                        row_gallary[i]['area_percent'] = (100 * end_height) / area_width; 
                            //получаю процентное соотношение к принятой ширине экрана -- результат h%
                        row_gallary[i]['window_percent'] = (row_gallary[i].area_percent * window_w) / area_width; 
                            //получаю процентное соотношение к реальной ширине экрана -- результат h%
                    }
                    else{
                        row_gallary[i]['end_height'] = 200;

                        row_gallary[i]['area_percent'] = (100 * row_gallary[i].end_height) / area_width; 
                            //получаю процентное соотношение к принятой ширине экрана -- результат h%
                        row_gallary[i]['window_percent'] = (row_gallary[i].area_percent * window_w) / area_width; 
                            //получаю процентное соотношение к реальной ширине экрана -- результат h%
                    }

                    /*
                        row_gallary: {
                            row_width_200: preview_width, -- ширина изображения при высоте 200px
                            list: row_element_list,       -- список картинок в строке
                            is_last: false,               -- заключающие элементы в строке

                            end_height: 200,              -- итоговая высота строки, чтобы изображения были по размеру страницы

                            area_percent:                 -- процентное соотношение к принятой ширине экрана
                            window_percent:               -- процентное соотношение к реальной ширине экрана
                        }
                    */
                }
                
                return(
                    <div className="image-set">
                        {row_gallary.map((row)=>{
                            return(
                                <div className="image-set-row my-1" key={'image_set_row_' + row.id}>
                                    {row.list.map((image)=>{
                                        return(
                                            <div id={'image_' + image.id} key={'image_' + image.id} className="image-data" 
                                                style={{marginLeft: `${image.margin_left}px`}}
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

                                                        if(calc_width > window_w) {
                                                            calc_width = window_w;
                                                            calc_height = (window_w * image.height) / image.width;
                                                        }

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
                                                    $('.gallery-data-block .image-main-block img').css({width: ''});
                                                    $('.gallery-data-block .image-main-block img').css({height: ''});
                                                    $('.gallery-data-block').addClass('active');
                                                })}
                                            >
                                                {(()=>{
                                                    if(area_width < 540) {
                                                        
                                                        return(
                                                            <Image
                                                                src={require(`@/../public/img/archive/${image.img_path}`)}
                                                                height={0}//{row.end_height}
                                                                width={0}//{((image.width * row.end_height) / image.height)}
                                                                alt={image.name}
                                                                quality={100}
                                                                style={{height: `${row.window_percent}%`, width: `${((row.window_percent * image.width) / image.height)}%`}}
                                                            />
                                                        )
                                                    }
                                                    else {
                                                        return(
                                                            <Image
                                                                src={require(`@/../public/img/archive/${image.img_path}`)}
                                                                height={0}
                                                                width={0}
                                                                alt={image.name}
                                                                quality={100}
                                                                style={{height: `${row.area_percent}%`, width: `${((row.area_percent * image.width) / image.height)}%`}}
                                                            />
                                                        )
                                                    }
                                                })()}
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

// Hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
        // Set window width/height to state
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

const getAreaWidth = ((window_width)=>{
        let result;
        let window_w = window_width + 15;

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
        else if(window_w >= 576){ 
            result = 540;
        }
        else {
            result = window_w - 15;
        }

        return result;
    });
