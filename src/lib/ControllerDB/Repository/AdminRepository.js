import db from './../db_connection';

export const insertTicketType = (data) => {
    console.log(data.get('name'));
    const sql = `
        insert into c_ticket_type(name, discription)
        select '${data.get('name')}' as name,
               '${data.get('discription')}' as discription
    `;    

    db.exec(sql);
    return true;
};

export const getTicketMenuGroup = (ticket_type = 'class') => {
    const sql = `
        select mg.id,
               mg.name
            from c_ticket_menu_group mg 
                left join c_ticket_type type on type.id = mg.ticket_type
            where type.name = '${ticket_type}'
    `;
    return db.prepare(sql).all();
};