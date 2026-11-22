import db from '@/lib/ControllerDB/db_connection';

export const getBuckwheatFilters = (buckwheat_id) => {
     // вывожу все фильтры доступные конкретному заклинанию
    const sql = `
with filter as (
    select cast(${buckwheat_id} as integer) as buckwheat_id
)
--
, filter_list as ( 
    -- список фильтров, которые выданы на карточку
    -- спрашиваю о разрешении использовать фильтры, значение не учитывается
    select bf.id,
           bf.code,
           bf.name 
      from json_each((
                    select json(concat('["', replace(tp.filters, ',', '","'), '"]'))
                      from filter ft 
                           left join c_buckwheat_record buckwheat on buckwheat.id = ft.buckwheat_id
                           left join c_buckwheat_type tp on tp.id = buckwheat.buckwheat_type
           )) t
           left join c_buckwheat_filter bf on bf.code = t.value                
)
--
, bt_filters as ( 
    -- список фильтров, которые выданы на заклинание
    -- получаю значения фильтров выданых на заклинание, разрешение не учитывается
    select t.key as filter_code,
           t.value as filter_item_list
      from json_each((
             select concat('{', br.filters, '}') as filters
               from filter ft
                    left join c_buckwheat_record br on br.id = ft.buckwheat_id
           )) t
)
--
, ft_values as (
    select bf.filter_code,
           '' as short_list,
           (select string_agg(ft_item.name, ', ') as v
              from json_each(concat('[', bf.filter_item_list, ']')) t
                   left join c_buckwheat_filter_item ft_item on ft_item.id = t.value
           ) as list 
      from bt_filters bf
     where bf.filter_code <> 'components'
      
     union all

    select 'components' as filter_code,
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
                        select concat('[', bf.filter_item_list, ']')
                          from bt_filters bf 
                         where bf.filter_code = 'components'
                 )) t on cast(t.value as integer) = components.id
)
--
select fl.id,
       fl.code as code,
       fl.name as name,
       bf.filter_item_list,
       ft_v.short_list,
       ft_v.list
  from filter_list fl
       left join bt_filters bf on bf.filter_code = fl.code
       left join ft_values ft_v on ft_v.filter_code = fl.code
     `;
     return db.prepare(sql).all();
};