import { GetGalleryClass, GetGalleryRace } from "@/lib/ControllerDB/Repository/GalleryRepository"
import { GetGallaryItem } from "@/components/page_part/user_side/common/gallary_user"
import {Icon} from "@/components/page_part/server_side/common/fontawesome"

export function GallaryMain(){
    return(
        <gallery className={'gallery-data-block'}>
            <div style={{marginBottom: 30 + 'px', visibility: 'hidden'}}>data</div>
            <div className="container">
                <div className="row-2">
                    <div className="col-auto close-button-area">
                        <button className="close-button">
                            <Icon name={'faCircleXmark'} className={'close-icon'}/>
                        </button>
                    </div>
                    <div className="col ">
                        data
                        <div className={'image-block'}></div>
                    </div>
                </div>
            </div>                        
        </gallery>
    )
}

export function Gallary({pageName, slug}){
    var list;

    switch (pageName) {
    case 'class':
        list = GetGalleryClass(slug); break;
    case 'race':
        list = GetGalleryRace(slug); break;
    default:
        list = null;
    }

    if(list.length == 0) {return(<></>)}
    else return(
        <div className="image-block">
            <div className="row-2">
                <div className="col">
                    <h6>Галерея</h6>
                </div>
                <div className="col">
                    <GetGallaryItem list={list}/>
                </div>
            </div>
        </div>
        
    )
}