import db from './../db_connection';

export const getClassContentData = (class_name = 'Shinigami') => {
    const sql = `
        select td.*
          from c_ticket_menu tm
               inner join c_ticket_menu_group mg on mg.id = tm.group_id
               inner join c_ticket_type type on type.id = mg.ticket_type
                          and type.name = 'class'
               inner join c_class_ticket ct on ct.class_id = tm.id
               inner join c_ticket_data td on td.ticket_id = ct.ticket_id
            
         where tm.latin_name = '${class_name}'
         order by td.id      
    `;
    return db.prepare(sql).all();
};

export const getClassContent = (class_name = 'Shinigami') => {
    const sql = `
        select rt.*
          from c_ticket_menu tm
               inner join c_class_ticket rt on rt.class_id = tm.id
         where tm.latin_name = '${class_name}'
    `;
    return db.prepare(sql).all();
};

export const getClassMenuGroupContent = () => {
    const sql = `
        select mg.id,
               mg.ticket_type,
               mg.name
          from c_ticket_menu_group mg
               inner join c_ticket_type type on type.id = mg.ticket_type
                          and type.name = 'class'
         order by mg.id
    `;
    return db.prepare(sql).all();
};

export const getClassMenuContent = (group_id = 1) => {
    const sql = `
        select tm.id,
               tm.group_id,
               tm.name,
               tm.latin_name,
               tm.logo,
               menu.link || tm.link as link
          from c_ticket_menu tm
               left join c_ticket_menu_group menu_group on menu_group.id = tm.group_id
               left join c_menu menu on menu.id = menu_group.menu_id
               
         where menu_group.id = ${group_id}
    `;
    return db.prepare(sql).all();
};

