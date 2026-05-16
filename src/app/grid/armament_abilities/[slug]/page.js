import { getArmamentIdList, getArmamentData } from "@/lib/ControllerDB/Repository/ArmamentRepository";
import { PageLoad } from '@/components/page_part/common/user_side/Load';

export function generateStaticParams() {
    const pages = getArmamentIdList();
    return pages.map((page) => ({ slug: page }));
}

export default async function Page({ params }) {
    const { slug } = await params

    const Armament = getArmamentData(slug)[0];
//-----------------------------------------------------------------

    return (
        <div className="row-2">
            <div className="col chapter-title-mobile">{Armament.ab_name}</div>
            <div className="col">
                <PageLoad page_title={Armament.ab_name} />
                <div className="race-class-data-area">
                    <div className="col armament-data">
                        <p  className="name">
                            <span>{Armament.ab_name}</span>
                        </p>
                        <p className="cost-type half-gray">
                            <span>стоимость {Armament.cost_name}, </span>
                            <span>тип {Armament.type_name}</span>
                        </p>
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
                            <span className="half-gray">{Armament.cost_name} {Armament.material_data}</span>
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
                    <div className="col">
                        {Armament.data}
                    </div>
                    <div className="col" style={{visibility: "hidden"}}>
                        <p>data</p>
                    </div>
                </div>
            </div>
        </div>
    )
}