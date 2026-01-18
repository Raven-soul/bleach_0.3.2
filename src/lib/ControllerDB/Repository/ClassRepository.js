import db from './../db_connection';

export const getClassContentData = (class_name = 'Shinigami') => {
    const sql = `
        select ccd.*
          from cnt_class_menu class_menu
               inner join cnt_class class on class.class_id = class_menu.id
               inner join cnt_class_data ccd on ccd.class_id = class.id
         where class_menu.latin_name = '${class_name}'
         order by ccd.id
      
    `;
    return db.prepare(sql).all();
};

export const getClassContent = (class_name = 'Shinigami') => {
    const sql = `
        select class.*
          from cnt_class_menu class_menu
               inner join cnt_class class on class.class_id = class_menu.id
         where class_menu.latin_name = '${class_name}'
    `;
    return db.prepare(sql).all();
};

export const getClassMenuGroupContent = () => {
    const sql = `
        select *
          from cnt_class_menu_group ccmg
    `;
    return db.prepare(sql).all();
};

export const getClassMenuContent = (group_id = 1) => {
    const sql = `
        select *
          from cnt_class_menu ccm
         where ccm.group_id = ${group_id}
    `;
    return db.prepare(sql).all();
};

