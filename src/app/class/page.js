import Image from 'next/image'

import { getPageTitleTemplate, getClassMenuGroupContent, getClassMenuContent } from "@/lib/ControllerDB/crud";

export default function Class(param) {
  const { data } = param;

  const menuTemplate = getClassMenuGroupContent();
  const pageTitle = getPageTitleTemplate();

  for(let i = 0; i < menuTemplate.length; i++){
        menuTemplate[i]["content"] = getClassMenuContent(menuTemplate[i].id);
  }

  return (
    <div class="row-2">
        <div class="col chapter-title-mobile">{pageTitle[0].name}</div>
        <div class="col">
            <div class="row-2">
                {menuTemplate.map((group)=>{
                    return (
                        <div class="grid-group">
                            <div class="grid-group-name">{group.name}</div>
                            <div class="grid-group-data">
                                {group.content.map((element)=>{
                                    return(
                                        <div class="grid-group-data-item">
                                            <a href={element.link}>
                                                <div class="button-view">
                                                    <div class="row-2 ps-2 cr-name">
                                                        <div class="col cr-name-head">{element.name}</div>
                                                            <div class="col cr-name-append">{element.latin_name}</div>
                                                        </div>
                                                        <Image //bleach_0_3_2\public\img\class\13_Unborder_without_white.png
                                                            src={"/img/class/" + element.logo}
                                                            height={75}
                                                            width={75}
                                                            alt={element.latin_name}
                                                        />
                                                    {/* <img src="@@CLASSLOGO@@" alt="@@CLASSNAMEENG@@"> */}
                                                </div>
                                            </a>
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
  );
}
