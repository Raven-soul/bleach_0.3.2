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
        insert into c_armament_ab_filter_item (
            filter,
            name,
            value
        )
        select ${data.get('type')} as filter,
               '${data.get('name')}' as name,
               '${data.get('value')}' as value
    `;    

    db.exec(sql);
    return true;
};

export const getParamType = () => {
    const sql = `
        select c.id,
               c.ord + 1 as ord,
               c.translate as name,
               c.name as latin_name
          from c_armament_ab_filter c
         where c.ord not null
         order by c.ord
    `;
    return db.prepare(sql).all();
};

export const getLastParam = () => {
    const sql = `
        with t as (
            select *
              from c_armament_ab_filter_item p
             order by p.id desc
             limit 1
        ),

        t_all as (
            select * from t
            
             union all

            select -1 as id,
                   '' as type,
                   '' as name,
                   '' as value,
                   '' as logo
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
            select ab.id as ability_id,
                   case when p.name = 'cost' then ab.cost
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
                   left join c_armament_ab_filter_item ptype on ptype.id = ab.type
                   left join c_armament_ab_filter_item pcost on pcost.id = ab.cost
                   left join c_armament_ab_filter_item phd on phd.id = ab.hd_hollow
                   left join c_armament_ab_filter_item pkind on pkind.id = ab.kind
                   left join c_armament_ab_filter_item pc_time on pc_time.id = ab.casting_time
                   left join c_armament_ab_filter_item prange on prange.id = ab.range
                   left join c_armament_ab_filter_item precharge on precharge.id = ab.recharge
        ),

        t_all as (
            select * from t
            
             union all

            select -1 as ability_id,
                   -1 as id,
                   '' as name,
                   '' as value
        )

        select *
          from t_all ta
         order by ta.ability_id desc
         limit 1
    `;
    return db.prepare(sql).all();
};

export const getParamListByType = (type_id = 1) => {
    const sql = `
        select *
          from c_armament_ab_filter_item p
         where 1 = 1
               and p.filter = ${type_id}
               and p.value <> 'discard'
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

export const insertArmament = (data) => {
       var list = {
              rules: !data.get('rules') ? 0 : 1,
              for_summon: !data.get('for_summon') ? 0 : 1,
              verbal: !data.get('verbal') ? 0 : 1,
              somatic: !data.get('somatic') ? 0 : 1,
              material: !data.get('material') ? 0 : 1,
              released: !data.get('released') ? 0 : 1,
              until_saled: !data.get('until_saled') ? 0 : 1,
              concentration: !data.get('concentration') ? 0 : 1,
              minute_1: !data.get('minute_1') ? 0 : 1,
              minute_2: !data.get('minute_2') ? 0 : 1,
              minute_5: !data.get('minute_5') ? 0 : 1,
              minute_10: !data.get('minute_10') ? 0 : 1,
              round_1: !data.get('round_1') ? 0 : 1,
              round_2: !data.get('round_2') ? 0 : 1,
              round_5: !data.get('round_5') ? 0 : 1,
              instantly: !data.get('instantly') ? 0 : 1,
              hour: !data.get('hour') ? 0 : 1,
              day_2: !data.get('day_2') ? 0 : 1,
              special: !data.get('special') ? 0 : 1
       }
       var a = set_additional_param(list, data.get('material_data'));
       set_armament_ability(data, a[0].id);
       return true;
};

const set_additional_param = (list, material_data) => {
       var md = material_data.replace(/'/g,"''");
    const sql = `
insert into c_param_addition(
       rules,
       for_summon,
        
       verbal,
       somatic,
       material,
       material_data,
       released,
        
       until_saled,
       concentration,
       minute_1,
       minute_2,
       minute_5,
       minute_10,
       round_1,
       round_2,
       round_5,
       instantly,
       hour,
       day_2,
       special
)

select ${list.rules} as rules,
       ${list.for_summon} as for_summon,
        
       ${list.verbal} as verbal,
       ${list.somatic} as somatic,
       ${list.material} as material,
       ${!material_data? null : "'"+ md +"'"} as material_data,
       ${list.released} as released,
        
       ${list.until_saled} as until_saled,
       ${list.concentration} as concentration,
       ${list.minute_1} as minute_1,
       ${list.minute_2} as minute_2,
       ${list.minute_5} as minute_5,
       ${list.minute_10} as minute_10,
       ${list.round_1} as round_1,
       ${list.round_2} as round_2,
       ${list.round_5} as round_5,
       ${list.instantly} as instantly,
       ${list.hour} as hour,
       ${list.day_2} as day_2,
       ${list.special} as special

RETURNING id       
`;
    console.log(sql);
    return db.prepare(sql).all();
};

const set_armament_ability = (data, additional_id) => {
       var name = data.get('name').replace(/'/g,"''");
       var requirements = data.get('requirements').replace(/'/g,"''");
       var dt = data.get('data').replace(/'/g,"''");

    const sql = `
insert into c_armament_ab(
       additional_param,
       
       type,       
       cost,
       hd_hollow,
       kind,
       casting_time,
       range,
       recharge,

       name,
       requirements,
       data
)

select ${additional_id} as additional_param,
       ${!data.get('type')? null:data.get('type')} as type,       
       ${!data.get('cost')? null:data.get('cost')} as cost,
       ${!data.get('hd')? null:data.get('hd')} as hd_hollow,
       ${!data.get('kind')? null:data.get('kind')} as kind,
       ${!data.get('cast_time')? null:data.get('cast_time')} as casting_time,
       ${!data.get('range')? null:data.get('range')} as range,
       ${!data.get('recharge')? null:data.get('recharge')} as recharge,              

       ${!data.get('name')? null : "'" + name + "'"} as name,
       ${!data.get('requirements')? null : "'" + requirements + "'"} as requirements,
       ${!data.get('data')? null : "'" + dt + "'"} as data
`;

console.log(sql);
    db.exec(sql);
    return true;
};

export const getArmamentList = () => {
    const sql = `
select ab.id,
       ab.name,
       ab.edited,
       substring(ab.name, instr(ab.name, '[') + 1, instr(ab.name, ']') - (instr(ab.name, '[') + 1)) as latin_name
 
  from c_armament_ab ab
`;
    return db.prepare(sql).all();
};

export const getArmamentItemAsync = (id) => {
    const sql = `
select ab.id as armament_id,
       additional.id as additional_id,
       additional.rules,
       additional.for_summon,
       additional.verbal,
       additional.somatic,
       additional.material,
       additional.released,
       additional.material_data,
       additional.until_saled,
       additional.concentration,
       additional.minute_1,
       additional.minute_2,
       additional.minute_5,
       additional.minute_10,
       additional.round_1,
       additional.round_2,
       additional.round_5,
       additional.instantly,
       additional.hour,
       additional.day_2,
       additional.special,
       ab.name,
       ab.requirements,
       ab.data,
       ab.type,
       ab.cost,
       ab.hd_hollow,
       ab.kind,
       ab.casting_time,
       ab.range,
       ab.recharge
       
 
  from c_armament_ab ab
       left join c_param_addition additional on additional.id = ab.additional_param
 where ab.id = ${id}
`;
    return db.prepare(sql).all();
};

export function upateArmament(data){
       var list = {
              rules: !data.get('rules') ? 0 : 1,
              for_summon: !data.get('for_summon') ? 0 : 1,
              verbal: !data.get('verbal') ? 0 : 1,
              somatic: !data.get('somatic') ? 0 : 1,
              material: !data.get('material') ? 0 : 1,
              released: !data.get('released') ? 0 : 1,
              until_saled: !data.get('until_saled') ? 0 : 1,
              concentration: !data.get('concentration') ? 0 : 1,
              minute_1: !data.get('minute_1') ? 0 : 1,
              minute_2: !data.get('minute_2') ? 0 : 1,
              minute_5: !data.get('minute_5') ? 0 : 1,
              minute_10: !data.get('minute_10') ? 0 : 1,
              round_1: !data.get('round_1') ? 0 : 1,
              round_2: !data.get('round_2') ? 0 : 1,
              round_5: !data.get('round_5') ? 0 : 1,
              instantly: !data.get('instantly') ? 0 : 1,
              hour: !data.get('hour') ? 0 : 1,
              day_2: !data.get('day_2') ? 0 : 1,
              special: !data.get('special') ? 0 : 1
       }
       
       update_armament_ability(data);
       update_additional_param(list, data);

       return true;
};

const update_armament_ability = (data) => {
       var armament_id = !data.get('armament_id')? null:data.get('armament_id');

       var name = data.get('name').replace(/'/g,"''");
       var requirements = data.get('requirements').replace(/'/g,"''");
       var dt = data.get('data').replace(/'/g,"''");       

    const sql = `
update c_armament_ab
   set name = ${!data.get('name')? null : "'" + name + "'"},
       requirements = ${!data.get('requirements')? null : "'" + requirements + "'"},
       data = ${!data.get('data')? null : "'" + dt + "'"},

       type = ${!data.get('type')? null:data.get('type')},
       cost = ${!data.get('cost')? null:data.get('cost')},
       hd_hollow = ${!data.get('hd')? null:data.get('hd')},
       kind = ${!data.get('kind')? null:data.get('kind')},
       casting_time = ${!data.get('cast_time')? null:data.get('cast_time')},
       range = ${!data.get('range')? null:data.get('range')},
       recharge = ${!data.get('recharge')? null:data.get('recharge')},
       edited = 1
 where case when ${armament_id} notnull then id = ${armament_id} else false end
`;
    db.exec(sql);
    return true;
};

const update_additional_param = (list, data) => {
       var additional_id = !data.get('additional_id')? null:data.get('additional_id');

       var material_data = data.get('material_data')
       var md = material_data.replace(/'/g,"''");       

    const sql = `
update c_param_addition
   set rules = ${list.rules},
       for_summon = ${list.for_summon},
        
       verbal = ${list.verbal},
       somatic = ${list.somatic},
       material = ${list.material},
       material_data = ${!material_data? null : "'"+ md +"'"},
       released = ${list.released},
        
       until_saled = ${list.until_saled},
       concentration = ${list.concentration},
       minute_1 = ${list.minute_1},
       minute_2 = ${list.minute_2},
       minute_5 = ${list.minute_5},
       minute_10 = ${list.minute_10},
       round_1 = ${list.round_1},
       round_2 = ${list.round_2},
       round_5 = ${list.round_5},
       instantly = ${list.instantly},
       hour = ${list.hour},
       day_2 = ${list.day_2},
       special = ${list.special}

 where case when ${additional_id} notnull then id = ${additional_id} else false end
`;
    return db.exec(sql);
};

