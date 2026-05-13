import db from './../db_connection';

export const getMenuLink = (synonym) => {
    const sql = `
select menu.link
       
  from c_menu menu
 where menu.synonym = '${synonym}'
    `;
    
    var sql_result = db.prepare(sql).all();

    return sql_result[0].link;; 
};