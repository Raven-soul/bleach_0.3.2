
import { View } from "../service_user/GridView";

import { 
    getFilterList,
    getFilterItems
} from "./service_repository/KidoReoisitory";

export default async function Page({ params }) {

    let grid;

    let filters = getFilterList('kido');

    for(let i = 0; i<filters.length; i++){
        filters[i]['content'] = getFilterItems(filters[i].id);
    }

    return (
        <View grid={grid} filters={filters}/>
    )
}