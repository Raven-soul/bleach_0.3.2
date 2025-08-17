import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
// import { faThumbsUp } from '@fortawesome/free-brands-svg-icons'
// import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

export function Icon({name, className, style}){
    console.log(name);
    let icon;

    switch (name) {
        case 'faChevronDown':
            icon = faChevronDown;
            break;
        case 'faChevronLeft':
            icon = faChevronLeft;
            break;
        default:
            icon = faThumbsUp;
    }

    return(
        <FontAwesomeIcon icon={icon} className={className} style={style}/>
    )
}