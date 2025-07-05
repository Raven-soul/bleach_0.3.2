import Image from 'next/image'
import Link from 'next/link'

import { getPageTitleTemplate, getClassMenuGroupContent, getClassMenuContent } from "@/lib/ControllerDB/crud";
import { PageLoad } from "@/components/page_part/user_side/common/Load";

import { ClassMenuItem } from "@/components/page_part/user_side/common/buttons"

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
            <PageLoad page_title={pageTitle[0].name}/>
            <div class="row-2">
                {menuTemplate.map((group)=>{
                    return (
                        <div class="grid-group">
                            <div class="grid-group-name">{group.name}</div>
                            <div class="grid-group-data">
                                {group.content.map((element)=>{
                                    return(
                                        <ClassMenuItem link={element.link} name={element.name} latin_name={element.latin_name} logo={element.logo}/>
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
