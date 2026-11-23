import { PageView } from "../service_user/AdminAddElementView";
import { getKidoGridInfo } from "../service_repository/EditRepository";

import { getPageName } from "../../../components/page_part/service_repository/BaseRepository";

import { 
    getFilterList,
    getFilterItems
} from "./../service_repository/FilterRepository";

export default async function Page({ params }) {

    let page_name = getPageName('grid_add');
    let info = getKidoGridInfo();    
    
    //------------------------------------------

    let paramList = getFilterList('kido', 'value');
    
    for(let i = 0; i<paramList.length; i++){
        paramList[i]['content'] = getFilterItems(paramList[i].id, paramList[i].item_type);
    }

    //------------------------------------------

    let radioList = getFilterList('kido', 'radio');

    for(let i = 0; i<radioList.length; i++){
        radioList[i]['content'] = getFilterItems(radioList[i].id, radioList[i].item_type, '0');
    }

    //------------------------------------------

    let boolList = getFilterList('kido', 'bool');

    for(let i = 0; i<boolList.length; i++){
        boolList[i]['content'] = getFilterItems(boolList[i].id, boolList[i].item_type, '0');
    }

    //------------------------------------------
    return (
        <PageView info={info} paramList={paramList} radioList={radioList} boolList={boolList} page_name={page_name}/>
    )
}