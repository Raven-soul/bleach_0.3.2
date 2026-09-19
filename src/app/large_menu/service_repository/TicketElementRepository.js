import db from '@/lib/ControllerDB/db_connection';


export const getContentSpell = (ticket_element_id) => {
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

       case when kind.value in ('ascended', 'ultimate','innate')
                 then kind.value
            when kind.value in ('passive','traits','appendages','strikes','action','speed')
                 then 'hollow ' || kind.value
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
       
  from c_ticket_element te
       inner join c_ticket_element_type te_type on te_type.id = te.type
             and te_type.synonim = 'spell_block'
        left join c_armament_ab ab on ab.id = te.extra_id
        left join c_armament_ab_filter_item type on type.id = ab.type
        left join c_armament_ab_filter_item cost on cost.id = ab.cost
        left join c_armament_ab_filter_item kind on kind.id = ab.kind
        left join c_armament_ab_filter_item distance on distance.id = ab.range
        left join c_armament_ab_filter_item cast_time on cast_time.id = ab.casting_time
        left join c_armament_ab_filter_item recharge on recharge.id = ab.recharge

 where 1 = 1
       and ab.show = 1
       and te.id = ${ticket_element_id}
    `;

    return db.prepare(sql).all()[0];
};
