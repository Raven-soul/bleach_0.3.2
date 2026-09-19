import { PageLoad } from "@/components/page_part/service_user/Load";
import { Gallary } from '@/components/page_part/service_server/gallary';

import { getClassSpoilers, getClassSpoilersContent, getTicketElementSpoilerData } from "./../../service_repository/SpoilerRepository";
import { getClassContent, getClassContentData, getClassSlagList } from "./../service_repository/ClassRepository";
import { getClassTable, getClassTableContent } from "../../service_repository/TableRepository";

import { AnchorMenu } from '../../service_user/AnchorMenu';
import { SpoilerBlock, SpoilerElement } from '../../service_user/BlockSpoiler';
import { TableBlock } from '../../service_user/BlockTable';
import { BlueBlock } from '../../service_user/BlockBlue';

export function generateStaticParams() {
    const pages = getClassSlagList();
    return pages.map((page) => ({ slug: page }));
}

export default async function Page({ params }) {
    const { slug } = await params
    
    let classElement = getClassContent(slug);

//#region ContentData
    classElement['ContentData'] = getClassContentData(slug);    

    for(let i = 0; i < classElement.ContentData.length; i++){
        switch(classElement.ContentData[i].type_name) {
            case 'spoiler_block':
                classElement.ContentData[i]['Spoiler'] = getTicketElementSpoilerData(classElement.ContentData[i].id);
                classElement.ContentData[i].Spoiler['Content'] = getClassSpoilersContent(classElement.ContentData[i].Spoiler.id);
                break;
        }
    }
//#endregion

//#region SpoilerList
    classElement['SpoilerList'] = getClassSpoilers(slug);

    // блок обработки спойлеров в конце тела страницы, где основа архитипов
    for(let i = 0; i < classElement.SpoilerList.length; i++){
        classElement.SpoilerList[i]['Content'] = getClassSpoilersContent(classElement.SpoilerList[i].id);
    }
//#endregion

//#region Table
    classElement['Table'] = getClassTable(slug);
    classElement.Table['Content'] = getClassTableContent(classElement.Table.id);
//#endregion

//-----------------------------------------------------------------

    return (
        <div className="row-2">
            <div className="col chapter-title-mobile">{classElement.title_name}</div>
            <div className="col">
                <PageLoad page_title={classElement.title_name} />
                <div className="main-brown-data-area">
                    <div className="back-image">
                        {/* <img src="@@CLASSBACKIMAGE@@" alt="back"> */}
                    </div>
                    <div className="main-content-block">
                        <div className="title-block">
                            <div className="row-3">
                                <div className="col race-class-name">
                                    <p>{classElement.class_name}</p>
                                </div>
                                <div className="col race-class-source">
                                    <p><strong>Источник:</strong> {'"' + classElement.sorce_name + '"'}</p>
                                </div>
                                <div className="col race-class-citation">
                                    <p>{classElement.comment}</p>
                                    <p>{classElement.comment_author}, <strong>{classElement.comment_author_rank}</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="content-block" dangerouslySetInnerHTML={{ __html: classElement.preview_content }}></div>
                        <div className="content-block">
                            <AnchorMenu elements={classElement.ContentData}/>
                            <TableBlock table={classElement.Table}/>                            
                            <div className="content">
                                {classElement.ContentData.map((block)=>{
                                    if(block.type_name == 'common_block')
                                    {   
                                        return(
                                            <div key={'data_content_' + block.id} id={'data_content_' + block.id} className="data-content">
                                                <h3>{block.name}</h3>
                                                <p className="level">{block.requirements}</p>
                                                <div dangerouslySetInnerHTML={{ __html: block.value }}></div>
                                            </div>
                                        )
                                    }
                                    else if(block.type_name == 'blue_block') 
                                    {
                                        return(
                                            <div key={'data_content_' + block.id} id={'data_content_' + block.id} className="data-content">
                                                <h1>{block.name}</h1>
                                                <p>{block.value}</p>
                                                <BlueBlock classElement={classElement}/>
                                            </div>
                                        )
                                    }
                                    else if(block.type_name == 'spoiler_block') {
                                        return(
                                            <div key={'data_content_' + block.id} className="data-content">
                                                <h1>{block.name}</h1>
                                                <p>{block.value}</p>
                                                <SpoilerElement spoiler={block.Spoiler}/>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <SpoilerBlock block_name={classElement.archetype_name} 
                                          block_description={classElement.archetype_description} 
                                          spoiler_list={classElement.SpoilerList}
                            />
                        </div>
                    </div>
                </div>
                <Gallary pageName={'class'} slug={slug}/>
            </div>
        </div>
    )
}