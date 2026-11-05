
import { View } from "../service_user/GridView";

import { 
    getSpellGridList
} from "./service_repository/SpellRepository";

export default async function Page({ params }) {
    let grid;
    let filters;

    return (
        <View grid={grid} filters={filters}/>
    )
}