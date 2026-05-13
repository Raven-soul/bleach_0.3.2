import { getArmamentIdList } from "@/lib/ControllerDB/Repository/ArmamentRepository";
import { PageLoad } from '@/components/page_part/common/user_side/Load';

export function generateStaticParams() {
    const pages = getArmamentIdList();
    return pages.map((page) => ({ slug: page }));
}

export default async function Page({ params }) {
    const { slug } = await params
//-----------------------------------------------------------------

    return (
        <div className="row-2">
            <div className="col chapter-title-mobile">{'data'}</div>
            <div className="col">
                <PageLoad page_title={'data'} />
                <div className="race-class-data-area">
                    <div className="col armament-data">
                        <p  className="name">
                            <span>@@ARMAMENTNAME@@</span>
                        </p>
                        <p className="cost-type half-gray">
                            <span>стоимость @@ARMAMENTCOST@@,</span>
                            <span>тип @@ARMAMENTTYPE@@</span>
                        </p>
                        <p>
                            <span className="param">Время накладывания:</span>
                            <span> </span>
                            <span className="half-gray">@@ARMAMENTCASTINGTIME@@</span>
                        </p>
                        <p>
                            <span className="param">Дистанция:</span>
                            <span> </span>
                            <span className="half-gray">@@ARMAMENTRANGE@@</span>
                        </p>
                        <p>
                            <span className="param">Компоненты:</span>
                            <span> </span>
                            <span className="half-gray">@@ARMAMENTCOMPONENTS@@</span>
                        </p>
                        <p>
                            <span className="param">Длительность:</span>
                            <span> </span>
                            <span className="half-gray">@@ARMAMENTDURATION@@</span>
                        </p>
                        <p>
                            <span className="param">Перезарядка:</span>
                            <span> </span>
                            <span className="half-gray">@@ARMAMENTRECHARGE@@</span>
                        </p>
                    </div>
                    <div className="col">
                        @@ARMAMENTDESCRIPTIONDATA@@
                    </div>
                    <div className="col" style={{visibility: "hidden"}}>
                        <p>data</p>
                    </div>
                </div>
            </div>
        </div>
    )
}