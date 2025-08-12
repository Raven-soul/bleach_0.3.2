import Image from 'next/image'

import { getClassContent, getClassTableHeadersContent, getClassTableContent, getClassContentData, getClassSpoilersHead, getClassSpoilersContent } from "@/lib/ControllerDB/Repository/ClassRepository";

import { getRaceContent } from "@/lib/ControllerDB/Repository/RaceRepository";
import { PageLoad } from "@/components/page_part/user_side/common/Load";
import { SpoilerHead } from "@/components/page_part/user_side/common/buttons";

export function generateStaticParams() {
    const pages = ['Gecon', 'People', 'Soul', 'Hollow', 'Quincy', 'Fullbringer', 'Visored', 'Bount'];
    return pages.map((page) => ({ slug: page }));
}

export default async function Page({ params }) {
    const { slug } = await params
    
    let raceElement = getRaceContent(slug)[0];

//-----------------------------------------------------------------

    return (
        <div class="row-2">
            <div class="col chapter-title-mobile">{raceElement.title_name}</div>
            <div class="col">
                <PageLoad page_title={raceElement.title_name} />
                <div class="race-class-data-area">
                    <div class="back-image">
                        {/* <img src="@@CLASSBACKIMAGE@@" alt="back"> */}
                    </div>
                    <div class="main-content-block">
                        <div class="title-block">
                            <div class="row-3">
                                <div class="col race-class-name">
                                    <p>{raceElement.race_name}</p>
                                </div>
                                <div class="col race-class-source">
                                    <p><strong>Источник:</strong> {'"' + raceElement.sorce_name + '"'}</p>
                                </div>
                                <div class="col race-class-citation">
                                    <p>{raceElement.comment}</p>
                                    <p>{raceElement.comment_author}, <strong>{raceElement.comment_author_rank}</strong></p>
                                </div>
                            </div>
                        </div>
                        <div class="content-block" dangerouslySetInnerHTML={{ __html: raceElement.pretable_content }}>
                        </div>
                        <div class="content-block">
                            <div class="sub-menu" hidden>
                                <h5>Меню</h5>
                                <a href="#">data</a>
                                <a href="#">data</a>
                                <a href="#">data</a>
                                <a href="#">data</a>
                            </div>
                            <div class="content">
                                
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