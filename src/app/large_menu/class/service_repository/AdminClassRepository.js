import db from '@/lib/ControllerDB/db_connection';

export const UpdateSpoiler = (value, id) => {
    //let new_value = value.replace(/'/g, "''");

    const sql = `
update c_spoiler_element
   set value = '${value}',
       update_dt = CURRENT_TIMESTAMP
 where id = ${id}
    `;
    
    db.exec(sql);
    return true;
};