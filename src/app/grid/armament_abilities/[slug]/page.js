import { getArmamentIdList, getArmamentData } from "@/lib/ControllerDB/Repository/ArmamentRepository";
import { PageLoad } from '@/components/page_part/common/user_side/Load';
import { Logo } from './user_side';

export function generateStaticParams() {
    const pages = getArmamentIdList();
    return pages.map((page) => ({ slug: page }));
}

export default async function Page({ params }) {
    const { slug } = await params

    const Armament = getArmamentData(slug)[0];

    var display_property = (Armament.translate != null)? "none" : "display";

//-----------------------------------------------------------------

    return (
        <div className="row-2">            
            <div className="col chapter-title-mobile">{Armament.ab_name}</div>
            <div className="col">
                <PageLoad page_title={Armament.ab_name} />
                <div className={"race-class-data-area " + Armament.kind_class_name}>
                    <div className="col armament-data">
                        <p  className="name">
                            <span>{Armament.ab_name}</span>
                        </p>
                        <p className="cost-type half-gray">
                            <span>стоимость {Armament.cost_name}, </span>
                            <span>
                                <span>тип {Armament.type_name}  </span> 
                                <Logo name={Armament.type_logo}/>
                            </span>
                        </p>
                        {(()=>{
                            if(Armament.rules == 1){
                                return(
                                    <div>
                                        <p>
                                            <span className="param">Время накладывания:</span>
                                            <span> </span>
                                            <span className="half-gray">{Armament.cast_time_name}</span>
                                        </p>
                                        <p>
                                            <span className="param">Дистанция:</span>
                                            <span> </span>
                                            <span className="half-gray">{Armament.distance_name}</span>
                                        </p>
                                        <p>
                                            <span className="param">Компоненты:</span>
                                            <span> </span>
                                            <span className="half-gray">{Armament.components} {Armament.material_data}</span>
                                        </p>
                                        <p>
                                            <span className="param">Длительность:</span>
                                            <span> </span>
                                            <span className="half-gray">{Armament.durations}</span>
                                        </p>
                                        <p>
                                            <span className="param">Перезарядка:</span>
                                            <span> </span>
                                            <span className="half-gray">{Armament.recharge_name}</span>
                                        </p>
                                    </div>
                                )
                            }
                            else {
                                <div></div>
                            }
                        })()}
                        
                    </div>
                    <div className="col armament-content">
                        <div dangerouslySetInnerHTML={{ __html: Armament.translate }}></div>
                    </div>
                    <div className="col armament-content" style={{display: display_property}}>
                        <div dangerouslySetInnerHTML={{ __html: Armament.data }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}