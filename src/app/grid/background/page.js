import { PageLoad } from "@/components/page_part/service_user/Load";

import { 
    getSpellGridList
} from "./service_repository/SpellRepository";

export default async function Page({ params }) {
    let spellGridList = getSpellGridList();

    //-----------------------------------------------------------------

    return (
        <div className="row-2">
            <div className="col chapter-title-mobile"></div>
            <div className="col">
                <PageLoad page_title={"d"}/>
                <div className="row-2">
                    <div className="col">
                        <div className="filter-above-grig-oficial">
                            <p>Homebrew</p>
                        </div>
                    </div>
                    <div className="col" hidden>
                        filter data
                    </div>
                    <div className="col abilities-grid">
                        <div className="armament-abilities-content">
                            <div className="row-2">
                                <div className="col" style={{marginBottom: "15px"}} hidden>
                                    filter prompts
                                </div>
                                <div className="col">
                                    <div className="armament-abilities-content-data">                                                            
                                        <div className="row armament-filtered-area">
                                            <div className="col-auto" hidden>
                                                <p className="vertical-group-name">data</p>
                                            </div>
                                            <div className="col">
                                                list
                                            </div>
                                        </div>                                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col stub-header">
                        data
                    </div>
                </div>
            </div>
        </div>
    )
}