import { getPageTitleTemplate} from "@/lib/ControllerDB/crud";
import { getClassMenuGroupContent, getClassMenuContent } from "@/lib/ControllerDB/Repository/ClassRepository";
import { PageLoad } from "@/components/page_part/user_side/common/Load";

import { PageMenuItem } from "@/components/page_part/user_side/common/buttons"

export default function Class(param) {
  const { data } = param;

  const pageTitle = getPageTitleTemplate();
  const menuTemplate = getClassMenuGroupContent();  

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
                        <div key={'group_' + group.id} class="grid-group">
                            <div class="grid-group-name">{group.name}</div>
                            <div class="grid-group-data">
                                {group.content.map((element)=>{                                    
                                    return(
                                        <PageMenuItem link={element.link} name={element.name} latin_name={element.latin_name} logo={element.logo} key={'menu_item_' + element.id}/>
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
