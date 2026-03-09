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
                            <TableRow element_id={element.id} element_latin_name={element.latin_name} key={'armament_table_row' + element.id}/>
                        )
                    })}
                </tbody>
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

        console.log(ress);
    });

    return (
        <tr onClick={func} key={'tr_' + element_id + '_' + element_latin_name}>
            <td key={'td_element_id' + element_id}>{element_id}</td>
            <td key={'td_element_name' + element_id}>{element_latin_name}</td>
        </tr>
    )
}