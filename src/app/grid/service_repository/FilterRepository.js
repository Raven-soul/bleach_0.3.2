import db from '@/lib/ControllerDB/db_connection';

export const getFilterList = (synonim = 'kido', type = '') => {
     // вывожу все доступные фильтры для этой карточки
    const sql = `
select row_number() over (order by ft.form_order) as row_num,
       ft.id,
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
                         where tp.synonim = '${synonim}'
                    ))
       ) fl
       inner join c_buckwheat_filter ft on ft.code = fl.value
             and ft.show = 1
             and case '${type}' 
                      when 'bool' then ft.item_type = 'bool'
                      when 'value' then ft.item_type = 'value'
                      else 1 = 1
                 end 
                                  
     `;
    return db.prepare(sql).all();
};

export const getFilterItems = (filter_id = 1, show_discard = '1') => {
     // заполнение фильтров значениями
    const sql = `
select case when ft_item.value = 'discard'
            then ft_item.value
            else ft_item.id
       end as id,
       ft_item.name,
       ft_item.value       
  from c_buckwheat_filter_item ft_item
 where 1 = 1
       and ft_item.filter = ${filter_id}
       and ft_item.show = 1
       and case when '${show_discard}' = '0' 
                then ft_item.value <> 'discard'
                else 1 = 1
           end
 order by ft_item.ord
     `;
    return db.prepare(sql).all();
};

// export const getParamList = () => {
//     const sql = `
//         select c.id,
//                c.ord + 1 as ord,
//                c.translate as name,
//                c.name as latin_name
//           from c_buckwheat_filter_old c
//          where c.ord not null
//          order by c.ord
//     `;
//     return db.prepare(sql).all();
// };