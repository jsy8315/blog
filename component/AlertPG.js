'use client'


export default function AlertPG(){
    return (
        <div
            onClick={()=>{ 
                alert("준비중입니다!")
                console.log("클릭클릭")
            }}
            style={{padding : '7px 12px 7px 12px', margin : '0px'}}
        >Playground</div>
    )
}

