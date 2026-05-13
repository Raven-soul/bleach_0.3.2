import { GetGalleryClass, GetGalleryRace } from "@/lib/ControllerDB/Repository/GalleryRepository"
import { GetGallaryItem, CloseButton } from "../user_side/gallary_user"

export function GallaryMain(){
    return(
        <gallery className={'gallery-data-block'}>
            <div style={{marginBottom: 30 + 'px', visibility: 'hidden'}}>data</div>
            <div className="container">
                <div className="row-2">
                    <div className="col-auto close-button-area">
                        <CloseButton/>
                    </div>
                    <div className="col">
                        <div className={'image-main-block'}>
                            <div style={{visibility: "hidden"}}>data</div>
                        </div>
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
                <div className="col gallary-area">
                    <GetGallaryItem list={list}/>
                </div>
            </div>
        </div>
        
    )
}