'use client';

import $ from "jquery"
import Image from 'next/image'
import Link from 'next/link'

import { getTableHeaders } from '../service_server/Table';

export function TableBlock({table}) {

    table['Header'] = getTableHeaders(table);

    for(let i = 0; i<table.Content.length; i++){
        let cnt = [];

        for(let j=1; j<=table.col_num; j++){
            var check = (j == 3)? true : false
            cnt.push({
                key: 'col_' + j,
                val: table.Content[i]['col_' + j],
                cls: 'left-content',
                check: check
            })
        }

        table.Content[i]['data'] = cnt;
    }   

    return (
        <div className="table">
            <h2>{table.class_short_name}</h2>
            <table className="class-progress-table">
                <tbody>
                    <tr className="tb-head-row">
                        {table.Header.map((head)=>{
                            return(
                                <th key={'head_' + head.head_name} className={head.head_class}>
                                    <span className="long">{head.head_name}</span>
                                    <span className="short" title={head.head_name}>{head.head_name_short}</span>
                                </th>
                            )
                        })}
                    </tr>
                    <tr className="tb-empty-row">
                        {table.Header.map((head)=>{
                            return(
                                <td key={'head_dash_' + head.head_name}>{head.head_dash}</td>
                            )
                        })}
                    </tr>
                    {table.Content.map((row)=>{
                        return(
                            <tr key={'content_' + row.id}>
                                {row.data.map((line)=>{
                                    return(
                                        <td key={line.key} className={(line.check)? line.cls : ""}>
                                            {line.val}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}                                   
                </tbody>
            </table>
        </div>
    )
}