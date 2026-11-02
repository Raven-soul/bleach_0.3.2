import db from '@/lib/ControllerDB/db_connection';


export const getSpell = (ticket_element_id) => {
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
),

durations as (
    select item.id,
           item.name,
           item.value,
           item.ord
      from c_buckwheat_filter_item item
     where 1=1 
           and item.filter = 7
           and item.value <> 'discard'
     order by ord
)

select spell.id,
       spell.name,   
       spell.requirements,
       spell.material_data,
       --    
       -- components
       (select string_agg(
               case when (instr(spell.components, cm.id) > 0)
                    then case when substring(cm.name, 1, 1) in ('В','С') then cm.name else cm.name || ' (' || spell.material_data || ')' end
                    else null
               end, ', ')
          from components cm
       ) as components,
       --
       -- duration
       (select string_agg(case when (instr(spell.duration, ds.id) > 0) then ds.name else null end, ', ' ) from durations ds ) as duration,
       --
       -- type
       type.id as type_id,
       type.name as type_name,
       type.value as type_value,
       type.logo as type_logo,
       --
       -- cost
       cost.id as cost_id,
       cost.name as cost_name,
       --
       -- cast
       cast_time.id as cast_time_id,
       cast_time.name as cast_time_name,
       --
       -- kast
       kind.id as kind_id,
       kind.name as kind_name,
       --
       -- distance
       distance.id as distance_id,
       distance.name as distance_name,
       --
       -- recharge
       recharge.id as recharge_id,
       recharge.name as recharge_name

  from c_ticket_element te
       inner join c_ticket_element_type te_type on te_type.id = te.type
             and te_type.synonim = 'spell_block'
       inner join c_buckwheat_record_spell spell on spell.id = te.extra_id
        left join c_buckwheat_filter_item type on type.id = spell.type        
        left join c_buckwheat_filter_item cost on cost.id = spell.cost
        left join c_buckwheat_filter_item kind on kind.id = spell.kind
        left join c_buckwheat_filter_item distance on distance.id = spell.range_data
        left join c_buckwheat_filter_item cast_time on cast_time.id = spell.cast_time
        left join c_buckwheat_filter_item recharge on recharge.id = spell.recharge
 where 1 = 1
       and spell.show = 1
       and te.id =  ${ticket_element_id}
    `;

    return db.prepare(sql).all()[0];
};

export const getSpellContent = (spell_id) => {
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
             and tt.name = 'buckwheat_spell'
        left join c_ticket_element te on te.ticket_id = ticket.id
 where 1 = 1
       and ticket.ticket_record_id = ${spell_id}
 order by te.ord
    `;
    console.log('-------------------------------------------------------' + spell_id);
    return db.prepare(sql).all();
};