import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faChevronDown, 
    faChevronLeft, 
    faChevronUp, 
    faCircleNotch, 
    faUserGroup,
    faPersonDigging,
    faPerson,
    faLightbulb,
    faGhost,
    faFire,
    faHexagonNodes,
    faShieldHalved,
    faToolbox,
    faFlag,
    faEarthAmericas,
    faBan,
    faX,
    faSoap,
    faDroplet,
    faDownLeftAndUpRightToCenter,
    faCircle,
    faCube,
    faMaximize,
    faWeightHanging,
    faHeartPulse,
    faMoon,
    faEye,
    faEyeSlash,
    faSun,
    faBolt,
    faArrowsDownToLine,
    faArrowsSplitUpAndLeft,
    faSkull,
    faCrosshairs,
    faBell,
    faPaw,
    faWater,
    faThermometer,
    faWind,
    faStar as solid_star,
    faExplosion,
    faSquareFull,
    faUpLong,
    faCircleUp,
    faSquareCaretUp,
    faFan,
    faSplotch,
    faHandBackFist,
    faPersonWalking,
    faRocket,
    faInfinity,
    faLeaf

} from '@fortawesome/free-solid-svg-icons'

import { 
    faFileLines,
    faCircleXmark,
    faSnowflake,
    faStar as regular_star,
    faBookmark,
    faEye as regular_eye,
    faEyeSlash as regular_eye_slash,

} from '@fortawesome/free-regular-svg-icons'

import { 
    faDrupal,
    faSquareBluesky,
    faItunesNote,
    faSith
} from '@fortawesome/free-brands-svg-icons'

export function Icon({name, className = '', style}){
    
    let map = new Map([
        //#region Chevron
        ['faChevronDown', faChevronDown],
        ['faChevronLeft', faChevronLeft],
        ['faChevronUp', faChevronUp],
        //#endregion

        //#region Circle
        // круг с разрывом сверху
        ['faCircleNotch', faCircleNotch],
        // круг с крестиком внутри
        ['faCircleXmark', faCircleXmark],
        // круг закрашеный со стрелочкой внутри, стрелка смотрит вверх
        ['faCircleUp', faCircleUp],
        // круг закрашеный
        ['faCircle', faCircle],
        //#endregion

        //#region Arrows
        // две стрелочки смотрят в центр из углов диагонали
        ['faDownLeftAndUpRightToCenter', faDownLeftAndUpRightToCenter],
        // 4 стрелочки смотрят в углы квадрата из центра
        ['faMaximize', faMaximize],
        // две стрелочки смотрят вниз в горизонтальную линию
        ['faArrowsDownToLine', faArrowsDownToLine],
        // жирная стрелочка смотрит вверх
        ['faUpLong', faUpLong],
        // изогнутые стрелочки идут из одной точки, поворачивают вверх и влево
        ['faArrowsSplitUpAndLeft', faArrowsSplitUpAndLeft],
        //#endregion

        //#region Eye
        // глаз закрашенный
        ['faEye', faEye],
        // глаз закрашенный перечекнутый
        ['faEyeSlash', faEyeSlash],
        // глаз
        ['regular_faEye', regular_eye],
        // глаз перечеркнутый
        ['regular_faEyeSlash', regular_eye_slash],
        //#endregion
        
        //#region Elements
        // пламя
        ['faFire', faFire],
        // три волнообразных полоски друг под другом, волны
        ['faWater', faWater],
        // три горизонтальные полоски, загнуты справа, ветер
        ['faWind', faWind],
        // луна
        ['faMoon', faMoon],
        // солнце
        ['faSun', faSun],
        // молния
        ['faBolt', faBolt],
        //#endregion

        //#region People
        // два человечка портреты
        ['faUserGroup', faUserGroup],
        // копатель
        ['faPersonDigging', faPersonDigging],
        // человечек целиком (мальчик)
        ['faPerson', faPerson],
        // бегущий человечек
        ['faPersonWalking', faPersonWalking],
        //#endregion
        
        //#region Square
        // закрашенный квадрат
        ['faSquareFull', faSquareFull],
        // квадрат закрашенный с треугольником внутри
        ['faSquareCaretUp', faSquareCaretUp],
        // квадрат закрашенный с бабочкой внутри
        ['faSquareBluesky', faSquareBluesky],        
        // трехмерный кубик
        ['faCube', faCube],
        //#endregion

        //#region Simple
        // лампочка закрашенная
        ['faLightbulb', faLightbulb],
        // призрак закрашенный
        ['faGhost', faGhost],
        // документ со строками
        ['faFileLines', faFileLines],
        // щит
        ['faShieldHalved', faShieldHalved],
        // коробка с инструментами
        ['faToolbox', faToolbox],
        // флаг
        ['faFlag', faFlag],
        //капля закрашенная
        ['faDroplet', faDroplet],
        // гиря (груз)
        ['faWeightHanging', faWeightHanging],
        // череп
        ['faSkull', faSkull],
        // закрашенный колокол
        ['faBell', faBell],
        // лапка
        ['faPaw', faPaw],
        // снежинка
        ['faSnowflake', faSnowflake],        
        // звезда закрашенная 
        ['solid_star', solid_star],
        // звезда
        ['regular_star', regular_star],
        // закладка
        ['faBookmark', faBookmark],
        // нота
        ['faItunesNote', faItunesNote],
        // крестик
        ['faX', faX],
        // бесконечность
        ['faInfinity', faInfinity],
        //#endregion

        //#region Complex
        // модель молекулы с палочками и шариками в виде шестиугольника
        ['faHexagonNodes', faHexagonNodes],
        // планета
        ['faEarthAmericas', faEarthAmericas],
        // мыло
        ['faSoap', faSoap],
        // капля с прожилками внутри
        ['faDrupal', faDrupal],
        // сердце с пульсом внутри
        ['faHeartPulse', faHeartPulse],
        // перекрестие прицела
        ['faCrosshairs', faCrosshairs],
        // термометр
        ['faThermometer', faThermometer],
        // взрыв
        ['faExplosion', faExplosion],
        // крыльчатка венилятора (используется как лезвие)
        ['faFan', faFan],
        // клякса
        ['faSplotch', faSplotch],
        // ситх
        ['faSith', faSith],
        // кулак закрашенный
        ['faHandBackFist', faHandBackFist],
        // ракета
        ['faRocket', faRocket],
        // древесный листик
        ['faLeaf', faLeaf],
        //#endregion
        
        ['default', faBan]
    ])
    
    let icon = map.get(name); 
    
    if(typeof icon === 'undefined') icon = map.get('default');

    return(
        <FontAwesomeIcon icon={icon} className={className} style={style}/>
    )
}