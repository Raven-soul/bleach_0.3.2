import db from './../db_connection';

export const getClassTableContent = (class_id = 1) => {
    const sql = `
        select te.id,
               te.head,
               te.col_1,
               te.col_2,
               te.col_3,
               te.col_4,
               te.col_5,
               te.col_6,
               te.col_7,
               te.synonim
          from c_table_element te
         where te.head = ${class_id}
         order by te.id
    `;
    return db.prepare(sql).all();
};

export const getClassTable = (class_name = 'Shinigami') => {
    const sql = `
        select tb.id,
               tb.ticket_id,
               tb.col_num,
               tb.col_1,
               tb.col_1_short,
               tb.col_2,
               tb.col_2_short,
               tb.col_3,
               tb.col_3_short,
               tb.col_4,
               tb.col_4_short,
               tb.col_5,
               tb.col_5_short,
               tb.col_6,
               tb.col_6_short,
               tb.col_7,
               tb.col_7_short

          from c_ticket_menu tm
               inner join c_ticket_menu_group mg on mg.id = tm.group_id
               inner join c_ticket_type type on type.id = mg.ticket_type
                          and type.name = 'class'
               inner join c_ticket_record_class ct on ct.class_id = tm.id
               inner join c_table tb on tb.ticket_id = ct.ticket_id
              
         where tm.latin_name = '${class_name}'
    `;
    return db.prepare(sql).all();
};