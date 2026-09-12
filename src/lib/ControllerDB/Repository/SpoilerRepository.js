import db from './../db_connection';

export const getClassSpoilersContent = (spoiler_id = 1) => {
    const sql = `
        select se.id,
               se.spoiler_id,
               se.h5_tag,
               se.name,
               se.requirements,
               se.value

          from c_spoiler sp 
               inner join c_spoiler_element se on se.spoiler_id = sp.id
              
         where sp.id = ${spoiler_id}
         order by se.id
    `;
    return db.prepare(sql).all();
};

export const getClassSpoilers = (class_name = 'Shinigami', type_name = 'common') => {
    // common - обычные спойлеры в конце страницы
    // special - особые спойлеры в теле страницы
    
    const sql = `
        select sp.id,
               sp.ticket_id,
               sp.name,
               sp.description,
               sp_type.name as type_name

          from c_ticket_menu tm
               inner join c_ticket_menu_group mg on mg.id = tm.group_id
               inner join c_ticket_type type on type.id = mg.ticket_type
                          and type.name = 'class'
               inner join c_ticket_record_class ct on ct.class_id = tm.id
               inner join c_spoiler sp on sp.ticket_id = ct.ticket_id
                left join c_spoiler_type sp_type on sp_type.id = sp.spoiler_type
               
         where 1=1
               and tm.latin_name = '${class_name}'
               and sp_type.name = '${type_name}'
         order by sp.id 
    `;
    return db.prepare(sql).all();
};