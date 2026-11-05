'use client';

import $ from "jquery"
import Image from 'next/image'
import Link from 'next/link'

export function KidoBlock({kido}){    
    return (
        <div className="spell-card">
            <div className="name">
                <span>{kido.name}</span>
            </div>
            <div className="info">
                {kido.Filters.map((filter)=>{
                    return (
                        <p key={filter.id + '_' + filter.code}>
                            <span className="param">{filter.name}: </span>
                            <span className="value">{filter.list}</span>
                        </p>
                    )
                })}
                <p>
                    <span className="param">Требования: </span>
                    <span className="value">{(kido.requirements == null)? 'Нет': kido.requirements}</span>
                </p>
            </div>
            <div className="content">
                {kido.Content.map((content)=>{
                    return(
                        <div key={'ticket_element_' + content.id} dangerouslySetInnerHTML={{ __html: content.value }}></div>
                    )
                })}                
            </div>
        </div>
    )
}