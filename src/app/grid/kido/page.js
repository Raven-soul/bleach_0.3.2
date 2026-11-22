
import { PageView } from "../service_user/GridView";
import { getPageName } from "@/components/page_part/service_repository/BaseRepository";

import { 
    getFilterList,
    getFilterItems
} from "./../service_repository/FilterRepository";

import { 
    getBuckwheatList,
    getBuckwheatFilters
} from "./../service_repository/GridRepository";


export default async function Page({ params }) {
    let buckwheat_type = 'kido';

    let grid = getBuckwheatList(buckwheat_type);
    let filters = getFilterList(buckwheat_type);
    let page_name = getPageName(buckwheat_type);

    for(let i = 0; i<grid.length; i++){
        grid[i]['filters'] = getBuckwheatFilters(grid[i].id);
    }

    for(let i = 0; i<filters.length; i++){
        filters[i]['content'] = getFilterItems(filters[i].id);
    }

    return (
        <PageView grid={grid} filters={filters} page_name={page_name}/>
    )
}