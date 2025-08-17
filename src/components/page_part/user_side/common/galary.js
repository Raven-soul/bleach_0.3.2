'use client';

import $ from "jquery"
import Image from 'next/image'

export function Galary(){
    return(
        <div class="image-gallery-data-set">
            <div class="image-data">
                <Image
                    src={require(`@/../public/img/Suzumebachi_1.png`)}
                    height={75}
                    width={75}
                    alt={'Suzumebachi'}
                />
            </div>
        </div>
    )
}