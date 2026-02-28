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

    const func = (async ()=>{
        let ress = await fetch_data(id).then((res)=>{
            return res
        });         
        console.log('-----------------------------------------------------11');
        console.log(ress);
        console.log('-----------------------------------------------------11');
        //alert(JSON.stringify());     

        console.log('id = ' + ress.armament_id);
    });

    return (
        <tr onClick={func}>
            <td>{element_id}</td>
            <td>{element_latin_name}</td>
        </tr>
    )
}