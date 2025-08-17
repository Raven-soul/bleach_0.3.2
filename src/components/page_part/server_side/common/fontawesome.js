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
    faBan
} from '@fortawesome/free-solid-svg-icons'

import { 
    faFileLines 
} from '@fortawesome/free-regular-svg-icons'
// import { faThumbsUp } from '@fortawesome/free-brands-svg-icons'

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
        default:
            icon = faBan;
    }

    return(
        <FontAwesomeIcon icon={icon} className={className} style={style}/>
    )
}