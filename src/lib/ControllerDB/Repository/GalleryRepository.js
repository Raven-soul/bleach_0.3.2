import db from './../db_connection';

export const GetGalleryClass = (slag) => {
    const sql = `
select gallery.id,
       gallery_content.order_num,       
       gallery_fd.name || '/' || gallery.image as img_path,       
       gallery.name,
       gallery.height,
       gallery.width
       
  from cnt_class_menu class_menu
       inner join cnt_class class on class.class_id = class_menu.id       
       inner join cnt_gallery_content gallery_content on gallery_content.content_gallery = class.content_gallery
       inner join cnt_gallery_archive gallery on gallery.id = gallery_content.image_id
       inner join cnt_gallery_folder gallery_fd on gallery_fd.id = gallery.folder
   
 where 1=1
       and gallery_content.show = 1
       and class_menu.latin_name = '${slag}'

 order by gallery_content.order_num, gallery.id
`;
    return db.prepare(sql).all();
};

export const GetGalleryRace = (slag) => {
    const sql = `
select gallery.id,
       gallery_content.order_num,       
       gallery_fd.name || '/' || gallery.image as img_path,       
       gallery.name,
       gallery.height,
       gallery.width

   from cnt_race_menu race_menu
       inner join cnt_race race on race.race_id = race_menu.id       
       inner join cnt_gallery_content gallery_content on gallery_content.content_gallery = race.content_gallery       
       inner join cnt_gallery_archive gallery on gallery.id = gallery_content.image_id
       inner join cnt_gallery_folder gallery_fd on gallery_fd.id = gallery.folder
 
 where 1=1
       and gallery_content.show = 1
       and race_menu.latin_name = '${slag}'

 order by gallery_content.order_num, gallery.id
`;
    return db.prepare(sql).all();
};