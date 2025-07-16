import Image from 'next/image'

// getClassContent - для получения основных данных класса
// getClassTableHeadersContent - для получения заголовков таблицы класса
// getClassTableContent - для получения основного тела таблицы класса
// getClassContentData - для получения умений класса (идут сразу после таблицы)

// getClassSpoilersHead 
// getClassSpoilersContent

import { getClassContent, getClassTableHeadersContent, getClassTableContent, getClassContentData, getClassSpoilersHead, getClassSpoilersContent } from "@/lib/ControllerDB/crud";
import { PageLoad } from "@/components/page_part/user_side/common/Load";

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
    let table = getClassTableHeadersContent(slug)[0];

    table['content'] = getClassTableContent(table.id);
    table['header'] = getTableHeaders(table);    

    for(let i = 0; i<table.content.length; i++){
        let cnt = [];

        for(let j=1; j<=table.col_num; j++){
            var check = (j == 3)? true : false
            cnt.push({
                val: table.content[i]['col_' + j],
                cls: 'left-content',
                check: check
            })
        }

        table.content[i]['data'] = cnt;
    }

    classElement['spoiler_list'] = getClassSpoilersHead(slug);

    for(let i = 0; i < classElement.spoiler_list.length; i++){
        classElement.spoiler_list[i]['content'] = getClassSpoilersContent(classElement.spoiler_list[i].id);
    }    

    const classContentData = getClassContentData(slug);

//-----------------------------------------------------------------

    return (
        <div class="row-2">
            <div class="col chapter-title-mobile">{classElement.title_name}</div>
            <div class="col">
                <PageLoad page_title={classElement.title_name} />
                <div class="race-class-data-area">
                    <div class="back-image">
                        {/* <img src="@@CLASSBACKIMAGE@@" alt="back"> */}
                    </div>
                    <div class="main-content-block">
                        <div class="title-block">
                            <div class="row-3">
                                <div class="col race-class-name">
                                    <p>{classElement.class_name}</p>
                                </div>
                                <div class="col race-class-source">
                                    <p><strong>Источник:</strong> {'"' + classElement.sorce_name + '"'}</p>
                                </div>
                                <div class="col race-class-citation">
                                    <p>{classElement.comment}</p>
                                    <p>{classElement.comment_author}, <strong>{classElement.comment_author_rank}</strong></p>
                                </div>
                            </div>
                        </div>
                        <div class="content-block" dangerouslySetInnerHTML={{ __html: classElement.pretable_content }}>
                        </div>
                        <div class="content-block">
                            <div class="sub-menu" hidden>
                                <h5>Меню</h5>
                                <a href="#">data</a>
                                <a href="#">data</a>
                                <a href="#">data</a>
                                <a href="#">data</a>
                            </div>
                            <div class="table">
                                <h2>{classElement.class_short_name}</h2>
                                <table class="class-progress-table">
                                    <tbody>
                                        <tr class="tb-head-row">
                                            {table.header.map((head)=>{
                                                return(
                                                    <th>
                                                        <span class="long">{head.head_name}</span>
                                                        <span class="short" title={head.head_name}>{head.head_name_short}</span>
                                                    </th>
                                                )
                                            })}
                                        </tr>
                                        <tr class="tb-empty-row">
                                            {table.header.map((head)=>{
                                                return(
                                                    <td>{head.head_dash}</td>
                                                )
                                            })}
                                        </tr>
                                        {table.content.map((row)=>{
                                            return(
                                                <tr>
                                                    {row.data.map((line)=>{
                                                        return(
                                                            <td class={(line.check)? line.cls : ""}>
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
                            <div class="content">
                                {classContentData.map((skill)=>{
                                    //console.log('skill '+ skill);
                                    console.log('skill.data_type '+ skill.data_type + ' id = ' + skill.id);

                                    if(skill.data_type == 0)
                                    {   
                                        return(
                                            <div class="data-content">
                                                <h3>{skill.name}</h3>
                                                <p class="level">{skill.requirements}</p>
                                                <div dangerouslySetInnerHTML={{ __html: skill.value }}></div>
                                            </div>
                                        )
                                    }
                                    else if(skill.data_type == 1) 
                                    {
                                        //console.log('skill.data_type == 1 '+ skill.data_type);
                                        return(
                                            <div class="data-content">
                                                <h1>{skill.name}</h1>
                                                <p>{skill.value}</p>
                                                <div class="blue-data-area">
                                                    <h4>Хиты, владение и снаряжение</h4>
                                                    <div class="data-block">
                                                        <h2>Хиты</h2>
                                                        <p><strong class="feature-class">Кость Хитов:</strong> {classElement.hit_dice}</p>
                                                        <p><strong class="feature-class">Хиты на 1 уровне:</strong> {classElement.hit_point_1_lvl}</p>
                                                        <p><strong class="feature-class">Хиты на следующих уровнях:</strong> {classElement.hit_point_other}</p>
                                                    </div>
                                                    <div class="data-block">
                                                        <h2 class="no-underlined-black">Владение</h2>
                                                        <p><strong class="feature-class">Броня:</strong> {classElement.armor}</p>
                                                        <p><strong class="feature-class">Оружие:</strong> {classElement.weapon}</p>
                                                        <p><strong class="feature-class">Инструменты:</strong> {classElement.tools}</p>
                                                        <p><strong class="feature-class">Спасброски:</strong> {classElement.savethrow}</p>
                                                        <p><strong class="feature-class">Навыки:</strong> {classElement.skills}</p>
                                                    </div>
                                                    <div class="data-block">
                                                        <h2 class="no-underlined-black">Cнаряжение</h2>
                                                        <div dangerouslySetInnerHTML={{ __html: classElement.equipment }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    else if(skill.data_type == 2) {
                                        console.log(classElement.spoiler_list);
                                        return(
                                            <div class="data-content">
                                                <h1>{skill.name}</h1>
                                                <p>{skill.value}</p>
                                                { (()=>{
                                                    let check = false;
                                                    var spoiler;
                                                    for(let i = 0; i<classElement.spoiler_list.length; i++){
                                                        if(classElement.spoiler_list[i].id != skill.spoiler_id){}
                                                        else {
                                                            spoiler = classElement.spoiler_list[i];
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
                                                            <div class="spoiler">
                                                                <div class="spec-info-block">
                                                                    <h1 class="hide-next" id={spoiler.id}>{/* onclick="specializationBlockHide('hb', this)" */}
                                                                        {spoiler.name}
                                                                    </h1>
                                                                    <div class={"hidden-data-item hb-" + spoiler.id}>
                                                                        <p>{spoiler.description}</p>
                                                                        {spoiler.content.map((block)=>{
                                                                            return(
                                                                                <div class="data-content">
                                                                                    {(() => {
                                                                                        if(block.h5_tag == 1) return(
                                                                                            <h5>{block.name}</h5>
                                                                                        )
                                                                                        else return(
                                                                                            <h4>{block.name}</h4>
                                                                                        )
                                                                                    })()}
                                                                                    <p class="level">{block.requirements}</p>
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
                                
                                {/* @@CLASSSPOILERBLOCK@@ */}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="image-block" hidden>
                    <div class="row-2">
                        <div class="col">
                            <h6>Галерея</h6>
                        </div>
                        <div class="col">
                            <div class="image-gallery-data-set">
                                @@CLASSIMAGEBLOCK@@
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}