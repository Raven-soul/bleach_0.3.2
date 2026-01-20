import db from './../db_connection';

export const insertTicketType = (data) => {
    console.log(data.get('name'));
    const sql = `
        
        select '${data.get('name')}' as name,
               '${data.get('discription')}' as discription
    `;    
    return true;
};

//         insert into c_ticket_type(name, discription)
//         select '${data.get('name')}' as name,
//                '${data.get('discription')}' as discription

//db.exec(sql);