import { getMenuTemplate, getMenuContent, getMenuSectionlist } from "@/lib/ControllerDB/crud";
import { ChevronМenuButton, Menu_stroke_link } from "@/components/page_part/user_side/common/buttons"

export async function MenuTemplateList() {
    let selections = await getMenuSectionlist();    
    let template_list = await getMenuTemplate();
    let hide_section = template_list[2].value;
    let chevrone = template_list[3].value;

    for(let i = 0; i < selections.length; i++){
        selections[i]["content"] = await getMenuContent(selections[i].id);
    }

    return (
        <div className="row-2 menu-block-load-area">
            {selections.map((selection) => {
                return (
                    <div className="col menu-block-section" key={"section_" + selection.id}>
                        <ChevronМenuButton selection_id={selection.id} selection_name={selection.name} chevrone={chevrone} hide_section={hide_section}/>
                        <div className={"col " + hide_section + " " + hide_section + "-" + selection.id} style={{display: "block"}}>
                            <ul key={"list_" + selection.id}>
                                {selection.content.map((line) => {
                                    return(
                                        <Menu_stroke_link link={line.link} logo={line.logo} show={line.show} name={line.name} key={'line_' + line.cm_id}/>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export function Menu(){
    return (
        <div className="col-auto menu-block px-1">
            <div className="container p-0">
                <MenuTemplateList/>
            </div>
        </div>         
    );
}