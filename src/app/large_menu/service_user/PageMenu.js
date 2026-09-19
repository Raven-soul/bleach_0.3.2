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



