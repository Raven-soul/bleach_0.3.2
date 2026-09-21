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
                check: check,
                anchor_list: (table.Content[i].anchor_list != null && j == 3)? table.Content[i].anchor_list : null
            })
        }

        table.Content[i]['data'] = cnt;
    }   

    const SchowMemoData = ((text)=>{
        if($('#memo').text() != text){
            $('#memo').text(text);
            $('.memo-dataset').show();
        }
        else {
            $('#memo').text('');
            $('.memo-dataset').hide();
        }        
    });

    const CloseMemoData = (()=>{
        $('#memo').text('');
        $('.memo-dataset').hide();
    });

    return (
        <div className="table_data">
            <div className="row" >
                <div className="col-auto"><h2>{table.class_short_name}</h2></div>
                <div className="col memo-dataset" style={{display: "none"}}>
                    <div className="memo-card">
                        <span id="memo">data</span>
                        <button onClick={CloseMemoData}>X</button>
                    </div>
                </div>
            </div>            
            <table className="class-progress-table">
                <tbody>
                    <tr className="tb-head-row">
                        {table.Header.map((head)=>{
                            return(
                                <th key={'head_' + head.head_name} className={head.head_class}>
                                    <span className="long">{head.head_name}</span>
                                    <span className="short" 
                                          title={head.head_name} 
                                          onClick={(()=>{SchowMemoData(head.head_name)})}
                                        >
                                        {head.head_name_short}
                                    </span>
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
                                    if(line.anchor_list != null){
                                        return(
                                            <td key={line.key} className={(line.check)? line.cls : ""}>
                                                <div dangerouslySetInnerHTML={{ __html: line.anchor_list }}></div>
                                            </td>
                                        )
                                    }
                                    else {
                                        return(
                                            <td key={line.key} className={(line.check)? line.cls : ""}>
                                                {line.val}
                                            </td>
                                        )
                                    }                                    
                                })}
                            </tr>
                        )
                    })}                                   
                </tbody>
            </table>
        </div>
    )
}