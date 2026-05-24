'use client';
import { Icon } from '@/components/page_part/common/server_side/fontawesome'


export function Logo({name}){
    return (
        <div className="armament-data-type">
            <Icon name={name}/>
        </div>
    )
}