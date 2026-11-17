import { AddGridValue } from "@/app/app_admin/service_server/UpdateGeneral"

import { PageView } from "../service_user/AdminAddElementView";
import { getKidoGridInfo } from "../service_repository/EditRepository";

import { getPageName } from "../../../components/page_part/service_repository/BaseReposytory";

import { 
    getFilterList,
    getFilterItems
} from "./../service_repository/FilterRepository";


function insertVal(data){
    //AddGridValue();
}

export default async function Page({ params }) {

    let page_name = getPageName('grid_add');

    let info = getKidoGridInfo();    
    let paramList = getFilterList('kido', 'value');
    let radioList = getFilterList('kido', 'bool');

    for(let i = 0; i<paramList.length; i++){
        paramList[i]['content'] = getFilterItems(paramList[i].id);
    }

    for(let i = 0; i<radioList.length; i++){
        radioList[i]['content'] = getFilterItems(radioList[i].id, '0');
    }

    return (
        <PageView insert_function={insertVal} info={info} paramList={paramList} radioList={radioList} page_name={page_name}/>
    )
}