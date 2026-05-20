import db from './../db_connection';

export const insertTicketGroup = (data) => {
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
            select p.id,
                   p.filter as type,
                   p.name,
                   p.value,
                   p.logo
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
          from c_armament_ab_filter_item item
         where 1 = 1
               and item.filter = ${type_id}
               and item.value <> 'discard'
         order by coalesce(item.ord, item.id)
    `;
    return db.prepare(sql).all();
};

export const getAdditionalParamList = (group_id = 1) => {
    const sql = `
        with t as (
            select 1 as group_id,
                   -2 as id,
                   'rules' as value,
                   'по правилам' as name
            union all
            
            select 1 as group_id,
                   -1 as id,
                   'summon' as value,
                   'для призыва' as name 
            union all
            
            select *
              from (
                        select 2 as group_id,
                            item.id,
                            item.value,
                            item.name
                       from c_armament_ab_filter_item item
                      where 1=1
                            and item.filter = 6
                            and item.value <> 'discard'
                      order by item.ord
                    ) t
            
            union all
            
            select *
              from (
                        select 3 as group_id,
                            item.id,
                            item.value,
                            item.name
                       from c_armament_ab_filter_item item
                      where 1=1
                            and item.filter = 7
                            and item.value <> 'discard'
                      order by item.ord
                    ) t
        )

        select t.*
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

export const getArmamentInfo = () => {
    const sql = `
        select (select count(t.id) as val from c_armament_ab t) as ab_length,
               ab.name,
               item.name as type_name
          from c_armament_ab ab
               left join c_armament_ab_filter_item item on item.id = ab.type
         where ab.show = 1
         order by ab.id desc
         limit 1
    `;
    return db.prepare(sql).all();
};

export const insertArmament = (data) => {
    var list = {
        rules: !data.get('rules') ? 0 : 1,
        summon: !data.get('summon') ? 0 : 1,

        verbal: !data.get('verbal') ? 0 : 1,
        somatic: !data.get('somatic') ? 0 : 1,
        material: !data.get('material') ? 0 : 1,
        released: !data.get('released') ? 0 : 1,

        until_saled: !data.get('until_sealed') ? 0 : 1,
        concentration: !data.get('concentration') ? 0 : 1,
        minute_1: !data.get('minute1') ? 0 : 1,
        minute_2: !data.get('minute2') ? 0 : 1,
        minute_5: !data.get('minute5') ? 0 : 1,
        minute_10: !data.get('minute10') ? 0 : 1,
        round_1: !data.get('round1') ? 0 : 1,
        round_2: !data.get('round2') ? 0 : 1,
        round_5: !data.get('round5') ? 0 : 1,
        instantly: !data.get('instantaneous') ? 0 : 1,
        hour1: !data.get('hour1') ? 0 : 1,
        hour10: !data.get('hour10') ? 0 : 1,
        day_2: !data.get('day2') ? 0 : 1,
        special: !data.get('special') ? 0 : 1
    }

    var armament_id = !data.get('armament_id') ? null : data.get('armament_id');
    if (!armament_id) {
        set_armament_ability(data, list);
    }
    else {
        update_armament_ability(data, list);
    }


    // var a = set_additional_param(list, data.get('material_data'));
    // set_armament_ability(data, a[0].id);
    return true;
};

const set_armament_ability = (data, list) => {
    var md = data.get('material_data').replace(/'/g, "''");
    var name = data.get('name').replace(/'/g, "''");
    var requirements = data.get('requirements').replace(/'/g, "''");
    var dt = data.get('data').replace(/'/g, "''");

    const sql = `
insert into c_armament_ab(
       type,       
       cost,
       hd_hollow,
       kind,
       casting_time,
       range,
       recharge,

       material_data,
       name,
       requirements,
       data,
       
       duration,
       components,

       rules,
       summon
)

select ${!data.get('type') ? null : data.get('type')} as type,       
       ${!data.get('cost') ? null : data.get('cost')} as cost,
       ${!data.get('hd') ? null : data.get('hd')} as hd_hollow,
       ${!data.get('kind') ? null : data.get('kind')} as kind,
       ${!data.get('cast_time') ? null : data.get('cast_time')} as casting_time,
       ${!data.get('range') ? null : data.get('range')} as range,
       ${!data.get('recharge') ? null : data.get('recharge')} as recharge,              
       
       ${!data.get('material_data') ? null : "'" + md + "'"} as material_data,
       ${!data.get('name') ? null : "'" + name + "'"} as name,
       ${!data.get('requirements') ? null : "'" + requirements + "'"} as requirements,
       ${!data.get('data') ? null : "'" + dt + "'"} as data,

       (select string_agg(item.id, ',') as val
              from c_armament_ab_filter_item item
             where 1=1
                   and item.filter = 7
                   and item.value <> 'discard'
                   and item.value in 
                   ( select t.name as value
                       from ( select ${list.until_saled} as value, 'until_sealed' as name union all
                              select ${list.concentration} as value, 'concentration' as name union all
                              select ${list.minute_1} as value, 'minute1' as name union all
                              select ${list.minute_2} as value, 'minute2' as name union all                              
                              select ${list.minute_5} as value, 'minute5' as name union all
                              select ${list.minute_10} as value, 'minute10' as name union all
                              select ${list.round_1} as value, 'round1' as name union all                              
                              select ${list.round_2} as value, 'round2' as name union all
                              select ${list.round_5} as value, 'round5' as name union all
                              select ${list.instantly} as value, 'instantaneous' as name union all
                              select ${list.hour1} as value, 'hour1' as name union all                              
                              select ${list.hour10} as value, 'hour10' as name union all                              
                              select ${list.day_2} as value, 'day2' as name union all
                              select ${list.special} as value, 'special' as name
                            ) t
                      where t.value = 1 )
       ) as duration,

       (select string_agg(item.id, ',') as val
              from c_armament_ab_filter_item item
             where 1=1
                   and item.filter = 6
                   and item.value <> 'discard'
                   and item.value in 
                   ( select t.name as value
                       from ( select ${list.verbal} as value, 'verbal' as name union all
                              select ${list.somatic} as value, 'somatic' as name union all
                              select ${list.material} as value, 'material' as name union all
                              select ${list.released} as value, 'released' as name
                            ) t
                      where t.value = 1 )
       ) as components,

       ${list.rules} as rules,
       ${list.summon} as summon
`;

    db.exec(sql);
    return true;
};

const update_armament_ability = (data, list) => {
    var armament_id = !data.get('armament_id') ? null : data.get('armament_id');

    var md = data.get('material_data').replace(/'/g, "''");
    var name = data.get('name').replace(/'/g, "''");
    var requirements = data.get('requirements').replace(/'/g, "''");
    var dt = data.get('data').replace(/'/g, "''");

    const sql = `
update c_armament_ab
   set 
       material_data = ${!data.get('material_data') ? null : "'" + md + "'"},
       name = ${!data.get('name') ? null : "'" + name + "'"},
       requirements = ${!data.get('requirements') ? null : "'" + requirements + "'"},
       data = ${!data.get('data') ? null : "'" + dt + "'"},

       type = ${!data.get('type') ? null : data.get('type')},
       cost = ${!data.get('cost') ? null : data.get('cost')},
       hd_hollow = ${!data.get('hd') ? null : data.get('hd')},
       kind = ${!data.get('kind') ? null : data.get('kind')},
       casting_time = ${!data.get('cast_time') ? null : data.get('cast_time')},
       range = ${!data.get('range') ? null : data.get('range')},
       recharge = ${!data.get('recharge') ? null : data.get('recharge')},
       edited = 1,
       duration = (select string_agg(item.id, ',') as val
              from c_armament_ab_filter_item item
             where 1=1
                   and item.filter = 7
                   and item.value <> 'discard'
                   and item.value in 
                   ( select t.name as value
                       from ( select ${list.until_saled} as value, 'until_sealed' as name union all
                              select ${list.concentration} as value, 'concentration' as name union all
                              select ${list.minute_1} as value, 'minute1' as name union all
                              select ${list.minute_2} as value, 'minute2' as name union all                              
                              select ${list.minute_5} as value, 'minute5' as name union all
                              select ${list.minute_10} as value, 'minute10' as name union all
                              select ${list.round_1} as value, 'round1' as name union all                              
                              select ${list.round_2} as value, 'round2' as name union all
                              select ${list.round_5} as value, 'round5' as name union all
                              select ${list.instantly} as value, 'instantaneous' as name union all
                              select ${list.hour1} as value, 'hour1' as name union all                              
                              select ${list.hour10} as value, 'hour10' as name union all                              
                              select ${list.day_2} as value, 'day2' as name union all
                              select ${list.special} as value, 'special' as name
                            ) t
                      where t.value = 1 )
       ),

       components = (select string_agg(item.id, ',') as val
              from c_armament_ab_filter_item item
             where 1=1
                   and item.filter = 6
                   and item.value <> 'discard'
                   and item.value in 
                   ( select t.name as value
                       from ( select ${list.verbal} as value, 'verbal' as name union all
                              select ${list.somatic} as value, 'somatic' as name union all
                              select ${list.material} as value, 'material' as name union all
                              select ${list.released} as value, 'released' as name
                            ) t
                      where t.value = 1 )
       ),
       rules = ${list.rules},
       summon = ${list.summon}
 where case when ${armament_id} notnull then id = ${armament_id} else false end
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
 where ab.show = 1
 order by ab.id desc
`;
    return db.prepare(sql).all();
};

export const getArmamentItemAsync = (id) => {
    const sql = `
select ab.id as armament_id,       
       ab.material_data,
       ab.name,
       ab.requirements,
       ab.data,
       ab.translate,
       ab.type,
       ab.cost,
       ab.hd_hollow,
       ab.kind,
       ab.casting_time,
       ab.range,
       ab.recharge,

       ab.rules,
       ab.summon,
       ab.components,
       ab.duration
 
  from c_armament_ab ab
 where ab.id = ${id}
`;
    return db.prepare(sql).all();
};
