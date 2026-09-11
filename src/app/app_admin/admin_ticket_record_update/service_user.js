'use client';
import $ from "jquery"
import { useEffect } from "react";

export default async function fetch_data(id) {
    let response = await fetch('/api/admin/ticket',{
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',  
            },
            body: JSON.stringify({  
                ticket_id: id
            })
        });
    let result = await response.json();
    console.log('-----------------------------------------------------22');
    console.log('fetch_answer');
    console.log(result);
    console.log('-----------------------------------------------------22');
    return result;
}

export function TicketTable({list}){
    return (
        <div className='armament_update_area'>
            <table className="armament_update" key={'armament_table'}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>ticket_name</th>
                    </tr>
                </thead>  
                <tbody>
                    {list.map((element) => {
                        return(
                            <TableRow element_id={element.id} element_type={element.type_name} element_name={element.ticket_name} element_edited={element.edited} key={'ticket_table_row' + element.id}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export function TableRow({element_id, element_type, element_name, element_edited}){
    let id = element_id;

    const func = (async ()=>{
        let ress = await fetch_data(id).then((res)=>{
            return res
        });         

        formRedresh(ress[0]);
    });

    var edited = element_edited == 1? 'row_edited' : ''

    return (
        <tr onClick={func} key={'tr_' + element_id + '_' + element_type + '_' + element_name} className={edited} id={"t_row_" + element_id}>
            <td key={'td_element_id' + element_id}>{element_id}</td>
            <td key={'td_element_name' + element_id}>{'[' + element_type + '] ' + element_name}</td>
        </tr>
    )
}

function formRedresh(content){}