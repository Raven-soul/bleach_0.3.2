import { getPageTitleTemplate} from "@/lib/ControllerDB/crud";
import { getRaceMenuGroupContent, getRaceMenuContent } from "@/lib/ControllerDB/Repository/RaceRepository";
import { PageLoad } from "@/components/page_part/user_side/common/Load";

import { PageMenuItem } from "@/components/page_part/user_side/common/buttons"

export default function Race(param) {
  const { data } = param;

  const pageTitle = getPageTitleTemplate('race');
  const menuTemplate = getRaceMenuGroupContent();  

  for(let i = 0; i < menuTemplate.length; i++){
        menuTemplate[i]["content"] = getRaceMenuContent(menuTemplate[i].id);
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
                                        <PageMenuItem link={element.link} name={element.name} latin_name={element.latin_name} logo={element.logo}/>
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
