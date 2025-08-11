import db from './../db_connection';

export const getRaceMenuGroupContent = () => {
    const sql = `
        select *
          from cnt_race_menu_group ccmg
    `;
    return db.prepare(sql).all();
};

export const getRaceMenuContent = (group_id = 1) => {
    const sql = `
        select *
          from cnt_race_menu ccm
         where ccm.group_id = ${group_id}
    `;
    return db.prepare(sql).all();
};