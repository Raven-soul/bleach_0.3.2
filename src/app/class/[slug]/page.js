import Image from 'next/image'

import { getClassContent } from "@/lib/ControllerDB/crud";

export default async function Page({ params }) {
  const { slug } = await params

  const classContent = getClassContent(slug);
  let classElement = classContent[0];

  //return <div>Мой пост: {slug}</div>
  return(
    <div class="row-2">
            <div class="col chapter-title-mobile">{classElement.title_name}</div>
            <div class="col">
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
                                    <p>{classElement.comment_author}</p>
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
                                @@CLASSTABLECONTENT@@
                            </div>
                            <div class="content">
                                @@CLASSCONTENTDATA@@
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