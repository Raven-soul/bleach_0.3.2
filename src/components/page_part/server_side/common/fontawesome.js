import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faChevronDown, 
    faChevronLeft, 
    faCircleNotch, 
    faUserGroup,
    faPersonDigging,
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
    faSun,
    faBolt,
    faArrowsDownToLine,
    faSkull,
    faCrosshairs,
    faBell,
    faPaw,
    faWater,
    faThermometer,
    faWind

} from '@fortawesome/free-solid-svg-icons'

import { 
    faFileLines,
    faCircleXmark,
    faSnowflake
} from '@fortawesome/free-regular-svg-icons'

import { 
    faDrupal 
} from '@fortawesome/free-brands-svg-icons'

export function Icon({name, className, style}){
    let icon;

    switch (name) {
        case 'faChevronDown':
            icon = faChevronDown;break;
        case 'faChevronLeft':
            icon = faChevronLeft; break;

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

        default:
            icon = faBan;
    }

    return(
        <FontAwesomeIcon icon={icon} className={className} style={style}/>
    )
}