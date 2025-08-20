import db from './../db_connection';

export const GetGalleryClass = (slag) => {
    const sql = `
select gallary.id,
       gallary.order_num,
       gallery_fd.name || '/' || gallery_arch.image as img_path,
       gallery_arch.name,
       gallery_arch.height,
       gallery_arch.width
       
  from cnt_class_menu class_menu
       inner join cnt_class class on class.class_id = class_menu.id
       inner join cnt_gallery gallary on gallary.class_id = class.id
       inner join cnt_gallery_archive gallery_arch on gallery_arch.id = gallary.image
       inner join cnt_gallery_folder gallery_fd on gallery_fd.id = gallery_arch.folder
   
 where 1=1
       and gallary.show = '1'
       and class_menu.latin_name = '${slag}'

 order by gallary.order_num
`;
    return db.prepare(sql).all();
};

export const GetGalleryRace = (slag) => {
    const sql = `
select gallary.id,
       gallary.order_num,
       gallery_fd.name || '/' || gallery_arch.image as img_path,
       gallery_arch.name,
       gallery_arch.height,
       gallery_arch.width
       
  from cnt_race_menu race_menu
       inner join cnt_race race on race.race_id = race_menu.id
       
       inner join cnt_gallery gallary on gallary.race_id = race.id
       inner join cnt_gallery_archive gallery_arch on gallery_arch.id = gallary.image
       inner join cnt_gallery_folder gallery_fd on gallery_fd.id = gallery_arch.folder
   
 where 1=1
       and gallary.show = '1'
       and race_menu.latin_name = '${slag}'

 order by gallary.order_num
`;
    return db.prepare(sql).all();
};