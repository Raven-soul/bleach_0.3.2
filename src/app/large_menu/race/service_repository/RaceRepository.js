import db from '@/lib/ControllerDB/db_connection';


export const getRaceMenuGroupContent = () => {
    const sql = `
        select mg.id,
               mg.ticket_type,
               mg.name
          from c_ticket_menu_group mg
               inner join c_ticket_type type on type.id = mg.ticket_type
                          and type.name = 'race'
         order by mg.id
    `;
    return db.prepare(sql).all();
};

export const getRaceMenuContent = (group_id = 1) => {
    const sql = `
        select tm.id,
               tm.group_id,
               tm.name,
               tm.latin_name,
               tm.logo,
               concat_ws('', menu.link, tm.link) as link,
               t.show
          from c_ticket t
               inner join c_ticket_menu tm on tm.ticket_id = t.id
               inner join c_ticket_menu_group tmg on tmg.id = tm.group_id
                     and tmg.id = ${group_id}
                left join c_menu menu on menu.id = tmg.menu_id
         where t.show = 1
    `;
    return db.prepare(sql).all();
};

export const getRaceContent = (race_name = 'Gecon') => {
    const sql = `
        select rr.title_name,
               rr.sorce_name,
               rr.race_name,
               rr.race_short_name,
               rr.comment,
               rr.comment_author,
               rr.comment_author_rank,
               rr.preview_content
          from c_ticket_menu tm
               inner join c_ticket_record_race rr on rr.menu_id = tm.id
         where tm.latin_name = '${race_name}'
    `;
    return db.prepare(sql).all();
};

export const getRaceContentData = (race_name = 'Gecon') => {
    const sql = `
        select te.id,
               te.ticket_id,
               te_type.synonim as type_name,
               te.name,
               te.requirements,
               te.value,
               te.extra_id as spoiler_id
          from c_ticket_menu tm
               inner join c_ticket_menu_group mg on mg.id = tm.group_id
               inner join c_ticket_type type on type.id = mg.ticket_type
                          and type.name = 'race'
               inner join c_ticket_record_race rr on rr.menu_id = tm.id
               inner join c_ticket_element te on te.ticket_id = rr.ticket_id
                left join c_ticket_element_type te_type on te_type.id = te.type
            
         where 1=1
               and te.show = 1
               and tm.latin_name = '${race_name}'
         order by te.ord, te.id
    `;
    return db.prepare(sql).all();
};

export const getRaceSlagList = () => {
    const sql = `
select tr.id,
       tr.race_short_name
  from c_ticket t
       inner join c_ticket_type tt on tt.id = t.ticket_type
            and tt.name = 'race'
       left join c_ticket_record_race tr on tr.id = t.ticket_record_id
 where t.show = 1
    `;
    
    var sql_result = db.prepare(sql).all();
    var array_result = [];

    for(var i=0; i < sql_result.length; i++){
        array_result.push(sql_result[i].race_short_name.toString());
    }

    return array_result; 
};


export const getRaceSpoilerData = (ticket_element_id) => {
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
    return db.prepare(sql).all();
};