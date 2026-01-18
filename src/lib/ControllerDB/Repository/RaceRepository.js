import db from './../db_connection';

export const getRaceMenuGroupContent = () => {
    const sql = `
        select mg.id,
               mg.ticket_type,
               mg.name
          from c_ticket_menu_group mg
               inner join c_ticket_type type on type.id = mg.ticket_type
                          and type.name = 'race'
         order by mg.id
    `;
    return db.prepare(sql).all();
};

export const getRaceMenuContent = (group_id = 1) => {
    const sql = `
        select *
          from c_ticket_menu tm
          where tm.group_id = ${group_id}
    `;
    return db.prepare(sql).all();
};

export const getRaceContent = (race_name = 'Gecon') => {
    const sql = `
        select rt.*
          from c_ticket_menu tm
               inner join c_race_ticket rt on rt.race_id = tm.id
         where tm.latin_name = '${race_name}'
    `;
    return db.prepare(sql).all();
};

export const getRaceContentData = (race_name = 'Gecon') => {
    const sql = `
        select td.*
          from c_ticket_menu tm
               inner join c_ticket_menu_group mg on mg.id = tm.group_id
               inner join c_ticket_type type on type.id = mg.ticket_type
                          and type.name = 'race'
               inner join c_race_ticket rt on rt.race_id = tm.id
               inner join c_ticket_data td on td.ticket_id = rt.ticket_id
            
         where tm.latin_name = '${race_name}'
         order by td.id      
    `;
    return db.prepare(sql).all();
};