import db from '../../../lib/ControllerDB/db_connection';

export const getClassTableContent = (class_id = 1) => {
    const sql = `
with table_data as (
    select tbe.id,
           tbe.table_id,
           tbe.col_1,
           tbe.col_2,
           tbe.col_3,
           tbe.col_4,
           tbe.col_5,
           tbe.col_6,
           tbe.col_7,
           tbe.synonim,
           tbe.anchor_list
      from c_table_element tbe
     where tbe.table_id = ${class_id}
),
group_t as (
    select td.id,
           string_agg(
               '<a href="#data_content_' || 
               te.id ||
               '" class="anchor">' ||
               te.name ||
               '</a>', 
               ', ') as anchor_list
      from table_data td
           left join c_ticket_element te on te.id in (
               select value 
                 from json_each(json('[' || td.anchor_list || ']'))
           )
     group by 1
)
select td.id,
       td.table_id,
       td.col_1,
       td.col_2,
       td.col_3,
       gt.anchor_list,
       td.col_4,
       td.col_5,
       td.col_6,
       td.col_7,
       td.synonim
  from table_data td
       left join group_t gt on gt.id = td.id
 order by td.id         
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