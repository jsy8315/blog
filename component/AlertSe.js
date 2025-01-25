'use client'


export default function AlertSe(){
    return (
        <div
            onClick={()=>{ 
                alert("준비중입니다!")
                console.log("클릭클릭")
            }}
            style={{padding : '0px', margin : '0px'}}
        >
            <img src="/searchImg.svg" className="navbar-main-search-img"/>
        </div>
    )
}

