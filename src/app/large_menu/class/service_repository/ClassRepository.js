import db from '@/lib/ControllerDB/db_connection';

export const getClassSlagList = () => {
    const sql = `
select tr.id,
       tr.race_short_name
  from c_ticket t
       inner join c_ticket_type tt on tt.id = t.ticket_type
            and tt.name = 'class'
       left join c_ticket_record_race tr on tr.id = t.ticket_record_id
 where t.show = 1
    `;
    
    var sql_result = db.prepare(sql).all();
    var array_result = [];

    for(var i=0; i < sql_result.length; i++){
        array_result.push(sql_result[i].race_short_name.toString());
    }

    return array_result; 
};

export const getClassContentData = (class_name = 'Shinigami') => {
    const sql = `
        select te.id,
               te.ticket_id,
               te_type.synonim as type_name,
               te.name,
               te.requirements,
               te.value,
               te.extra_id as spoiler_id
          from c_ticket_menu tm
               inner join c_ticket_menu_group mg on mg.id = tm.group_id
               inner join c_ticket_type type on type.id = mg.ticket_type
                     and type.name = 'class'
               inner join c_ticket_record_class ct on ct.menu_id = tm.id
               inner join c_ticket_element te on te.ticket_id = ct.ticket_id
                left join c_ticket_element_type te_type on te_type.id = te.type
            
         where tm.latin_name = '${class_name}'
         order by te.id      
    `;
    return db.prepare(sql).all();
};

export const getClassContent = (class_name = 'Shinigami') => {
    const sql = `
        select rc.id,
               rc.title_name,        
               rc.sorce_name,
               rc.class_name,
               rc.class_short_name,
               rc.comment,
               rc.comment_author,
               rc.comment_author_rank,
               rc.preview_content,               
               rc.hit_dice,
               rc.hit_point_1_lvl,
               rc.hit_point_other,
               rc.armor,
               rc.weapon,
               rc.tools,
               rc.savethrow,
               rc.skills,
               rc.equipment,
               rc.archetype_name,
               rc.archetype_description
          from c_ticket_menu tm
               inner join c_ticket_record_class rc on rc.menu_id = tm.id
         where tm.latin_name = '${class_name}'
    `;
    return db.prepare(sql).all()[0];
};

export const getClassMenuGroupContent = () => {
    const sql = `
        select mg.id,
               mg.ticket_type,
               mg.name
          from c_ticket_menu_group mg
               inner join c_ticket_type type on type.id = mg.ticket_type
                          and type.name = 'class'
         order by mg.id
    `;
    return db.prepare(sql).all();
};

export const getClassMenuContent = (group_id = 1) => {
    const sql = `
        select tm.id,
               tm.group_id,
               tm.name,
               tm.latin_name,
               tm.logo,
               menu.link || tm.link as link
          from c_ticket_menu tm
               left join c_ticket_menu_group menu_group on menu_group.id = tm.group_id
               left join c_menu menu on menu.id = menu_group.menu_id
               
         where menu_group.id = ${group_id}
    `;
    return db.prepare(sql).all();
};

