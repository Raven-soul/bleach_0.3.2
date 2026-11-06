
import { View } from "../service_user/GridView";

import { 
    getFilterList,
    getFilterItems
} from "./../service_repository/FilterRepository";

import { getPageName } from "./../service_repository/ServiceReposytory";

export default async function Page({ params }) {
    let grid;
    let filters;

    let page_name = getPageName('background');

    return (
        <View grid={grid} filters={filters} page_name={page_name}/>
    )
}