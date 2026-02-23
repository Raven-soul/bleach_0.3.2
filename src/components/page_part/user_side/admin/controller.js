'use client';

export function ArmamentTable({list}){
    return (
        <table className="armament_update">
            <tr>
                <th>id</th>
                <th>ab_name</th>
            </tr>
            {list.map((element) => {
                return(
                    <tr onClick={((this)=>{alert(element.id)})}>
                        <td>{element.id}</td>
                        <td>{element.latin_name}</td>
                    </tr>
                )
            })}
        </table>
    )
}