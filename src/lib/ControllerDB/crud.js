import db from './db_connection';

export const getAllUsers = () => {
    const sql = `
        select *
          from Users us
    `;
    return db.prepare(sql).all();
};