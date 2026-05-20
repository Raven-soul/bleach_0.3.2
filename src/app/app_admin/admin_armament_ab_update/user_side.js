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
                    <tr>
                        <th>id</th>
                        <th>ab_name</th>
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
    if(content.components != null){
        var components = content.components.split(',');
        components.forEach(element_id => {
            $('input#checkbox_' + element_id).prop('checked', true);  
        }); 
    }

    if(content.duration != null){
        var durations = content.duration.split(',');
        durations.forEach(element_id => {
            $('input#checkbox_' + element_id).prop('checked', true);  
        }); 
    }       

    if(content.rules == 1) $("input#checkbox_-2").prop('checked', true);
    if(content.summon == 1) $("input#checkbox_-1").prop('checked', true);

    //text
    $('#material_data').val(content.material_data);
    $('#name').val(content.name);
    $('#requirements').val(content.requirements);
    $('#data').val(content.translate);
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
    $("input.checkbox_element").prop('checked', false);    

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