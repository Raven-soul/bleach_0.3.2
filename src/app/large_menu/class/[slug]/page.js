import Image from 'next/image'

// getClassContent - для получения основных данных класса
// getClassTableHeadersContent - для получения заголовков таблицы класса
// getClassTableContent - для получения основного тела таблицы класса
// getClassContentData - для получения умений класса (идут сразу после таблицы)

// getClassSpoilersHead 
// getClassSpoilersContent

import { getClassContent, getClassContentData } from "@/lib/ControllerDB/Repository/ClassRepository";
import { getClassTable, getClassTableContent } from "@/lib/ControllerDB/Repository/TableRepository";
import { getClassSpoilers, getClassSpoilersContent } from "@/lib/ControllerDB/Repository/SpoilerRepository";

import { PageLoad } from "@/components/page_part/common/user_side/Load";
import { Gallary } from '@/components/page_part/common/server_side/gallary';

import { SpoilerHead } from "../../user_side";

export function generateStaticParams() {
    const pages = ['Shinigami', 'Quincy', 'Arrankar', 'Fullbringer', 'Bount'];
    return pages.map((page) => ({ slug: page }));
}

function getTableHeaders(table){
    let headers = [];

    for(var i=1; i<=table.col_num; i++){
        headers.push({
            head_name: table['col_' + i],
            head_name_short: table['col_' + i + '_short'],
            head_dash: ':---:'
        })
    }

    return headers;
}

export default async function Page({ params }) {
    const { slug } = await params
    
    let classElement = getClassContent(slug)[0];

    classElement['ContentData'] = getClassContentData(slug);    
    
    classElement['SpecialSpoilerList'] = getClassSpoilers(slug, 1);
    classElement['SpoilerList'] = getClassSpoilers(slug);

    // блок обработки спойлеров в теле страницы среди информации
    for(let i = 0; i < classElement.SpecialSpoilerList.length; i++){
        classElement.SpecialSpoilerList[i]['content'] = getClassSpoilersContent(classElement.SpecialSpoilerList[i].id);
    } 

    // блок обработки спойлеров в конце тела страницы, где основа архитипов
    for(let i = 0; i < classElement.SpoilerList.length; i++){
        classElement.SpoilerList[i]['content'] = getClassSpoilersContent(classElement.SpoilerList[i].id);
    }  
    
    let table = getClassTable(slug)[0];

    table['content'] = getClassTableContent(table.id);
    table['header'] = getTableHeaders(table);    

    for(let i = 0; i<table.content.length; i++){
        let cnt = [];

        for(let j=1; j<=table.col_num; j++){
            var check = (j == 3)? true : false
            cnt.push({
                key: 'col_' + j,
                val: table.content[i]['col_' + j],
                cls: 'left-content',
                check: check
            })
        }

        table.content[i]['data'] = cnt;
    }         

//-----------------------------------------------------------------

    return (
        <div className="row-2">
            <div className="col chapter-title-mobile">{classElement.title_name}</div>
            <div className="col">
                <PageLoad page_title={classElement.title_name} />
                <div className="race-class-data-area">
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
                        <div className="content-block" dangerouslySetInnerHTML={{ __html: classElement.preview_content }}>
                        </div>
                        <div className="content-block">
                            <div className="sub-menu" hidden>
                                <h5>Меню</h5>
                                <a href="#">data</a>
                                <a href="#">data</a>
                                <a href="#">data</a>
                                <a href="#">data</a>
                            </div>
                            <div className="table">
                                <h2>{classElement.class_short_name}</h2>
                                <table className="class-progress-table">
                                    <tbody>
                                        <tr className="tb-head-row">
                                            {table.header.map((head)=>{
                                                return(
                                                    <th key={'head_' + head.head_name}>
                                                        <span className="long">{head.head_name}</span>
                                                        <span className="short" title={head.head_name}>{head.head_name_short}</span>
                                                    </th>
                                                )
                                            })}
                                        </tr>
                                        <tr className="tb-empty-row">
                                            {table.header.map((head)=>{
                                                return(
                                                    <td key={'head_dash_' + head.head_name}>{head.head_dash}</td>
                                                )
                                            })}
                                        </tr>
                                        {table.content.map((row)=>{
                                            return(
                                                <tr key={'content_' + row.id}>
                                                    {row.data.map((line)=>{
                                                        return(
                                                            <td key={line.key} className={(line.check)? line.cls : ""}>
                                                                {line.val}
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                            )
                                        })}                                   
                                    </tbody>
                                </table>
                            </div>
                            <div className="content">
                                {classElement.ContentData.map((skill)=>{
                                    if(skill.data_type == 0)
                                    {   
                                        return(
                                            <div key={'data_content_' + skill.id} className="data-content">
                                                <h3>{skill.name}</h3>
                                                <p className="level">{skill.requirements}</p>
                                                <div dangerouslySetInnerHTML={{ __html: skill.value }}></div>
                                            </div>
                                        )
                                    }
                                    else if(skill.data_type == 1) 
                                    {
                                        return(
                                            <div key={'data_content_' + skill.id} className="data-content">
                                                <h1>{skill.name}</h1>
                                                <p>{skill.value}</p>
                                                <div className="blue-data-area">
                                                    <h4>Хиты, владение и снаряжение</h4>
                                                    <div className="data-block">
                                                        <h2>Хиты</h2>
                                                        <p><strong className="feature-class">Кость Хитов:</strong> {classElement.hit_dice}</p>
                                                        <p><strong className="feature-class">Хиты на 1 уровне:</strong> {classElement.hit_point_1_lvl}</p>
                                                        <p><strong className="feature-class">Хиты на следующих уровнях:</strong> {classElement.hit_point_other}</p>
                                                    </div>
                                                    <div className="data-block">
                                                        <h2 className="no-underlined-black">Владение</h2>
                                                        <p><strong className="feature-class">Броня:</strong> {classElement.armor}</p>
                                                        <p><strong className="feature-class">Оружие:</strong> {classElement.weapon}</p>
                                                        <p><strong className="feature-class">Инструменты:</strong> {classElement.tools}</p>
                                                        <p><strong className="feature-class">Спасброски:</strong> {classElement.savethrow}</p>
                                                        <p><strong className="feature-class">Навыки:</strong> {classElement.skills}</p>
                                                    </div>
                                                    <div className="data-block">
                                                        <h2 className="no-underlined-black">Cнаряжение</h2>
                                                        <div dangerouslySetInnerHTML={{ __html: classElement.equipment }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    else if(skill.data_type == 2) {
                                        return(
                                            <div key={'data_content_' + skill.id} className="data-content">
                                                <h1>{skill.name}</h1>
                                                <p>{skill.value}</p>
                                                { (()=>{
                                                    let check = false;
                                                    var spoiler;
                                                    for(let i = 0; i<classElement.SpecialSpoilerList.length; i++){
                                                        if(classElement.SpecialSpoilerList[i].id != skill.spoiler_id){}
                                                        else {
                                                            spoiler = classElement.SpecialSpoilerList[i];
                                                            check = true;
                                                        }
                                                    }

                                                    if(check == false) {
                                                        return(
                                                            <div></div>
                                                        )
                                                    }
                                                    else {
                                                        return(
                                                            <div className="spoiler">
                                                                <div className="spec-info-block">
                                                                    <SpoilerHead spoiler_id={spoiler.id} spoiler_name={spoiler.name}/>
                                                                    <div className={"hidden-data-item hb-" + spoiler.id}>
                                                                        <p>{spoiler.description}</p>
                                                                        {spoiler.content.map((block)=>{
                                                                            return(
                                                                                <div className="data-content">
                                                                                    {(() => {
                                                                                        if(block.h5_tag == 1) return(
                                                                                            <h5>{block.name}</h5>
                                                                                        )
                                                                                        else return(
                                                                                            <h4>{block.name}</h4>
                                                                                        )
                                                                                    })()}
                                                                                    <p className="level">{block.requirements}</p>
                                                                                    <div dangerouslySetInnerHTML={{ __html: block.value }}></div>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }                                                    
                                                })()}
                                            </div>
                                        )
                                    }
                                    else return(
                                        <div></div>
                                    )
                                })}
                                
                                <div className="spoiler">
                                    <h1>{classElement.archetype_name}</h1>
                                    <p>{classElement.archetype_description}</p>

                                    {classElement.SpoilerList.map((spoiler)=>{
                                        return(
                                            <div key={'spoiler_' + spoiler.id} className="spec-info-block">                                        
                                                <SpoilerHead spoiler_id={spoiler.id} spoiler_name={spoiler.name}/>
                                                <div className={"hidden-data-item hb-" + spoiler.id}>
                                                    <p>{spoiler.description}</p>
                                                    {spoiler.content.map((block)=>{
                                                        return(
                                                            <div key={'spoiler_content_' + block.id} className="data-content">
                                                                {(() => {
                                                                    if(block.h5_tag == 1) return(
                                                                        <h5>{block.name}</h5>
                                                                    )
                                                                    else return(
                                                                        <h4>{block.name}</h4>
                                                                    )
                                                                })()}
                                                                <p className="level">{block.requirements}</p>
                                                                <div dangerouslySetInnerHTML={{ __html: block.value }}></div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Gallary pageName={'class'} slug={slug}/>
            </div>
        </div>
    )
}