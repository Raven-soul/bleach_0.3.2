import db from '@/lib/ControllerDB/db_connection';

export const getKido = (kido_id) => {
    const sql = `
select kido.id,
       kido.buckwheat_type,
       kido.name,
       kido.show,
       kido.requirements,
       kido.material_data 
  from c_buckwheat_record_kido kido
 where 1 = 1
       and kido.id = ${kido_id}
    `;
    return db.prepare(sql).all()[0];
};

export const getKidoFilters = (kido_id) => {
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
           bf.name,
           bf.card_order,
           bf.form_order
      from json_each((
                    select json(concat('["', replace(tp.filters, ',', '","'), '"]'))
                      from filter ft 
                           left join c_buckwheat_record_kido kido on kido.id = ft.kido_id
                           left join c_buckwheat_type tp on tp.id = kido.buckwheat_type
           )) t
           left join c_buckwheat_filter bf on bf.code = t.value                
)
--
, kido_filters as ( 
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
      from kido_filters sf
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
                          from kido_filters sf 
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
       left join kido_filters sf on sf.key = fl.code
       left join ft_values ft_val on ft_val.key = fl.code
 order by fl.form_order
    `;
    return db.prepare(sql).all();
};

export const getKidoContent = (kido_id) => {
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
             and tt.name = 'buckwheat_kido'
        left join c_ticket_element te on te.ticket_id = ticket.id
 where 1 = 1
       and ticket.ticket_record_id = ${kido_id}
 order by te.ord
    `;
    return db.prepare(sql).all();
};