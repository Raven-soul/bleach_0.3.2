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

export const insertParam = (data) => {
    console.log(data.get('name'));
    const sql = `
        insert into c_param (
            type,
            name,
            value
        )
        select ${data.get('type')} as type,
               '${data.get('name')}' as name,
               '${data.get('value')}' as value
    `;    

    db.exec(sql);
    return true;
};

export const getParamType = () => {
    const sql = `
        select *
          from c_param_type
    `;
    return db.prepare(sql).all();
};

export const getLastParam = () => {
    const sql = `
        with t as (
            select *
              from c_param p
             order by p.id desc
             limit 1
        ),

        t_all as (
            select * from t
            
             union all

            select -1 as id,
                   '' as type,
                   '' as name,
                   '' as value
        )

        select *
          from t_all ta
         order by ta.id desc
         limit 1
        
    `;
    return db.prepare(sql).all();
};