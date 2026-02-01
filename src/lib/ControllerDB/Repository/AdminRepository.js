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
        select c.id,
               c.name,
               c.latin_name
          from c_param_type c
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

export const getAdditionalParamList = (group_id = 1) => {
    const sql = `
        with t as (
            select 1 as group_id,
                   'rules' as value,
                   'по правилам' as name
            union all
            
            select 1 as group_id,
                   'for_summon' as value,
                   'для призыва' as name 
            union all
            
            select 2 as group_id,
                   'verbal' as value,
                   'вербальный' as name
            union all
            
            select 2 as group_id,
                   'somatic' as value,
                   'соматический' as name
            union all
            
            select 2 as group_id,
                   'material' as value,
                   'материальный' as name
            union all
            
            select 2 as group_id,
                   'released' as value,
                   'высвобождение' as name
            union all
            
            select 3 as group_id,
                   'until_saled' as value,
                   'до отмены' as name
            union all
            
            select 3 as group_id,
                   'concentration' as value,
                   'концентрация' as name
            union all
            
            select 3 as group_id,
                   'minute_1' as value,
                   '1 минута' as name
            union all
            
            select 3 as group_id,
                   'minute_2' as value,
                   '2 минуты' as name
            union all
            
            select 3 as group_id,
                   'minute_5' as value,
                   '5 минут' as name
            union all
            
            select 3 as group_id,
                   'minute_10' as value,
                   '10 минут' as name
            union all
            
            select 3 as group_id,
                   'round_1' as value,
                   '1 раунд' as name
            union all
            
            select 3 as group_id,
                   'round_2' as value,
                   '2 раунда' as name
            union all
            
            select 3 as group_id,
                   'round_5' as value,
                   '5 раундов' as name
            union all
            
            select 3 as group_id,
                   'instantly' as value,
                   'мгновенно' as name
            union all
            
            select 3 as group_id,
                   'hour' as value,
                   'час' as name
            union all
            
            select 3 as group_id,
                   'day_2' as value,
                   '2 дня' as name
            union all
            
            select 3 as group_id,
                   'special' as value,
                   'особый промежуток' as name 
        )

        select row_number() over(order BY t.group_id) as id,               
               t.*
          from t t
         where t.group_id = ${group_id}
    `;
    return db.prepare(sql).all();
};

export const getAdditionalGroupList = () => {
    const sql = `
        select 1 as id,
               'Определение' as name 
        union all
        
        select 2 as id,
               'Компоненты' as name 
        union all
        
        select 3 as id,
               'Длительность' as name 
    `;
    return db.prepare(sql).all();
};