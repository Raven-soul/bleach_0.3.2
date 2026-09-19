'use client';

import $ from "jquery"
import Image from 'next/image'
import Link from 'next/link'

export function SpellBlock({spell}){    
    return (
        <div className="spell-card">
            <div className="name">
                <span>{spell.ab_name}</span>
            </div>
            <div className="info">
                <p>
                    <span className="param">Время накладывания: </span>
                    <span className="value">{spell.cast_time_name}</span>
                </p>
                <p>
                    <span className="param">Дистанция: </span>
                    <span className="value">{spell.distance_name}</span>
                </p>
                <p>
                    <span className="param">Компоненты: </span>
                    <span className="value">{spell.components}</span>
                </p>
                <p>
                    <span className="param">Длительность: </span>
                    <span className="value">{spell.durations}</span>
                </p>
                <p>
                    <span className="param">Перезарядка: </span>
                    <span className="value">{(spell.recharge_name == null)? 'Нет': spell.recharge_name}</span>
                </p>
                <p>
                    <span className="param">Требования: </span>
                    <span className="value">{(spell.requirements == null)? 'Нет': spell.requirements}</span>
                </p>
            </div>
            <div className="content">
                <div dangerouslySetInnerHTML={{ __html: spell.translate }}></div>
            </div>
        </div>
    )
}