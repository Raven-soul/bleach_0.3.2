import db from './../db_connection';

export const getClassTableContent = (class_id = 1) => {
    const sql = `
        select *
          from c_table_data td
         where td.head = ${class_id}
         order by td.id
    `;
    return db.prepare(sql).all();
};

export const getClassTable = (class_name = 'Shinigami') => {
    const sql = `
        select tb.*
          from c_ticket_menu tm
               inner join c_ticket_menu_group mg on mg.id = tm.group_id
               inner join c_ticket_type type on type.id = mg.ticket_type
                          and type.name = 'class'
               inner join c_class_ticket ct on ct.class_id = tm.id
               inner join c_table tb on tb.ticket_id = ct.ticket_id
              
         where tm.latin_name = '${class_name}'
    `;
    return db.prepare(sql).all();
};