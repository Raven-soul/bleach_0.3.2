import db from './../db_connection';

export const insertTicketGroup = (data) => {
    console.log(data.get('name'));
    const sql = `
        insert into c_ticket_menu(
            group_id,
            name,
            latin_name,
            logo,
            link
        )
        select '${data.get('group_id')}' as group_id,
               '${data.get('name')}' as name,
               '${data.get('latin_name')}' as latin_name,
               'class/${data.get('logo')}' as logo,
               '/class/${data.get('link')}' as link
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