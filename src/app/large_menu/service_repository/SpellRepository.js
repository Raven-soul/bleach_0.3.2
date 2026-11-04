import db from '@/lib/ControllerDB/db_connection';


/*export const getSpell = (ticket_element_id) => {
    const sql = `
with components as (
    select item.id,
           item.name,
           item.value,
           item.ord
      from c_buckwheat_filter_item item
     where 1=1 
           and item.filter = 6
           and item.value <> 'discard'
     order by ord
),

durations as (
    select item.id,
           item.name,
           item.value,
           item.ord
      from c_buckwheat_filter_item item
     where 1=1 
           and item.filter = 7
           and item.value <> 'discard'
     order by ord
)

select spell.id,
       spell.name,   
       spell.requirements,
       spell.material_data,
       --    
       -- components
       (select string_agg(
               case when (instr(spell.components, cm.id) > 0)
                    then case when substring(cm.name, 1, 1) in ('В','С') then cm.name else cm.name || ' (' || spell.material_data || ')' end
                    else null
               end, ', ')
          from components cm
       ) as components,
       --
       -- duration
       (select string_agg(case when (instr(spell.duration, ds.id) > 0) then ds.name else null end, ', ' ) from durations ds ) as duration,
       --
       -- type
       type.id as type_id,
       type.name as type_name,
       type.value as type_value,
       type.logo as type_logo,
       --
       -- cost
       cost.id as cost_id,
       cost.name as cost_name,
       --
       -- cast
       cast_time.id as cast_time_id,
       cast_time.name as cast_time_name,
       --
       -- kast
       kind.id as kind_id,
       kind.name as kind_name,
       --
       -- distance
       distance.id as distance_id,
       distance.name as distance_name,
       --
       -- recharge
       recharge.id as recharge_id,
       recharge.name as recharge_name

  from c_ticket_element te
       inner join c_ticket_element_type te_type on te_type.id = te.type
             and te_type.synonim = 'spell_block'
       inner join c_buckwheat_record_spell spell on spell.id = te.extra_id
        left join c_buckwheat_filter_item type on type.id = spell.type        
        left join c_buckwheat_filter_item cost on cost.id = spell.cost
        left join c_buckwheat_filter_item kind on kind.id = spell.kind
        left join c_buckwheat_filter_item distance on distance.id = spell.range_data
        left join c_buckwheat_filter_item cast_time on cast_time.id = spell.cast_time
        left join c_buckwheat_filter_item recharge on recharge.id = spell.recharge
 where 1 = 1
       and spell.show = 1
       and te.id =  ${ticket_element_id}
    `;

    return db.prepare(sql).all()[0];
};*/

export const getSpell = (spell_id) => {
    const sql = `
select spell.id,
       spell.buckwheat_type,
       spell.name,
       spell.show,
       spell.requirements,
       spell.material_data 
  from c_buckwheat_record_spell spell
 where 1 = 1
       and spell.id = ${spell_id}
    `;
    return db.prepare(sql).all()[0];
};

export const getSpellFilters = (spell_id) => {
    const sql = `
with filter as (
    select cast(${spell_id} as integer) as spell_id
)
--
, filter_list as ( 
    -- список фильтров, которые выданы на карточку
    -- спрашиваю о разрешении использовать фильтры, значени ене учитывается
    select bf.id,
           bf.code,
           bf.name,
           bf.card_order,
           bf.form_order
      from json_each((
                    select json(concat('["', replace(tp.filters, ',', '","'), '"]'))
                      from filter ft 
                           left join c_buckwheat_record_spell spell on spell.id = ft.spell_id
                           left join c_buckwheat_type tp on tp.id = spell.buckwheat_type
           )) t
           left join c_buckwheat_filter bf on bf.code = t.value                
)
--
, spell_filters as ( 
    -- список фильтров, которые выданы на заклинание
    -- получаю значения фильтров выданых на заклинание, разрешение не учитывается
    select t.key,
           t.value
      from json_each((
             select concat('{', spell.filters, '}') as filters
               from filter ft
                    left join c_buckwheat_record_spell spell on spell.id = ft.spell_id
           )) t
)
--
, ft_values as (
    select sf.key,
           '' as short_list,
           (select string_agg(ft_item.name, ', ') as v
              from json_each(concat('[', sf.value, ']')) t
                   left join c_buckwheat_filter_item ft_item on ft_item.id = t.value
           ) as list 
      from spell_filters sf
     where sf.key <> 'components'
      
     union all

    select 'components' as key,
           string_agg(case when t.value isnull then '.' else components.short_name end, '') as short_list,
           string_agg(case when t.value notnull then components.name end, ', ') as list
      from (select ft_item.id,
                   substring(ft_item.name, 1, 1) as short_name,
                   ft_item.name
              from c_buckwheat_filter ft
                   left join c_buckwheat_filter_item ft_item on ft_item.filter = ft.id
                        and ft_item.value <> 'discard'
             where ft.code = 'components'
             order by ft_item.ord
            ) components
            left join json_each((
                        select concat('[', sf.value, ']')
                          from spell_filters sf 
                         where sf.key = 'components'
                 )) t on cast(t.value as integer) = components.id
)
--
select fl.id,
       fl.code,
       fl.name,
       sf.value,
       ft_val.short_list,
       coalesce(ft_val.list, 'Нет') as list
  from filter_list fl
       left join spell_filters sf on sf.key = fl.code
       left join ft_values ft_val on ft_val.key = fl.code
 order by fl.form_order
    `;
    return db.prepare(sql).all();
};

export const getSpellContent = (spell_id) => {
    const sql = `
select te.id,
       te.type,
       te.ord,
       te.show,
       te.name, 
       te.level,
       te.requirements,
       '<ul>' || te.value || '</ul>' as value
  from c_ticket ticket
       inner join c_ticket_type tt on tt.id = ticket.ticket_type
             and tt.name = 'buckwheat_spell'
        left join c_ticket_element te on te.ticket_id = ticket.id
 where 1 = 1
       and ticket.ticket_record_id = ${spell_id}
 order by te.ord
    `;
    return db.prepare(sql).all();
};