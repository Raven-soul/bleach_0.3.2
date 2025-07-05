'use client';

import $ from "jquery"
import Link from 'next/link'
import Image from 'next/image'

import { useEffect } from "react";

import list_button_ico from "@/../public/img/home/list_button_ico.png";
import list_exit_ico from "@/../public/img/home/list_exit_ico.png";

export function Mobile_list_button_function(){
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
}

export function Menu_stroke_link({link, logo, show, name, key}){
    
    var check_strike = (()=>{
        if(show == 1) return (name)
        else return(<strike>{name}</strike>)
    });

    const func = (()=>{
        if($('.menu-block-back').hasClass('active')){
            Mobile_list_button_function();
        }
    });

    return (
        <li key={key}>
            <Link href={link} class="w-100 p-0" onClick={func}>
                <div class="row m-0">
                    <div class="col-1 p-0 image-data">
                        <i class={logo} aria-hidden="true"></i>
                    </div>
                    <div class="col content-data strike_line">
                        {check_strike()}
                    </div>
                </div>
            </Link>
        </li>
    )
}

export function Mobile_list_button(){
    useEffect(()=>{},);

    return (
        <button class="mobile_list_button" onClick={Mobile_list_button_function}>
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
            <div class="list-ico-exit" style={{ display: "none" }}>
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
    useEffect(()=>{},);

    const func = (()=>{
        let hideTagClassName = "." + hide_section + "-" + selection_id;
        let chevronClassName = "." + chevrone + "-" + selection_id;

        if ( $(hideTagClassName).css("display") == "none" ){
            $(hideTagClassName).css("display","block");
            $(chevronClassName).html( "<i class=\"fa-solid fa-chevron-down\"></i>" );
        } else {
            $(hideTagClassName).css("display","none");
            $(chevronClassName).html( "<i class=\"fa-solid fa-chevron-left\"></i>" );
        }
    });

    return (
        <button id={selection_id} class="col w-100 px-3 menu-block-section-name-button" onClick={func}>
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