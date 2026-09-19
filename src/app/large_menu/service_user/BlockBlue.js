'use client';

import $ from "jquery"
import Image from 'next/image'
import Link from 'next/link'

export function BlueBlock({classElement}){    
    return (
        <div className="blue-data-area">
            <h4>Хиты, владение и снаряжение</h4>
            <div className="data-block">
                <h2>Хиты</h2>
                <p><strong className="feature-class">Кость Хитов:</strong> {classElement.hit_dice}</p>
                <p><strong className="feature-class">Хиты на 1 уровне:</strong> {classElement.hit_point_1_lvl}</p>
                <p><strong className="feature-class">Хиты на следующих уровнях:</strong> {classElement.hit_point_other}</p>
            </div>
            <div className="data-block">
                <h2 className="no-underlined-black">Владение</h2>
                <p><strong className="feature-class">Броня:</strong> {classElement.armor}</p>
                <p><strong className="feature-class">Оружие:</strong> {classElement.weapon}</p>
                <p><strong className="feature-class">Инструменты:</strong> {classElement.tools}</p>
                <p><strong className="feature-class">Спасброски:</strong> {classElement.savethrow}</p>
                <p><strong className="feature-class">Навыки:</strong> {classElement.blocks}</p>
            </div>
            <div className="data-block">
                <h2 className="no-underlined-black">Cнаряжение</h2>
                <div dangerouslySetInnerHTML={{ __html: classElement.equipment }}></div>
            </div>
        </div>
    )
}