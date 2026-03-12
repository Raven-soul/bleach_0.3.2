'use client';
import $ from "jquery"
import { useCallback } from 'react'

// export default async function get(){
//     await fetch('/api/admin/ability', {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//       body: { a : 10},
//     }).then((res) => {
//       alert('true ' + res)
//     })

// }

export default async function fetch_data(id) {
    let response = await fetch('/api/admin/ability',{
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',  
            },
            body: JSON.stringify({  
                armament_id: id
            })
        });
    let result = await response.json();
    console.log('-----------------------------------------------------22');
    console.log('fetch_answer');
    console.log(result);
    console.log('-----------------------------------------------------22');
    return result;
}

export function ArmamentTable({list}){
    return (
        <div className='armament_update_area'>
            <table className="armament_update" key={'armament_table'}>
                <thead>
                    <tr key={'tr_head'}>
                        <th key={'th_head_id'}>id</th>
                        <th key={'th_head_name'}>ab_name</th>
                    </tr>
                </thead>  
                <tbody>
                    {list.map((element) => {
                        return(
                            <TableRow element_id={element.id} element_latin_name={element.latin_name} element_edited={element.edited} key={'armament_table_row' + element.id}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

function formRedresh(content){
    formClear();
    //id
    $('#armament_id').val(content.armament_id);
    $('#additional_id').val(content.additional_id);

    //select
    $(`#type option[value="${content.type}"]`).prop('selected', true);
    $(`#cost option[value="${content.cost}"]`).prop('selected', true);
    $(`#hd option[value="${content.hd_hollow}"]`).prop('selected', true);
    $(`#kind option[value="${content.kind}"]`).prop('selected', true);
    $(`#cast_time option[value="${content.casting_time}"]`).prop('selected', true);
    $(`#range option[value="${content.range}"]`).prop('selected', true);
    $(`#recharge option[value="${content.recharge}"]`).prop('selected', true);

    //checkbox
    if(content.rules == 1) $("#rules").prop('checked', true);
    if(content.for_summon == 1) $("#for_summon").prop('checked', true);
    if(content.verbal == 1) $("#verbal").prop('checked', true);
    if(content.somatic == 1) $("#somatic").prop('checked', true);
    if(content.material == 1) $("#material").prop('checked', true);
    if(content.released == 1) $("#released").prop('checked', true);
    if(content.until_saled == 1) $("#until_saled").prop('checked', true);
    if(content.concentration == 1) $("#concentration").prop('checked', true);
    if(content.minute_1 == 1) $("#minute_1").prop('checked', true);
    if(content.minute_2 == 1) $("#minute_2").prop('checked', true);
    if(content.minute_5 == 1) $("#minute_5").prop('checked', true);
    if(content.minute_10 == 1) $("#minute_10").prop('checked', true);
    if(content.round_1 == 1) $("#round_1").prop('checked', true);
    if(content.round_2 == 1) $("#round_2").prop('checked', true);
    if(content.round_5 == 1) $("#round_5").prop('checked', true);
    if(content.instantly == 1) $("#instantly").prop('checked', true);
    if(content.hour == 1) $("#hour").prop('checked', true);
    if(content.day_2 == 1) $("#day_2").prop('checked', true);
    if(content.special == 1) $("#special").prop('checked', true);

    //text
    $('#material_data').val(content.material_data);
    $('#name').val(content.name);
    $('#requirements').val(content.requirements);
    $('#data').val(content.data);
}

function formClear(){
    //id
    $('#armament_id').val('');
    $('#additional_id').val('');

    //select
    $('#type option').prop('selected', false);
    $('#cost option').prop('selected', false);
    $('#hd option').prop('selected', false);
    $('#kind option').prop('selected', false);
    $('#cast_time option').prop('selected', false);
    $('#range option').prop('selected', false);
    $('#recharge option').prop('selected', false);

    //checkbox
    $("#rules").prop('checked', false);
    $("#for_summon").prop('checked', false);
    $("#verbal").prop('checked', false);
    $("#somatic").prop('checked', false);
    $("#material").prop('checked', false);
    $("#released").prop('checked', false);
    $("#until_saled").prop('checked', false);
    $("#concentration").prop('checked', false);
    $("#minute_1").prop('checked', false);
    $("#minute_2").prop('checked', false);
    $("#minute_5").prop('checked', false);
    $("#minute_10").prop('checked', false);
    $("#round_1").prop('checked', false);
    $("#round_2").prop('checked', false);
    $("#round_5").prop('checked', false);
    $("#instantly").prop('checked', false);
    $("#hour").prop('checked', false);
    $("#day_2").prop('checked', false);
    $("#special").prop('checked', false);

    //text
    $('#material_data').val('');
    $('#name').val('');
    $('#requirements').val('');
    $('#data').val('');
}

export function TableRow({element_id, element_latin_name, element_edited}){
    let id = element_id;

    const func = (async ()=>{
        let ress = await fetch_data(id).then((res)=>{
            return res
        });         

        formRedresh(ress[0]);
    });

    var edited = element_edited == 1? 'row_edited' : ''

    return (
        <tr onClick={func} key={'tr_' + element_id + '_' + element_latin_name} className={edited}>
            <td key={'td_element_id' + element_id}>{element_id}</td>
            <td key={'td_element_name' + element_id}>{element_latin_name}</td>
        </tr>
    )
}