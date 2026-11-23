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
                      when 'radio' then ft.item_type = 'radio'
                      when 'value' then ft.item_type = 'value'
                      when 'bool' then ft.item_type = 'bool'
                      else 1 = 1
                 end 
                                  
     `;
    return db.prepare(sql).all();
};

export const getFilterItems = (filter_id = 1, filter_type, show_discard = '1') => {
     // заполнение фильтров значениями
    const sql = `
select tt.id,
       tt.name,
       tt.value
  from (
        select case when ft_item.value = 'discard'
                    then ft_item.value
                    else ft_item.id
               end as id,
               ft_item.name,
               ft_item.value,
               ft_item.ord,
               'other' as filter_type 
          from c_buckwheat_filter_item ft_item
         where 1 = 1
               and ft_item.filter = ${filter_id}
               and ft_item.show = 1
               
         union all
         
        select t.id,
               t.name,
               t.value,
               t.ord,
               'bool' as filter_type 
          from (
                    select 'discard' as id, 'Отменить фильтр' as name, 'discard' as value, null as ord union all
                    select 'false' as id, 'Нет' as name, 'false' as value, 1 as ord union all
                    select 'true' as id, 'Да' as name, 'true' as value, 2 as ord
               ) t
  ) tt

 where 1 = 1
       and case when '${filter_type}' = 'bool' 
                then tt.filter_type = 'bool'
                else tt.filter_type <> 'bool'
           end
       and case when '${show_discard}' = '0'
                then not tt.value in ('discard', 'false')
                else 1 = 1
           end
 order by tt.ord
     `;
    return db.prepare(sql).all();
};