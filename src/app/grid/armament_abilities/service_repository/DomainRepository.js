import db from '@/lib/ControllerDB/db_connection';

export const getMenuLink = (synonim) => {
    const sql = `
select menu.link
       
  from c_menu menu
 where menu.synonim = '${synonim}'
    `;
    
    var sql_result = db.prepare(sql).all();

    return sql_result[0].link;; 
};