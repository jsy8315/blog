'use client'

import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Comment(props) {
    const randomIdHead = ['누워있는', '졸고있는', '배고픈', '날아가는', '게임하는', '놀고있는', '돌고있는', '울고있는', '맞고있는','청소하는', '배부른','다이어트하는', '혼나는', '커밋하는'];
    const randomIdBody = ['파란달팽이','빨간달팽이','스포아','스텀프','주황버섯','초록버섯','뿔버섯','스톤골렘','슬라임','돼지','리본돼지','옥토퍼스','버블링','엑스텀프','스티지'];
    const randomIdProfile = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷'];

    const [randomId, setRandomId] = useState('도도한도르마무');
    const [randomIdProfileImg, setRandomIdProfileImg] = useState('🐱');
    const [commmentCont, setCommmentCont] = useState('');
    const postId = props.parentId;

    // useSWR을 사용하여 댓글 데이터 패칭
    const { data: comment, mutate } = useSWR(`/api/comment/list?postId=${postId}`, fetcher, { suspense: true });

    return (
        <div className='Comment-component'>
            <div className='Comment-count'>댓글 {comment?.length || 0}</div>
            <div className='Comment-commenter'>
                <div className='Comment-commenter-profilImg'>
                    <div className='Comment-commenter-profilImgSample'
                        onClick={()=>{
                            const randomIndexIdProfileImg = Math.floor(Math.random() * randomIdProfile.length);
                            setRandomIdProfileImg(randomIdProfile[randomIndexIdProfileImg]);
                        }}
                    >
                        {randomIdProfileImg}
                    </div>
                </div>
                <div className='Comment-commenter-id'>
                    <input className='Comment-commenter-id-randomChange' value={randomId} readOnly />
                    <button className='Comment-commenter-id-randomChangeBtn'
                        onClick={()=>{
                            const randomIndexIdHead = Math.floor(Math.random() * randomIdHead.length);
                            const randomIndexIdBody = Math.floor(Math.random() * randomIdBody.length);
                            setRandomId(randomIdHead[randomIndexIdHead] + randomIdBody[randomIndexIdBody]);
                        }}
                    >랜덤 변경</button>
                </div>
            </div>
            <input className='Comment-content' placeholder='입력한 댓글은 수정하거나 삭제할 수 없어요.'
                onChange={(e)=>{ setCommmentCont(e.target.value); }}    
                value={commmentCont}
            />
            <div className='Comment-submitBtn-wrap'>
                <button className='Comment-submitBtn'
                    onClick={async () => {
                        const addComment = {
                            commentId: randomId,
                            content: commmentCont,
                            parentId: postId,
                            commentProfileImg: randomIdProfileImg
                        };

                        const response = await fetch('/api/comment/new', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(addComment)
                        });

                        const data = await response.json();

                        if (data.savedData) {
                            mutate();
                            setCommmentCont(''); // 입력창 초기화
                        }
                    }}
                >댓글 남기기</button>
            </div>

            {/* 실제 댓글 리스트 */}
            <div className='Comment-list'>
                {comment?.map((i, index) => (
                    <div className='Comment-list-sample' key={index}>
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
                ))}
            </div>
        </div>
    );
}
