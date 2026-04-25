import Image from 'next/image'

import { PageLoad } from "@/components/page_part/user_side/common/Load";
import { getArmamentFilterList, getArmamentFilterItems, getArmamentTypePrompt } from "@/lib/ControllerDB/Repository/ArmamentRepository";
import { ArmamentFilter, FiltersPrompt, ArmamentAbilitiesList} from "./user_side";

export default async function Page({ params }) {
    let filterList = getArmamentFilterList();
    let filterPromptData = getArmamentTypePrompt();

    for(let i = 0; i < filterList.length; i++){
        filterList[i]["content"] = getArmamentFilterItems(filterList[i].id);
    }
    
    //-----------------------------------------------------------------

    return (
        <div className="row-2">
            <div className="col chapter-title-mobile">//</div>
            <div className="col">
                <PageLoad page_title=''/>
                <div className="row-2">
                    <div className="col">
                        <div className="filter-above-grig-oficial">
                            <p>Homebrew</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="filter-grid-group">
                            <div className="grid-group-data">    
                                {filterList.map((element)=>{
                                    return(
                                        <ArmamentFilter element={element} key={'filter_' + element.id}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col abilities-grid">
                        <div className="armament-abilities-content">
                            <div className="row-2">
                                <div className="col">
                                    <div className="prompt-area">
                                        <div className="prompt">
                                            <div className="prompt-data">
                                                <span>[0] - уровень</span>
                                                <span><span className="components">ВСМР</span> - компоненты</span>
                                            </div>
                                            <hr/> 
                                        </div>                                      
                                    </div>
                                </div>
                                <div className="col" style={{marginBottom: "15px"}}>
                                    <FiltersPrompt promptData={filterPromptData}/>
                                </div>
                                <div className="col">
                                    <div className="armament-abilities-content-data">                                                            
                                        <div className="row armament-filtered-area">
                                            <div className="col-auto" hidden>
                                                <p className="vertical-group-name">data</p>
                                            </div>
                                            <div className="col">
                                                <div className="grid-abilities-data">
                                                    {/* <ArmamentAbilitiesList abilitiesList={abilitiesList}/> */}
                                                </div>                                                                    
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