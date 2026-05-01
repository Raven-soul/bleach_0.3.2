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
select item.*
  from c_armament_ab_filter filter
       inner join c_armament_ab_filter_item item on item.filter = filter.id
 where filter.id = ${filter_id}    
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
    `;
    return db.prepare(sql).all();
};

export const getArmamentGridList = () => {
    const sql = `
select ab.id,
       ab.name as ab_name,
       
       case when addition.verbal = 1 then 'В' else '.' end ||
       case when addition.somatic = 1 then 'С' else '.' end ||
       case when addition.material = 1 then 'М' else '.' end ||
       case when addition.released = 1 then 'Р' else '.' end as components,

       type.name as type_name,
       type.value as type_value,
       type.logo as type_logo,
       cost.name as cost_name,
       cost.value as cost_value,
       
       hd_lvl.name as hd_lvl_name,
       hd_lvl.value as hd_lvl_value,
       kind.name as kind_name,
       kind.value as kind_value,
       casting_time.name as casting_time_name,
       casting_time.value as casting_time_value,
       range.name as range_name,
       range.value as range_value,
       
       addition.until_saled,
       addition.concentration,
       addition.minute_1,
       addition.minute_2,
       addition.minute_5,
       addition.minute_10,
       addition.round_1,
       addition.round_2,
       addition.round_5,
       addition.instantly,
       addition.hour,
       addition.day_2,
       addition.special,
       
       addition.verbal,
       addition.somatic,
       addition.material,
       addition.released
       
  from c_armament_ab ab
       left join c_armament_ab_addition addition on addition.id = ab.additional_param
       left join c_armament_ab_filter_item type on type.id = ab.type
       left join c_armament_ab_filter_item cost on cost.id = ab.cost
       
       left join c_armament_ab_filter_item hd_lvl on hd_lvl.id = ab.hd_hollow
       left join c_armament_ab_filter_item kind on kind.id = ab.kind
       left join c_armament_ab_filter_item casting_time on casting_time.id = ab.casting_time
       left join c_armament_ab_filter_item range on range.id = ab.range
    `;
    return db.prepare(sql).all();
};