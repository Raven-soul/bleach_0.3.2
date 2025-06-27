import db from './db_connection';
import template from './db_connection_template';

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

export const getMenuSectionlist = () => {
    const sql = `
        select *               
          from content_menu_group cmg
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
               
          from content_menu_group cmg
               inner join content_menu cm on cm.group_id = cmg.id
         where case when cmg.id = ${group_id} isnull then 1 = 1 else cmg.id = ${group_id} end
         order by group_id, cm_id
    `;
    return db.prepare(sql).all();
};