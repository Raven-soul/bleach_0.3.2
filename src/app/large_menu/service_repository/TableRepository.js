import db from '../../../lib/ControllerDB/db_connection';

export const getClassTableContent = (class_id = 1) => {
    const sql = `
    select t.id,
           tb.ticket_id,
           t.row_num,
           t.table_id,
           t.col_1,
           t.col_2,
           t.col_3,
           t.col_4,
           t.col_5,
           t.col_6,
           t.col_7,
           t.synonim,
           (select string_agg(
                   '<a href="#data_content_' || 
                   te.id ||
                   '" class="anchor">' ||
                   te.name ||
                   '</a>', 
                   ', ')
              from c_ticket_element te
             where 1=1
                   and te.ticket_id = tb.ticket_id
                   and te.show = 1
                   and t.row_num in (select value from json_each(json('[' || te.level || ']')))
           ) as anchor_list

      from c_table tb
           left join c_table_element t on t.table_id = tb.id
     where tb.id = ${class_id}
    `;
    return db.prepare(sql).all();
};

export const getClassTable = (class_name = 'Shinigami') => {
    const sql = `
        select rc.class_short_name,
               tb.id,
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
               inner join c_ticket_record_class rc on rc.menu_id = tm.id
               inner join c_table tb on tb.ticket_id = rc.ticket_id
              
         where tm.latin_name = '${class_name}'
    `;
    return db.prepare(sql).all()[0];
};