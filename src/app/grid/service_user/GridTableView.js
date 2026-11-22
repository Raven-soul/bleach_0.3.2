'use client';

import $ from "jquery"

import Link from 'next/link'
import { Icon } from '@/components/page_part/service_server/fontawesome'

export function GridData({grid}){
    if(grid == null) return(<></>)
    else return (
        <div className="grid-abilities-data">
            {grid.map((element)=>{
                return(
                    <div className="grid-abilities-item px-1" id={element.record_type + '_' + element.id} key={element.record_type + '_key_' + element.id}>
                        {/* <Link href={element.link + '/' + element.id} className="abilities-info-block">
                            {element.param_list.map(param =>{
                                return(
                                    <div hidden className={param.name} value={param.value} key={'key_' + param.name + '_' + param.value}></div>
                                )
                            })}

                            <div className="row abilities-info-block-data">
                                <div className="col left-align-data">                                                                                            
                                    <span className="level">
                                        <span className="gray-font">[</span>{element.cost_name}<span className="gray-font">]</span>
                                    </span>
                                    <span className="school-logo">
                                        <Icon name={element.type_logo}/>
                                    </span>
                                    <span className="kind-logo">
                                        {(()=>{
                                            if(element.kind_value_logo != 'null') {
                                                return(<Icon name={element.kind_value_logo}/>)
                                            }
                                        })()}
                                    </span>
                                    <span className="summon-logo">
                                        {(()=>{
                                            if(element.is_summon == '1') {
                                                return(<Icon name={'faPaw'}/>)
                                            }
                                        })()}
                                    </span>
                                    <span className="name">{element.ab_name}</span>
                                </div>
                                <div className="col-auto components">
                                    {(()=>{
                                        if(element.is_requirements == true){
                                            return(<><Icon name={'faBookmark'}/>{element.components}</>)
                                        }
                                        else {
                                            return(<>{element.components}</>)
                                        }
                                    })()}
                                    
                                </div>
                            </div>  
                            <hr className="abilities-hr-gradient"/>

                        </Link> */}
                        data
                    </div>
                )
            })}
        </div>
    )
}