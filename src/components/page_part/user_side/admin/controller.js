// 'use client';
// import { useCallback } from 'react'

// const handleSubmit = useCallback(() => {

//     fetch('/api/admin/ability', {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//       body: { a : 10},
//     }).then((res) => {
//       alert('true' + res)
//     })
//   }, [])

// export function ArmamentTable({list}){
//     return (
//         <div>
//             <button onClick={handleSubmit} id="button">Data</button>
//             <table className="armament_update">
//                 <tr>
//                     <th>id</th>
//                     <th>ab_name</th>
//                 </tr>
//                 {list.map((element) => {
//                     return(
//                         <tr>
//                             <td>{element.id}</td>
//                             <td>{element.latin_name}</td>
//                         </tr>
//                     )
//                 })}
//             </table>
//         </div>
//     )
// }