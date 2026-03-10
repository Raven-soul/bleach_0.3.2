import Image from 'next/image'

import { getRaceContent, getRaceContentData } from '@/lib/ControllerDB/Repository/RaceRepository';
import { PageLoad } from '@/components/page_part/user_side/common/Load';
import { Gallary } from '@/components/page_part/server_side/common/gallary';

export function generateStaticParams() {
    const pages = ['Gecon', 'People', 'Soul', 'Hollow', 'Quincy', 'Fullbringer', 'Visored', 'Bount'];
    return pages.map((page) => ({ slug: page }));
}

export default async function Page({ params }) {
    const { slug } = await params
    
    let raceElement = getRaceContent(slug)[0];
    raceElement['ContentData'] = getRaceContentData(slug);

//-----------------------------------------------------------------

    return (
        <div className="row-2">
            <div className="col chapter-title-mobile">{raceElement.title_name}</div>
            <div className="col">
                <PageLoad page_title={raceElement.title_name} />
                <div className="race-class-data-area">
                    <div className="back-image">
                        {/* <img src="@@CLASSBACKIMAGE@@" alt="back"> */}
                    </div>
                    <div className="main-content-block">
                        <div className="title-block">
                            <div className="row-3">
                                <div className="col race-class-name">
                                    <p>{raceElement.race_name}</p>
                                </div>
                                <div className="col race-class-source">
                                    <p><strong>Источник:</strong> {'"' + raceElement.sorce_name + '"'}</p>
                                </div>
                                <div className="col race-class-citation">
                                    <p>{raceElement.comment}</p>
                                    <p>{raceElement.comment_author}, <strong>{raceElement.comment_author_rank}</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="content-block" dangerouslySetInnerHTML={{ __html: raceElement.preview_content }}>
                        </div>
                        <div className="content-block">
                            <div className="sub-menu" hidden>
                                <h5>Меню</h5>
                                <a href="#">data</a>
                                <a href="#">data</a>
                                <a href="#">data</a>
                                <a href="#">data</a>
                            </div>
                            <div className="content">
                                {raceElement.ContentData.map((skill)=>{
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
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <Gallary pageName={'race'} slug={slug}/>
            </div>
        </div>
    )
}