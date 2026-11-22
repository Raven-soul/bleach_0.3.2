'use client';

import { BaseView } from "@/components/page_part/service_user/BasePageView";

import { FiltersData } from "./GridFiltersView";
import { GridData } from "./GridTableView";

// базовый шаблон для страниц после layout, 
// то есть общие черты всех страниц сайта, меняется только наполнение
export function PageView({grid, filters, page_name}){
    return(
        <BaseView page={GridView(grid, filters)} page_name={page_name}/>
    );
}

function GridView(grid, filters) {
    return(
        <>
            <div className="col">
                <div className="filter-above-grig-oficial">
                    <p>Homebrew</p>
                </div>
            </div>
            <div className="col">
                <FiltersData filters={filters}/>
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
                                        <GridData grid={grid}/>
                                    </div>
                                </div>                                                      
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}