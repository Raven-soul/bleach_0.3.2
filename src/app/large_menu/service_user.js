'use client';

import $ from "jquery"
import Image from 'next/image'
import Link from 'next/link'

export function PageMenuItem({link, name, latin_name, logo}){    
    return (
        <div className="grid-group-data-item">
            <Link href={link}>
                <div className="button-view">
                    <div className="row-2 ps-2 cr-name">
                        <div className="col cr-name-head">{name}</div>
                            <div className="col cr-name-append">{latin_name}</div>
                        </div>
                        <Image
                            src={require(`@/../public/img/${logo}`)}
                            height={75}
                            width={75}
                            alt={latin_name}
                        />
                </div>
            </Link>
        </div>
    )
}

export function SpoilerHead({spoiler_id, spoiler_name}) {
    const func = (()=>{
        $('#spoiler-'+ spoiler_id).toggleClass('active');
        $('.hb-' + spoiler_id).toggleClass('active');
    });

    return (
        <h1 className="hide-next" id={spoiler_id} onClick={func}>
            {spoiler_name}
        </h1>
    )
}

export function SpoilerBlock({spoiler_id, spoiler_name, description, spoiler_list_exist}){    
    return (
        <div className="spoiler">
            <div className="spec-info-block">
                <SpoilerHead spoiler_id={spoiler_id} spoiler_name={spoiler_name}/>
                <div className={"hidden-data-item hb-" + spoiler_id}>
                    <div style={{marginTop: '15px'}} dangerouslySetInnerHTML={{ __html: description }}></div>
                    {(()=>{
                        if(spoiler_list_exist == 1){
                            // пока таких не было, просто поставил заглушку
                            return(<div className="data-content">data empty</div>)
                        }
                        else {
                            return(<></>)
                        }
                    })()}
                </div>
            </div>
        </div>
    )
}

export function SpellBlock({spell}){    
    return (
        <div className="spell-card">
            <div className="name">
                <div className="row">
                    <div className="col">
                        <span>Маска Пустого</span>
                    </div>
                </div>
            </div>
            <p>
                <span className="param">Время накладывания:</span>
                <span> </span>
                <span className="half-gray">Бонусное действие</span>
            </p>
            <p>
                <span className="param">Дистанция:</span>
                <span> </span>
                <span className="half-gray">На себя</span>
            </p>
            <p>
                <span className="param">Компоненты:</span>
                <span> </span>
                <span className="half-gray">С</span>
            </p>
            <p>
                <span className="param">Длительность:</span>
                <span> </span>
                <span className="half-gray">Особая длительность</span>
            </p>
            <p>
                <span className="param">Перезарядка:</span>
                <span> </span>
                <span className="half-gray">Нет</span>
            </p>
            <p className={"requirements"}>
                <span className="param">Требования:</span>
                <span> </span>
                <span className="half-gray">Нет</span>
            </p>
        </div>
    )
}