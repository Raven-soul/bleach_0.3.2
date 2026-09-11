import db from '../../../lib/ControllerDB/db_connection';

export const getTicketList = () => {
    const sql = `
select t.id,
       t.edited,
       tt.name as type_name,
       substring(coalesce(tr.race_name, tc.class_name), 0, instr(coalesce(tr.race_name, tc.class_name), '[')) as ticket_name
  from c_ticket t
       left join c_ticket_type tt on tt.id = t.ticket_type
       left join c_ticket_record_race tr on tr.id = t.ticket_record_id
            and tt.name = 'race'
       left join c_ticket_record_class tc on tc.id = t.ticket_record_id
            and tt.name = 'class'
 where t.show = 1
 order by t.id desc            
    `;

    return db.prepare(sql).all();
};

export const getTicketElementsData = (ticket_id) => {
    const sql = `
select te.id,
       te.name,
       te.value
  from c_ticket t
       left join c_ticket_element te on te.ticket_id = t.id
 where 1 = 1
       and t.id = ${ticket_id}
       and te.show = 1           
    `;

    return db.prepare(sql).all();
};