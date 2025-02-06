'use client'
import { useEffect, useState } from 'react'
import useSWR from 'swr';


export default function Comment(props){
    
    const randomIdHead = ['누워있는', '졸고있는', '배고픈', '날아가는', '게임하는', '놀고있는', '돌고있는', '울고있는', '맞고있는','청소하는', '배부른','다이어트하는', '혼나는', '커밋하는'];
    const randomIdBody = ['파란달팽이','빨간달팽이','스포아','스텀프','주황버섯','초록버섯','뿔버섯','스톤골렘','슬라임','돼지','리본돼지','옥토퍼스','버블링','엑스텀프','스티지',];
    const randomIdProfile = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷']
    const [randomId, setRandomId] = useState('도도한도르마무')
    const [randomIdProfileImg, setRandomIdProfileImg] = useState('🐱');
    const [randomIdNum, setRandomIdNum ] = useState(0);
    const [commmentCont, setCommmentCont] = useState(''); // 입력 중인 댓글

    const [comment, setComment] = useState([]); // 기존 댓글 데이터
    const postId = props.parentId;

    // 기존 댓글 가져오기
    useEffect(() => {
        fetch(`/api/comment/list?postId=${postId}`)
        .then(r=>r.json())
        .then((result) => {
            console.log('useEffect를 통해 가져온 기존 댓글들');
            console.log('useEffect를 통해 가져온 기존 댓글들', result)
            setComment(result)
        }

        )
    },[postId]);

    return (
        <>
        <div className='Comment-component'> 
            <div className='Comment-count'>댓글 {comment.length}</div>
            <div className='Comment-commenter'>
                <div className='Comment-commenter-profilImg'>
                    <div className='Comment-commenter-profilImgSample'
                        onClick={()=>{
                            const randomIndexIdProfileImg = Math.floor(Math.random() * randomIdProfile.length);
                            setRandomIdProfileImg(randomIdProfile[randomIndexIdProfileImg])
                        }}
                    >
                        {randomIdProfileImg}
                    </div>
                </div>
                <div className='Comment-commenter-id'>
                    <input className='Comment-commenter-id-randomChange' value={randomId}
                        
                    >
                    </input>
                    <button className='Comment-commenter-id-randomChangeBtn'
                        onClick={()=>{
                            const randomIndexIdHead = Math.floor(Math.random() * randomIdHead.length);
                            const randomIndexIdBody = Math.floor(Math.random() * randomIdBody.length);
                            setRandomId(randomIdHead[randomIndexIdHead] + randomIdBody[randomIndexIdBody])
                        }}
                    >랜덤 변경</button>
                </div>
            </div>
            <input className='Comment-content' placeholder='입력한 댓글은 수정하거나 삭제할 수 없어요.'
                onChange={(e)=>{ setCommmentCont(e.target.value) }}    
                value={commmentCont}
            >
            </input>
            <div className='Comment-submitBtn-wrap'>
                <button className='Comment-submitBtn'
                    onClick={()=>{

                        let addComment = { commentId: randomId, content: commmentCont, parentId: postId, commentProfileImg: randomIdProfileImg};

                        fetch('/api/comment/new', 
                            {
                                method : 'POST', 
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    commentId: addComment.commentId,
                                    content: addComment.content,
                                    parentId: addComment.parentId,
                                    commentProfileImg: addComment.commentProfileImg
                                  })
                            })
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.savedData) {
                                    // 성공 시, 기존 댓글 배열에 새 댓글 추가
                                    setComment((prevComment) => [...prevComment, data.savedData]);
                                    setRandomIdNum((prevId) => prevId + 1); // ID 증가
                                    setCommmentCont(''); // 입력창 초기화
                                }
                            }
                        )
                    }}
                >댓글 남기기
                </button>
            </div>

            {/* 실제 댓글 리스트 */}


            <div className='Comment-list'>
                {
                    comment.map(function(i){
                        return(

                        <div className='Comment-list-sample'>
                            {/* 댓글러 프로필 & 닉네임 */}
                            <div className='Comment-list-commenter'>
                                <div className='Comment-list-commenter-profilImg'>
                                    <div className='Comment-list-commenter-profilImgSample'>
                                        {i.commentProfileImg}
                                    </div>
                                </div>
                                <div className='Comment-list-commenter-id'>
                                    {i.commentId}
                                </div>
                            </div>
                            {/* 쓴 댓글 */}
                            <div className='Comment-list-content'>
                                {i.content}
                            </div>
                        </div>

                        )
                    })
                }
            </div>
        </div>
        </>
        
    )
}