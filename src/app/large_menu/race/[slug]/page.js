import Image from 'next/image'

import { PageLoad } from '@/components/page_part/service_user/Load';
import { Gallary } from '@/components/page_part/service_server/gallary';

import { getRaceContent, getRaceContentData, getRaceSlagList } from './../service_repository/RaceRepository';
import { getTicketElementSpoilerData } from './../../service_repository/SpoilerRepository';
import { getContentSpell } from './../../service_repository/TicketElementRepository';

import { AnchorMenu } from '../../service_user/AnchorMenu';
import { SpoilerElement } from '../../service_user/BlockSpoiler';
import { SpellBlock } from '../../service_user/BlockSpell';

export function generateStaticParams() {
    const pages = getRaceSlagList();
    return pages.map((page) => ({ slug: page }));
}

export default async function Page({ params }) {
    const { slug } = await params
    
    let raceElement = getRaceContent(slug)[0];
    raceElement['ContentData'] = getRaceContentData(slug);

    for(let i = 0; i < raceElement.ContentData.length; i++){
        switch(raceElement.ContentData[i].type_name) {
            case 'spoiler_block':
                raceElement.ContentData[i]['Spoiler'] = getTicketElementSpoilerData(raceElement.ContentData[i].id);
                break;

            case 'spell_block':
                raceElement.ContentData[i]['Spell'] = getContentSpell(raceElement.ContentData[i].id);
                break;
        }
    }

//-----------------------------------------------------------------

    return (
        <div className="row-2">
            <div className="col chapter-title-mobile">{raceElement.title_name}</div>
            <div className="col">
                <PageLoad page_title={raceElement.title_name} />
                <div className="main-brown-data-area">
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
                            <AnchorMenu elements={raceElement.ContentData}/>
                            <div className="content">
                                {raceElement.ContentData.map((block)=>{
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
                                    else if(block.type_name == 'spoiler_block')
                                    {   
                                        return(
                                            <div key={'data_content_' + block.id} id={'data_content_' + block.id} className="data-content">
                                                <SpoilerElement spoiler={block.Spoiler}/> 
                                            </div>
                                        )
                                    }
                                    else if(block.type_name == 'spell_block')
                                    {   
                                        return(
                                            <div style={{marginTop: '30px'}} key={'data_content_' + block.id} id={'data_content_' + block.id} className="data-content">
                                                <SpellBlock spell={block.Spell}/>
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