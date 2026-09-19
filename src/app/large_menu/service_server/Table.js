export function getTableHeaders(table){
    let headers = [];
    let moveArray = ['Нс', 'Хк', 'Сп'];

    for(var i=1; i<=table.col_num; i++){
        headers.push({
            head_class: 
                (i == 1)? 'hr-min-width-50' : 
                (moveArray.includes(table['col_' + i + '_short']))? 'hr-min-width-60' : 
                '',
            head_name: table['col_' + i],
            head_name_short: table['col_' + i + '_short'],
            head_dash: ':---:'
        });
    }

    return headers;
}