export function getTableHeaders(table){
    let headers = [];

    for(var i=1; i<=table.col_num; i++){
        headers.push({
            head_name: table['col_' + i],
            head_name_short: table['col_' + i + '_short'],
            head_dash: ':---:'
        })
    }

    return headers;
}