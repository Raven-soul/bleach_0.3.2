import Link from 'next/link'
import { getMenuTemplate, getMenuContent, getMenuSectionlist } from "../../lib/ControllerDB/crud";

export async function MenuTemplateList() {
    let selections = await getMenuSectionlist();    
    let template_list = await getMenuTemplate();
    let hide_section = template_list[2].value;
    let chevrone = template_list[3].value;

    for(let i = 0; i < selections.length; i++){
        selections[i]["content"] = await getMenuContent(selections[i].id);
    }

    var p = function(ln) {
        if(ln.show == 1) return (ln.name)
        else return(<strike>{ln.name}</strike>)
    }

    return (
        <div class="row-2 menu-block-load-area">
            {selections.map((selection) => {
                return (
                    <div class="col menu-block-section" key={"section_" + selection.id}>
                        <button onclick="hideChangeChevron('menu-block-section-list', 'menu-block-section-chevron-data', this)" id={selection.id} class="col w-100 px-3 menu-block-section-name-button">
                            <div class="row d-flex justify-content-between">
                                <div class="col label">
                                    {selection.name}
                                </div>
                                <div class={"col-auto d-flex align-items-center "+ chevrone +"-" + selection.id}>
                                    <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                                </div>
                            </div>
                        </button>
                        <div class={"col " + hide_section + " " + hide_section + "-" + selection.id} style={{display: "block"}}>
                            <ul key={"list_" + selection.id}>
                                {selection.content.map((line) => {
                                    return(
                                        <li>
                                            <Link href={line.link} class="w-100 p-0">
                                                <div class="row m-0">
                                                    <div class="col-1 p-0 image-data">
                                                        <i class={line.logo} aria-hidden="true"></i>
                                                    </div>
                                                    <div class="col content-data strike_line">
                                                        {p(line)}
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
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
        <div class="col-auto menu-block px-1">
            <div class="container p-0">
                <MenuTemplateList/>
            </div>
        </div>         
    );
}