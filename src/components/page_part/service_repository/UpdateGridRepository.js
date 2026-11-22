import db from '@/lib/ControllerDB/db_connection';

var gridType = {
    "armament": 1,
    "kido": 2,
    "background": 3
}

export function InsertGridKido(postdata){
    var buckwheat_id = insertBuckwheat(postdata, gridType['kido']);
    var ticket_id = insertTicket(buckwheat_id, 3);
    insertTicketElement(0, null, ticket_id, null, null, null, postdata['data']);
}

function insertBuckwheat(postdata, buckwheat_type){
    const sql = `
   insert into c_buckwheat_record(buckwheat_type, name, requirements, material_data, filters)
   select ${buckwheat_type},
          '${postdata['name'].replace(/'/g, "''")}',
          '${postdata['requirements'].replace(/'/g, "''")}',
          '${postdata['material_data'].replace(/'/g, "''")}',
          '${postdata['filters']}'
returning id
    `;
    
    return db.prepare(sql).all()[0].id;
};

function insertTicket(id, type_id){
    const sql = `
   insert into c_ticket(record_id, ticket_type)
   select ${id},
          ${type_id}
returning id
    `;
        
    return db.prepare(sql).all()[0].id;
};

function insertTicketElement(type, ord, ticket_id, name, level, requirements, value){
    const sql = `
   insert into c_ticket_element(type, ord, ticket_id, name, level, requirements, value)
   select ${type},
          ${ord},
          ${ticket_id},
          ${(!name)? null : "'" + name + "'"},
          ${(!level)? null : "'" + level + "'"},
          ${(!requirements)? null : "'" + requirements + "'"},
          ${(!value)? null : "'" + value + "'"}
    `;
        
    db.exec(sql);
    return true;
};