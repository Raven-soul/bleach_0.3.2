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

export const getLastAbilityParam = (param_name = 'type') => {
    const sql = `
        with t as (
            select case when p.name = 'cost' then ab.cost
                        when p.name = 'cast_time' then ab.casting_time
                        when p.name = 'range' then ab.range
                        when p.name = 'type' then ab.type
                        when p.name = 'recharge' then ab.recharge
                        when p.name = 'kind' then ab.kind
                        when p.name = 'hd' then ab.hd_hollow
                        else ''
                   end as id,
            
                   case when p.name = 'cost' then pcost.name
                        when p.name = 'cast_time' then pc_time.name
                        when p.name = 'range' then prange.name
                        when p.name = 'type' then ptype.name
                        when p.name = 'recharge' then precharge.name
                        when p.name = 'kind' then pkind.name
                        when p.name = 'hd' then phd.name
                        else ''
                   end as name,
                   
                   case when p.name = 'cost' then pcost.value
                        when p.name = 'cast_time' then pc_time.value
                        when p.name = 'range' then prange.value
                        when p.name = 'type' then ptype.value
                        when p.name = 'recharge' then precharge.value
                        when p.name = 'kind' then pkind.value
                        when p.name = 'hd' then phd.value
                        else ''
                   end as val
                   
              from (select '${param_name}' as name) p 
                   left join c_armament_ab ab on true                     
                   left join c_param ptype on ptype.id = ab.type
                   left join c_param pcost on pcost.id = ab.cost
                   left join c_param phd on phd.id = ab.hd_hollow
                   left join c_param pkind on pkind.id = ab.kind
                   left join c_param pc_time on pc_time.id = ab.casting_time
                   left join c_param prange on prange.id = ab.range
                   left join c_param precharge on precharge.id = ab.recharge
        ),

        t_all as (
            select * from t
            
             union all

            select -1 as id,
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

export const getParamListByType = (type_id = 1) => {
    const sql = `
        select *
          from c_param p
         where p.type = ${type_id}
    `;
    return db.prepare(sql).all();
};