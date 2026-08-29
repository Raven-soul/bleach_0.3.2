import db from './../db_connection';

export const getArmamentFilterList = () => {
    const sql = `
select *
  from c_armament_ab_filter ft
 where ft.show = 1
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
       case when item.parent not null 
            then (select '(' || ft.short_translate || ') ' from c_armament_ab_filter ft where ft.id = item.parent) || item.name
            else item.name
        end as name,
       item.value,
       item.logo
  from c_armament_ab_filter filter
       inner join c_armament_ab_filter_item item on item.filter = filter.id
 where 1=1
       and filter.id = ${filter_id}    
       and item.show = 1
 order by item.ord
    `;
    return db.prepare(sql).all();
};

export const getArmamentTypePrompt = () => {
    const sql = `
select item.id,
       item.name,
       item.parent,
       parent.name as parent_name,
       item.value,
       item.class,
       item.logo,
       item.description,
       filter.name as filter_name
  from c_armament_ab_filter filter
       inner join c_armament_ab_filter_item item on item.filter = filter.id
       left join (select ft.name, ft.id from c_armament_ab_filter ft) as parent on parent.id = item.parent
 where 1=1 
       and (filter.name = 'type' or 
            filter.name = 'info' or
            parent.name not null)
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
        select ab.name,
               ab.type, 
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

select 'name' as name,
       ad.name as value
  from armament_data ad
 
union all

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

export const getArmamentIdList = () => {
    const sql = `
select ab.id,
       ab.name as ab_name
       
  from c_armament_ab ab
 where ab.show = 1
    `;
    
    var sql_result = db.prepare(sql).all();
    var array_result = [];

    for(var i=0; i < sql_result.length; i++){
        array_result.push(sql_result[i].id.toString());
    }

    return array_result; 
};

export const getArmamentData = (armament_id) => {
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
),

durations as (
    select item.id,
           item.name,
           item.value,
           item.ord
      from c_armament_ab_filter_item item
     where 1=1 
           and item.filter = 7
           and item.value <> 'discard'
     order by ord
)

select ab.id,
       ab.name as ab_name,
       
       (select string_agg(
               case when (instr(ab.components, cm.id) > 0)
                    then case when substring(cm.name, 1, 1) in ('В','С')
                              then cm.name
                              else cm.name || ' (' || ab.material_data || ')'
                         end
                    else null
               end,
               ', '
               )
          from components cm
       ) as components,
       
       (select string_agg(
               case when (instr(ab.duration, ds.id) > 0)
                    then ds.name
                    else null
               end,
               ', '
               )
          from durations ds
       ) as durations,

       type.id as type_id,
       type.name as type_name,
       type.value as type_value,
       type.logo as type_logo,

       cost.id as cost_id,
       cost.name as cost_name,

       cast_time.id as cast_time_id,
       cast_time.name as cast_time_name,

       kind.id as kind_id,
       kind.name as kind_name,

       case when kind.value = 'ascended'
                 then 'ascended'
            when kind.value = 'ultimate'
                 then 'ultimate'
            when kind.value = 'innate'
                 then 'innate'
            else 'classic'
        end as kind_class_name,
       
       distance.id as distance_id,
       distance.name as distance_name,
       
       recharge.id as recharge_id,
       recharge.name as recharge_name,
       
       ab.rules,
       ab.requirements,
       ab.material_data,
       ab.data,
       '<ul>' || ab.translate || '</ul>' as translate
       
  from c_armament_ab ab
       left join c_armament_ab_filter_item type on type.id = ab.type
       left join c_armament_ab_filter_item cost on cost.id = ab.cost
       left join c_armament_ab_filter_item kind on kind.id = ab.kind
       left join c_armament_ab_filter_item distance on distance.id = ab.range
       left join c_armament_ab_filter_item cast_time on cast_time.id = ab.casting_time
       left join c_armament_ab_filter_item recharge on recharge.id = ab.recharge

 where 1 = 1
       and ab.show = 1
       and ab.id = ${armament_id}
    `;
    
    return db.prepare(sql).all(); 
};