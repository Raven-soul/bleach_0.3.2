import db from './../db_connection';

export const getArmamentFilterList = () => {
    const sql = `
select *
  from c_armament_ab_filter
`;
    return db.prepare(sql).all();
};

export const getArmamentFilterItems = (filter_id = 1) => {
    const sql = `
select case when item.value = 'discard'
            then item.value
            else item.id
       end as id,
       item.filter,
       item.name,
       item.value,
       item.logo
  from c_armament_ab_filter filter
       inner join c_armament_ab_filter_item item on item.filter = filter.id
 where filter.id = ${filter_id}    
 order by item.ord
    `;
    return db.prepare(sql).all();
};

export const getArmamentTypePrompt = () => {
    const sql = `
select item.id,
       item.name,
       item.value,
       item.logo
  from c_armament_ab_filter filter
       inner join c_armament_ab_filter_item item on item.filter = filter.id
 where 1=1 
       and filter.name = 'type'
       and item.value <> 'discard'  
 order by item.ord
    `;
    return db.prepare(sql).all();
};

export const getArmamentGridList = () => {
    const sql = `
with components as (
    select item.id,
           item.name,
           item.value,
           item.ord
      from c_armament_ab_filter_item item
     where 1=1 
           and item.filter = 6
           and item.value <> 'discard'
     order by ord
)

select ab.id,
       ab.name as ab_name,
       
       (select string_agg(
               case when (instr(ab.components, cm.id) > 0)
                    then substring(cm.name, 1, 1)
                    else '.'
               end,
               ''
               )
          from components cm
       ) as components,

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
       kind.value as kind_value
       
  from c_armament_ab ab
       left join c_armament_ab_filter_item type on type.id = ab.type
       left join c_armament_ab_filter_item cost on cost.id = ab.cost
       left join c_armament_ab_filter_item kind on kind.id = ab.kind
 where ab.show = 1
 order by type_order, kind_order, cost_order, ab.name
    `;
    return db.prepare(sql).all();
};

export const getArmamentParamGridList = (armament_id = 1) => {
    const sql = `
with armament_data as (
        select ab.type, 
               ab.cost,
               ab.hd_hollow,
               ab.kind,
               ab.casting_time,
               ab.range,
               ab.recharge,
               ab.components,
               ab.duration
          from c_armament_ab ab 
         where ab.id = ${armament_id}
),
    
non_bool_props as (
    select *
      from (
            select type as value from armament_data union all
            select cost as value from armament_data union all
            select hd_hollow as value from armament_data union all
            select kind as value from armament_data union all        
            select casting_time as value from armament_data union all
            select range as value from armament_data union all
            select recharge as value from armament_data
           )
)

-- такая сложность нужня для того, чтобы получить названия фильтров напрямую из таблицы фильтров
-- так я избегаю ошибок в названиях и могу разграничить данные фильтров для спасобностей
select filter.name,
       coalesce(item.id, 'null') as value
  from c_armament_ab_filter filter
       left join c_armament_ab_filter_item item on item.filter = filter.id
                 and item.value <> 'discard'
                 and item.id in (select * from non_bool_props)
 where filter.item_type <> 'bool'
 
union all

select filter.name,
       coalesce((select components from armament_data), 'null') as value
  from c_armament_ab_filter filter
 where filter.id = 6
 
union all

select filter.name,
       coalesce((select duration from armament_data), 'null') as value
  from c_armament_ab_filter filter
 where filter.id = 7
    `;

    /*
        [
            ---- non bool
            {
                name: 'cost',
                value: 'cst4'
            },
            {
                name: 'cast_name',
                value: 'action'
            },
            ---- boolean
            {
                name: 'components',
                value: '102,103,104'
            }
        ]
    */
    return db.prepare(sql).all();
};