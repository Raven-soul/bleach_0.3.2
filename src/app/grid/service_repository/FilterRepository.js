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
                         where tp.synonim = '${synonim}'
                    ))
       ) fl
       inner join c_buckwheat_filter ft on ft.code = fl.value
             and ft.show = 1
     `;
    return db.prepare(sql).all();
};

export const getFilterItems = (filter_id = 1) => {
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
 order by ft_item.ord
     `;
    return db.prepare(sql).all();
};