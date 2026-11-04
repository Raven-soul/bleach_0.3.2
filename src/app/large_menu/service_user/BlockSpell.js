'use client';

import $ from "jquery"
import Image from 'next/image'
import Link from 'next/link'

export function SpellBlock({spell}){    
    return (
        <div className="spell-card">
            <div className="name">
                <span>{spell.name}</span>
            </div>
            <div className="info">
                {spell.Filters.map((filter)=>{
                    return (
                        <p key={filter.id + '_' + filter.code}>
                            <span className="param">{filter.name}: </span>
                            <span className="value">{filter.list}</span>
                        </p>
                    )
                })}
                <p>
                    <span className="param">Требования: </span>
                    <span className="value">{(spell.requirements == null)? 'Нет': spell.requirements}</span>
                </p>
            </div>
            <div className="content">
                {spell.Content.map((content)=>{
                    return(
                        <div key={'ticket_element_' + content.id} dangerouslySetInnerHTML={{ __html: content.value }}></div>
                    )
                })}                
            </div>
        </div>
    )
}