import Image from 'next/image'

// getClassContent - для получения основных данных класса
// getClassTableHeadersContent - для получения заголовков таблицы класса
// getClassTableContent - для получения основного тела таблицы класса
// getClassContentData - для получения умений класса (идут сразу после таблицы)

import { getClassContent, getClassTableHeadersContent, getClassTableContent, getClassContentData } from "@/lib/ControllerDB/crud";
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

    const classContent = getClassContent(slug);
    let classElement = classContent[0];

    let tableContent = getClassTableHeadersContent(slug);    
    let table = tableContent[0];

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

    const classContentData = getClassContentData(slug);

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
                                    return(
                                        <div class="data-content">
                                            <h3>{skill.name}</h3>
                                            <p class="level">{skill.requirements}</p>
                                            <div dangerouslySetInnerHTML={{ __html: skill.value }}></div>
                                        </div>
                                    )
                                })}
                                
                                @@CLASSSPOILERBLOCK@@
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