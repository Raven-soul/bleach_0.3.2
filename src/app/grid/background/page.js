
import { PageView } from "../service_user/GridView";

import { 
    getFilterList,
    getFilterItems
} from "./../service_repository/FilterRepository";

import { getPageName } from "../../../components/page_part/service_repository/BaseRepository";

export default async function Page({ params }) {
    let grid;
    let filters;

    let page_name = getPageName('background');

    return (
        <PageView grid={grid} filters={filters} page_name={page_name}/>
    )
}