import db from '@/lib/ControllerDB/db_connection';

export const getSpoilerFilter = (spoiler_id = 1) => {
    const sql = `
        select sf.id,
               sf.alfavit,
               sf.level
          from c_spoiler sp 
               inner join c_spoiler_filter sf on sf.id = sp.filter_id
                     and sf.show = 1              
              
         where sp.id = ${spoiler_id}
    `;
    return db.prepare(sql).all();
};

export const getSpoilerContent = (spoiler_id = 1) => {
    const sql = `
        select se.id,
               se.spoiler_id,
               se.h5_tag,
               se.name,               
               case when se.requirements notnull
                    then concat_ws(', ', se.requirements, 'умение ' || sp.name)
                    else se.requirements
                end as requirements,
               se.value

          from c_spoiler sp 
               inner join c_spoiler_element se on se.spoiler_id = sp.id
                     and se.show = 1
              
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
               sp.filter_id,
               concat_ws('', '<p>', sp.description, '</p>') as description,
               coalesce((select 1 from c_spoiler_element sel where sel.spoiler_id = sp.id limit 1), 0) as spoiler_list_exist,
               sp_type.name as type_name

          from c_ticket_menu tm
               inner join c_ticket t on t.id = tm.ticket_id
               inner join c_ticket_type type on type.id = t.ticket_type
                     and type.name = 'class'
               inner join c_ticket_record_class ct on ct.menu_id = tm.id
               inner join c_spoiler sp on sp.ticket_id = ct.ticket_id
                left join c_spoiler_type sp_type on sp_type.id = sp.spoiler_type
               
         where 1=1
               and tm.latin_name = '${class_name}'
               and sp_type.name = 'common'
         order by coalesce(sp.ord, sp.id)
    `;
    return db.prepare(sql).all();
};

export const getRaceSpoilers = (race_name = 'People') => {    
    const sql = `
select cs.id,
       cs.ord,
       sp_type.name as sp_type,
       cs.ticket_id,       
       cs.name,
       cs.description,
       coalesce((select 1 from c_spoiler_element sel where sel.spoiler_id = cs.id limit 1), 0) as spoiler_list_exist
  from c_ticket_menu tm
       inner join c_ticket ct on ct.id = tm.ticket_id
             and ct.show = 1
        left join c_spoiler cs on cs.ticket_id = ct.id
        left join c_spoiler_type sp_type on sp_type.id = cs.spoiler_type
        
 where tm.latin_name = '${race_name}'
 order by coalesce(cs.ord, cs.id)
    `;
    return db.prepare(sql).all();
};

export const getTicketElementSpoilerData = (ticket_element_id) => {
    const sql = `
select sp.id,
       sp.ticket_id,
       sp.name,
       sp.description,
       sp.filter_id,
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