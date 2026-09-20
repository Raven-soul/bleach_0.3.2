import db from '@/lib/ControllerDB/db_connection';

export const getClassSpoilersContent = (spoiler_id = 1) => {
    const sql = `
        select se.id,
               se.spoiler_id,
               se.h5_tag,
               se.name,
               concat_ws(' ', se.requirements || ',', 'умение', sp.name) as requirements,
               se.value

          from c_spoiler sp 
               inner join c_spoiler_element se on se.spoiler_id = sp.id
              
         where sp.id = ${spoiler_id}
         order by coalesce(se.ord, se.id)
    `;
    return db.prepare(sql).all();
};

export const getClassSpoilers = (class_name = 'Shinigami') => {
    // запрос получает блок спойлеров, не привязанных к ticket_element
    
    const sql = `
        select sp.id,
               sp.ticket_id,
               sp.name,
               concat_ws('', '<p>', sp.description, '</p>') as description,
               coalesce((select 1 from c_spoiler_element sel where sel.spoiler_id = sp.id limit 1), 0) as spoiler_list_exist,
               sp_type.name as type_name

          from c_ticket_menu tm
               inner join c_ticket_menu_group mg on mg.id = tm.group_id
               inner join c_ticket_type type on type.id = mg.ticket_type
                     and type.name = 'class'
               inner join c_ticket_record_class ct on ct.menu_id = tm.id
               inner join c_spoiler sp on sp.ticket_id = ct.ticket_id
                left join c_spoiler_type sp_type on sp_type.id = sp.spoiler_type
               
         where 1=1
               and tm.latin_name = '${class_name}'
               and sp_type.name = 'common'
         order by sp.id 
    `;
    return db.prepare(sql).all();
};

export const getTicketElementSpoilerData = (ticket_element_id) => {
    const sql = `
select sp.id,
       sp.ticket_id,
       sp.name,
       sp.description,
       coalesce((select 1 from c_spoiler_element sel where sel.spoiler_id = sp.id limit 1), 0) as spoiler_list_exist
  from c_ticket_element te
       left join c_ticket_element_type t_type on t_type.id = te.type
       left join c_spoiler sp on sp.id = te.extra_id
 where 1 = 1 
       and te.show = 1
       and t_type.synonim = 'spoiler_block'
       and te.id = ${ticket_element_id}
 order by 1
    `;
    return db.prepare(sql).all()[0];
};