'use client'

import { useRouter } from "next/navigation"

export default function DetailUseRouter(){
    let router = useRouter()
    return (
        <button onClick={()=>{
            console.log('useRouter 클릭했음!');
            router.push('/');
        }}>useRouter 테스트 버튼</button>
    )
}