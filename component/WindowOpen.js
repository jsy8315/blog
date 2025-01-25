'use client'


export default function WindowOpen(){
    return (
        <div
            onClick={()=>{ 
                window.open("https://www.jungsuyoung.com", "_blank");
                console.log("클릭클릭")
            }}
            style={{padding : '7px 12px 7px 12px', margin : '0px'}}
        >Aboutme</div>
    )
}

