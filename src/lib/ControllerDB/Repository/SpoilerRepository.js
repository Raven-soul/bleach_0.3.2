import db from './../db_connection';

export const getClassSpoilersContent = (spoiler_id = 1) => {
    const sql = `
        select sd.*
          from c_spoiler sp 
               inner join c_spoiler_data sd on sd.spoiler_id = sp.id
              
         where sp.id = ${spoiler_id}
         order by sd.id
    `;
    return db.prepare(sql).all();
};

export const getClassSpoilers = (class_name = 'Shinigami',is_special = 0) => {
    // is_special - определяет особые спойлеры, которые находятся в теле страницы
    // 0 - обычные спойлеры в конце страницы
    // 1 - особые спойлеры в теле страницы
    
    const sql = `
        select sp.*
          from c_ticket_menu tm
               inner join c_ticket_menu_group mg on mg.id = tm.group_id
               inner join c_ticket_type type on type.id = mg.ticket_type
                          and type.name = 'class'
               inner join c_class_ticket ct on ct.class_id = tm.id
               inner join c_spoiler sp on sp.ticket_id = ct.ticket_id
               
         where 1=1
               and tm.latin_name = '${class_name}'
               and sp.is_special = ${is_special}
         order by sp.id 
    `;
    return db.prepare(sql).all();
};