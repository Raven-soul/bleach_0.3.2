import { GetGalleryClass, GetGalleryRace } from "@/lib/ControllerDB/Repository/GalleryRepository"
import { GetGallaryItem } from "@/components/page_part/user_side/common/gallary_user"

export function Gallary({pageName, slug}){
    var list;
    let res = true;

    switch (pageName) {
    case 'class':
        list = GetGalleryClass(slug); break;
    case 'race':
        list = GetGalleryRace(slug); break;
    default:
        list = null;
        res = false;
    }

    if(res == false) {return(<></>)}
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