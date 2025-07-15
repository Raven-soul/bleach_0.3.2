import db from './db_connection';
import template from './db_connection_template';

//Template data ------------------------------------------------------------------------

export const getPageTitleTemplate = (synonym = 'class') => {
    const sql = `
        select tt.id,
               tt.name
           from template_title tt
           where tt.synonim = '${synonym}'
    `;
    return template.prepare(sql).all();
};

export const getMenuTemplate = () => {
    const sql = `
        select *
          from template_menu tm
    `;
    return template.prepare(sql).all();
};

export const getFooterTemplate = () => {
    const sql = `
        select tc.name,
               tc.value
           from template_common tc
           where tc.synonim = 'footer'
    `;
    return template.prepare(sql).all();
};

//Content data -------------------------------------------------------------------------
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

export const getMenuSectionlist = () => {
    const sql = `
        select *               
          from cnt_menu_group cmg
         order by cmg.id
    `;
    return db.prepare(sql).all();
};

export const getMenuContent = (group_id = 1) => {
    const sql = `
        select cmg.id as group_id,
               cmg.name as group_name,
               cm.id as cm_id,
               cm.name,
               cm.link,
               cm.logo,
               cm.show
               
          from cnt_menu_group cmg
               inner join cnt_menu cm on cm.group_id = cmg.id
         where case when cmg.id = ${group_id} isnull then 1 = 1 else cmg.id = ${group_id} end
         order by group_id, cm_id
    `;
    return db.prepare(sql).all();
};