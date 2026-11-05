import db from '@/lib/ControllerDB/db_connection';

export const getFilterList = (synonim = 'kido') => {
     // вывожу все доступные фильтры для этой карточки
    const sql = `
select ft.id,
       ft.code,
       ft.name,
       ft.short_name,
       ft.item_type,
       ft.form_order,
       ft.show
  from (select value --список фильтров, которые выданы на карточку
          from json_each((
                        select json(concat('["', replace(tp.filters, ',', '","'), '"]'))
                          from c_buckwheat_type tp
                         where tp.synonim = ${synonim}
                    ))
       ) fl
       inner join c_buckwheat_filter ft on ft.code = fl.value
             and ft.show = 1
     `;
    return db.prepare(sql).all();
};

export const getSpellFilters = (kido_id) => {
     // вывожу все фильтры доступные конкретному заклинанию
    const sql = `
with filter as (
    select cast(${kido_id} as integer) as kido_id
)
--
, filter_list as ( 
    -- список фильтров, которые выданы на карточку
    -- спрашиваю о разрешении использовать фильтры, значени ене учитывается
    select bf.id,
           bf.code,
           bf.name 
      from json_each((
                    select json(concat('["', replace(tp.filters, ',', '","'), '"]'))
                      from filter ft 
                           left join c_buckwheat_record_kido kido on kido.id = ft.kido_id
                           left join c_buckwheat_type tp on tp.id = kido.buckwheat_type
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
             select concat('{', kido.filters, '}') as filters
               from filter ft
                    left join c_buckwheat_record_kido kido on kido.id = ft.kido_id
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
             where ft.name = 'components'
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
       fl.name as code,
       fl.translate as name,
       sf.value,
       ft_v.short_list,
       ft_v.list
  from filter_list fl
       left join spell_filters sf on sf.key = fl.name
       left join ft_values ft_v on ft_v.key = fl.name
     `;
     return db.prepare(sql).all();
};

export const getSpellGridList = () => {
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
)

select ab.id,
       ab.name as ab_name,
       ab.summon as is_summon,
       
       (select string_agg(
               case when (instr(ab.components, cm.id) > 0)
                    then substring(cm.name, 1, 1)
                    else '.'
               end,
               ''
               )
          from components cm
       ) as components,

       case when ab.requirements isnull
            then true
            else false
       end as is_requirements,

       type.id as type_id,
       type.ord as type_order,
       type.name as type_name,
       type.value as type_value,
       type.logo as type_logo,

       cost.id as cost_id,
       cost.ord as cost_order,
       cost.name as cost_name,
       cost.value as cost_value,

       kind.id as kind_id,
       kind.ord as kind_order,
       kind.name as kind_name,
       kind.value as kind_value,
       
       coalesce(kind.logo, 'null') as kind_value_logo
       
  from c_buckwheat_record_armament_ab ab
       left join c_buckwheat_type ab_type on ab_type.id = ab.ability_type
       left join c_buckwheat_filter_item type on type.id = ab.type
       left join c_buckwheat_filter_item cost on cost.id = ab.cost
       left join c_buckwheat_filter_item kind on kind.id = ab.kind
 where 1 = 1
       and ab.show = 1
       and ab_type.synonim = 'kido'
 order by type_order, kind_order, cost_order, ab.name
    `;
    return db.prepare(sql).all();
};