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
       and filter.name = 'tp'
       and item.value <> 'discard'  
    `;
    return db.prepare(sql).all();
};