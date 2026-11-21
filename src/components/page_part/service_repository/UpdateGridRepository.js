import db from '@/lib/ControllerDB/db_connection';

export const InsertGridKido = (postdata) => {    
    const sql = `
insert into c_buckwheat_record_kido(name, requirements, material_data, filters)
select '${postdata['name'].replace(/'/g, "''")}',
       '${postdata['requirements'].replace(/'/g, "''")}',
       '${postdata['material_data'].replace(/'/g, "''")}',
       '${postdata['filters']}'
    `;
        
    db.exec(sql);
    return true;
};