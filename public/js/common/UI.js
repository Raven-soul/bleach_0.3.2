function hideChangeChevron(hideTagClassNameWithoutId, chevronClassNameWithoutId, button) {
    let id = button.getAttribute("id");
    let hideTagClassName = "." + hideTagClassNameWithoutId + "-" + id;
    let chevronClassName = "." + chevronClassNameWithoutId + "-" + id;
    if ( $(hideTagClassName).css("display") == "none" ){
        $(hideTagClassName).css("display","block");
        $(chevronClassName).html( "<i class=\"fa-solid fa-chevron-down\"></i>" );
    } else {
        $(hideTagClassName).css("display","none");
        $(chevronClassName).html( "<i class=\"fa-solid fa-chevron-left\"></i>" );
    }
}

function mobileMenuData(list_button_ico, list_exit_ico) {
    $('.menu-block-back').toggleClass('active');
    $('.menu-block').toggleClass('active');
    if($('.list-ico').attr('src')== list_button_ico) {
        $('.list-ico').attr('src', list_exit_ico);
    } else {
        $('.list-ico').attr('src', list_button_ico);
    }   
}

function nestingOrder(order) {
    var result = ''
    if(order > 0) {
        for (let i = 1; i <= order; i++) { // выведет 0, затем 1, затем 2
            result = result + "../";
        }
    }
    else {
        return ''
    }
    return result
}

function specializationBlockHide(hideBlockName, button) {
    var id = button.getAttribute("id");
    $('#'+ id).toggleClass('active');
    $('.'+ hideBlockName + '-' + id).toggleClass('active');
}

function galleryExit(){
    $('.gallery-data-block').toggleClass('active');
}

function galleryShow(image){
    var path = image.getAttribute("src");
    $('.gallery-data-block').toggleClass('active');
    $('#gallery-img').attr("src", path);
}