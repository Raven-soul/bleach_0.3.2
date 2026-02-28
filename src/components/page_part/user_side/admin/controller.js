'use client';
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
    console.log('armament_id = ' + id);
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
    await console.log(result);
    return result;
}

export function ArmamentTable({list}){
    return (
        <div className='armament_update_area'>
            <table className="armament_update">
                <tr>
                    <th>id</th>
                    <th>ab_name</th>
                </tr>
                {list.map((element) => {
                    return(
                        <TableRow element_id={element.id} element_latin_name={element.latin_name}/>
                    )
                })}
            </table>
        </div>
    )
}

export function TableRow({element_id, element_latin_name}){
    let id = element_id;

    const func = (()=>{
        let res = fetch_data(id); 
        console.log(res);  
        alert(JSON.stringify(res));     
    });

    return (
        <tr onClick={func}>
            <td>{element_id}</td>
            <td>{element_latin_name}</td>
        </tr>
    )
}