import Image from 'next/image'

import { PageLoad } from "@/components/page_part/common/user_side/Load";
import { getPageTitleTemplate} from "@/lib/ControllerDB/crud";
import { getArmamentFilterList, getArmamentFilterItems, getArmamentTypePrompt, getArmamentGridList, getArmamentParamGridList } from "@/lib/ControllerDB/Repository/ArmamentRepository";
import { getMenuLink } from "@/lib/ControllerDB/Repository/DomainRepository";
import { ArmamentFilter, FiltersPrompt, ArmamentAbilitiesGridList} from "./user_side";

export default async function Page({ params }) {
    let pageTitle = getPageTitleTemplate('armament_abilities');
    let filterList = getArmamentFilterList();
    let filterPromptData = getArmamentTypePrompt();
    let armamentGridList = getArmamentGridList();

    for(let i = 0; i < filterList.length; i++){
        filterList[i]["content"] = getArmamentFilterItems(filterList[i].id);
    }
    for(let i = 0; i < armamentGridList.length; i++){
        armamentGridList[i]["param_list"] = getArmamentParamGridList(armamentGridList[i].id);
        armamentGridList[i]["link"] = getMenuLink('armament_abilities');
    }
    
    //-----------------------------------------------------------------

    return (
        <div className="row-2">
            <div className="col chapter-title-mobile">{pageTitle[0].name}</div>
            <div className="col">
                <PageLoad page_title={pageTitle[0].name}/>
                <div className="row-2">
                    <div className="col">
                        <div className="filter-above-grig-oficial">
                            <p>Homebrew</p>
                        </div>
                    </div>
                    <div className="col">
                        <ArmamentFilter filter_list={filterList}/>
                    </div>
                    <div className="col abilities-grid">
                        <div className="armament-abilities-content">
                            <div className="row-2">
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
                                                <ArmamentAbilitiesGridList abilitiesList={armamentGridList}/>                                                                                                                 
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