import db from '@/lib/ControllerDB/db_connection';

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
       and ab_type.synonim = 'spell'
 order by type_order, kind_order, cost_order, ab.name
    `;
    return db.prepare(sql).all();
};