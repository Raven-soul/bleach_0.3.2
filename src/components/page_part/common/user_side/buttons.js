'use client';

import $ from "jquery"
import Image from 'next/image'

import { useEffect } from "react";

import list_button_ico from "@/../public/img/home/list_button_ico.png";
import list_exit_ico from "@/../public/img/home/list_exit_ico.png";

export function Mobile_list_button(){
    useEffect(()=>{
        $('.mobile_list_button').on('click', function(){
            $('.menu-block-back').toggleClass('active');
            $('.menu-block').toggleClass('active');
            
            if($('.mobile_list_button_state').attr('list_ico_state') == "true") {
                $('.mobile_list_button_state').attr('list_ico_state', "false");
                $('.list-ico-start').hide();
                $('.list-ico-exit').show();
            } else {
                $('.mobile_list_button_state').attr('list_ico_state', "true");
                $('.list-ico-start').show();
                $('.list-ico-exit').hide();
            }
        });
    },);

  return(
    <button class="mobile_list_button" >
            <div class="mobile_list_button_state" list_ico_state="true" hidden></div>
            <div class="list-ico-start">
                <Image
                    src={list_button_ico}
                    className={"list-ico"}
                    width={25}
                    height={25}
                    alt="list ico"
                />
            </div>
            <div class="list-ico-exit" style={{display: "none"}}>
                <Image
                    src={list_exit_ico}
                    className={"list-ico"}
                    width={25}
                    height={25}
                    alt="list ico"
                />
            </div>            
    </button>
  )
}

export function ChevronМenuButton ({selection_id, selection_name, chevrone, hide_section}) {
    useEffect(()=>{
        $('#' + selection_id).on('click', function(){
            let id = $(this).attr("id");
            let hideTagClassName = "." + hide_section + "-" + id;
            let chevronClassName = "." + chevrone + "-" + id;

            if ( $(hideTagClassName).css("display") == "none" ){
                $(hideTagClassName).css("display","block");
                $(chevronClassName).html( "<i class=\"fa-solid fa-chevron-down\"></i>" );
            } else {
                $(hideTagClassName).css("display","none");
                $(chevronClassName).html( "<i class=\"fa-solid fa-chevron-left\"></i>" );
            }
        });
    },);

    return (
        <button id={selection_id} class="col w-100 px-3 menu-block-section-name-button">
            <div class="row d-flex justify-content-between">
                <div class="col label">
                    {selection_name}
                </div>
                <div class={"col-auto d-flex align-items-center "+ chevrone +"-" + selection_id}>
                    <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </div>
            </div>
        </button>
    )
}