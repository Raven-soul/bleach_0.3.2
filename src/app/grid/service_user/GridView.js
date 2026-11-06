'use client';

import { usePathname } from 'next/navigation';

import { PageLoad } from "@/components/page_part/service_user/Load";
import { FormFilters } from "./FormFilters";

export function View({grid, filters, page_name}){
    //let name = GetPageName(await usePathname().substring(usePathname().lastIndexOf('/') + 1));
    return (
        <div className="row-2">
            <div className="col chapter-title-mobile"></div>
            <div className="col">
                <PageLoad page_title={page_name}/>
                <div className="row-2">
                    <div className="col">
                        <div className="filter-above-grig-oficial">
                            <p>Homebrew</p>
                        </div>
                    </div>
                    <div className="col">
                        <FormFilters filters={filters}/>
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