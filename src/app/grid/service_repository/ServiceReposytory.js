import db from '@/lib/ControllerDB/db_connection';

export const getPageName = (synonim = 'kido') => {
     // вывожу все доступные фильтры для этой карточки
    const sql = `
select concat_ws(' ', menu.name, 'Bleach D&D 5e') as name
  from c_menu menu
 where menu.synonim = '${synonim}'
     `;
    return db.prepare(sql).all()[0].name;
};