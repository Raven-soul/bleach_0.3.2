import db from './../db_connection';

export const getClassSpoilersContent = (spoiler_id = 1) => {
    const sql = `
        select sp.*
          from cnt_class_spoiler_headers sh 
               inner join cnt_class_spoiler sp on sp.spoiler_id = sh.id
         where sh.id = ${spoiler_id}
         order by sp.id 
    `;
    return db.prepare(sql).all();
};

export const getClassSpoilersHead = (class_name = 'Shinigami') => {
    const sql = `
        select sh.*
          from cnt_class_menu class_menu
               inner join cnt_class class on class.class_id = class_menu.id
               inner join cnt_class_spoiler_headers sh on sh.class_id = class.id
         where class_menu.latin_name = '${class_name}'
         order by sh.id 
    `;
    return db.prepare(sql).all();
};

export const getClassTableContent = (class_id = 1) => {
    const sql = `
        select *
          from cnt_class_table cct
         where cct.head = ${class_id}
         order by cct.id 
    `;
    return db.prepare(sql).all();
};

export const getClassTableHeadersContent = (class_name = 'Shinigami') => {
    const sql = `
        select ccth.*
          from cnt_class_menu class_menu
               inner join cnt_class class on class.class_id = class_menu.id
               inner join cnt_class_table_headers ccth on ccth.class_id = class.id
        where class_menu.latin_name = '${class_name}'
    `;
    return db.prepare(sql).all();
};

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

