import { GetGalleryClass, GetGalleryRace } from "@/lib/ControllerDB/Repository/GalleryRepository"
import { GetGallaryItem } from "@/components/page_part/user_side/common/gallary_user"
import {Icon} from "@/components/page_part/server_side/common/fontawesome"

export function GallaryMain(){
    return(
        <gallery className={'gallery-data-block'}>
            <div style={{marginBottom: 20 + 'px', visibility: 'hidden'}}>data</div>
            <div className="container">
                <div className="row-2">
                    <div className="col-auto">
                        <button>
                            <Icon name={'faCircleXmark'}/>
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
        <div class="image-block">
            <div class="row-2">
                <div class="col">
                    <h6>Галерея</h6>
                </div>
                <div class="col">
                    <GetGallaryItem list={list}/>
                </div>
            </div>
        </div>
        
    )
}