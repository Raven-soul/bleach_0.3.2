'use client';
import { PageLoad } from "@/components/page_part/service_user/Load";

export function BaseView({page, page_name}){
    return (
        <div className="row-2">
            <div className="col chapter-title-mobile">{page_name}</div>
            <div className="col">
                <PageLoad page_title={page_name}/>
                <div className="row-2">
                    {page}
                    <div className="col stub-header">
                        data
                    </div>
                </div>
            </div>
        </div>
    )
}