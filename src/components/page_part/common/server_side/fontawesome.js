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
    faPersonWalking

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

export function Icon({name, className, style}){
    let icon;

    switch (name) {
        case 'faChevronDown':
            icon = faChevronDown;break;
        case 'faChevronLeft':
            icon = faChevronLeft; break;
        case 'faChevronUp':
            icon = faChevronUp;break;

        case 'faCircleNotch':
            icon = faCircleNotch; break;
        case 'faUserGroup':
            icon = faUserGroup; break;
        case 'faPersonDigging':
            icon = faPersonDigging; break;
        case 'faFileLines':
            icon = faFileLines; break;
        case 'faLightbulb':
            icon = faLightbulb; break;
        case 'faGhost':
            icon = faGhost; break;
        case 'faFire':
            icon = faFire; break;
        case 'faHexagonNodes':
            icon = faHexagonNodes; break;
        case 'faShieldHalved':
            icon = faShieldHalved; break;
        case 'faToolbox':
            icon = faToolbox; break;
        case 'faFlag':
            icon = faFlag; break;
        case 'faEarthAmericas':
            icon = faEarthAmericas; break;
            
        case 'faCircleXmark':
            icon = faCircleXmark; break;

        case 'faSoap': 
            icon = faSoap; break;    
        case 'faDroplet': 
            icon = faDroplet; break;
        case 'faDownLeftAndUpRightToCenter': 
            icon = faDownLeftAndUpRightToCenter; break;  
        case 'faCircle': 
            icon = faCircle; break;   
        case 'faCube': 
            icon = faCube; break;    
        case 'faMaximize': 
            icon = faMaximize; break;  
        case 'faWeightHanging': 
            icon = faWeightHanging; break; 
        case 'faHeartPulse': 
            icon = faHeartPulse; break;  
        case 'faMoon': 
            icon = faMoon; break;    
        case 'faEye': 
            icon = faEye; break;   
        case 'faEyeSlash':
            icon = faEyeSlash; break;
        case 'regular_faEye': 
            icon = regular_eye; break;   
        case 'regular_faEyeSlash':
            icon = regular_eye_slash; break; 
        case 'faDrupal': 
            icon = faDrupal; break;   
        case 'faSun': 
            icon = faSun; break;     
        case 'faBolt': 
            icon = faBolt; break;     
        case 'faArrowsDownToLine': 
            icon = faArrowsDownToLine; break;
        case 'faSkull': 
            icon = faSkull; break; 
        case 'faCrosshairs': 
            icon = faCrosshairs; break;
        case 'faBell': 
            icon = faBell; break;    
        case 'faPaw': 
            icon = faPaw; break;      
        case 'faWater': 
            icon = faWater; break;
        case 'faThermometer': 
            icon = faThermometer; break;
        case 'faSnowflake': 
            icon = faSnowflake; break;
        case 'faWind': 
            icon = faWind; break;
        case 'faSquareFull': 
            icon = faSquareFull; break;
        
        case 'solid_star': 
            icon = solid_star; break;
        case 'regular_star': 
            icon = regular_star; break;
        case 'faExplosion':
            icon = faExplosion; break;
        case 'faUpLong':
            icon = faUpLong; break;
        case 'faCircleUp':
            icon = faCircleUp; break;
        case 'faSquareCaretUp':
            icon = faSquareCaretUp; break;
        case 'faSquareBluesky':
            icon = faSquareBluesky; break;
        case 'faBookmark':
            icon = faBookmark; break;
        case 'faItunesNote':
            icon = faItunesNote; break;
        case 'faFan':
            icon = faFan; break;
            
        case 'faSplotch':
            icon = faSplotch; break;
        case 'faPerson':
            icon = faPerson; break;
        case 'faSith':
            icon = faSith; break;
        case 'faArrowsSplitUpAndLeft':
            icon = faArrowsSplitUpAndLeft; break;
        case 'faHandBackFist':
            icon = faHandBackFist; break;
        case 'faPersonWalking':
            icon = faPersonWalking; break;

        default:
            icon = faBan;
    }

    return(
        <FontAwesomeIcon icon={icon} className={className} style={style}/>
    )
}