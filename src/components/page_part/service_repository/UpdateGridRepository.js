import db from '@/lib/ControllerDB/db_connection';

export function InsertGridKido(postdata){
    insertBuckwheat(postdata, gridType('kido'));
}

function gridType(synonim){
    const sql = `
select bt.id as id
  from c_buckwheat_type bt
 where bt.synonim = '${synonim}'
    `;
        
    return db.prepare(sql).all()[0].id;
};

function insertBuckwheat(postdata, buckwheat_type){
    const sql = `
   insert into c_buckwheat_record(buckwheat_type, name, requirements, material_data, filters, value)
   select ${buckwheat_type},
          ${(!postdata['name'])? null : "'" + postdata['name'].replace(/'/g, "''") + "'"},
          ${(!postdata['requirements'])? null : "'" + postdata['requirements'].replace(/'/g, "''") + "'"},
          ${(!postdata['material_data'])? null : "'" + postdata['material_data'].replace(/'/g, "''") + "'"},
          ${(!postdata['filters'])? null : "'" + postdata['filters'].replace(/'/g, "''") + "'"},
          ${(!postdata['data'])? null : "'" + postdata['data'].replace(/'/g, "''") + "'"}
    `;
    
    db.exec(sql);
    return true;
};