import db from './../db_connection';

export const getArmamentFilterList = () => {
    const sql = `
select *
  from c_armament_ab_filter
`;
    return db.prepare(sql).all();
};