import db from '@/lib/ControllerDB/db_connection';

export const getKidoGridInfo = () => {
    // получаю информацию о:
    // - количестве элементов таблицы
    // - названии последнего добавленного элемента
    // - тип элемента.. не нужен!
    const sql = `
        select (    select count(t.id) as val 
                      from c_buckwheat_record t
                     where t.show = 1
               ) as grid_length,
               kido.name as last_name
          from c_buckwheat_record kido
         where kido.show = 1
         order by kido.id desc
         limit 1
    `;
    return db.prepare(sql).all()[0];
};