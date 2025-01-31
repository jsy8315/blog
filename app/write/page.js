'use client'
import { useState } from "react"

export default function Write(){

    const [src, setSrc] = useState('')

    return (
        <div style={{ backgroundColor: "lightgray"}}>
            <h4>글작성페이지요</h4>
            <h4>글작성페이지</h4>
            <h4>글작성페이지</h4>
            <h4>글작성페이지</h4>
            <h4>글작성페이지</h4>
            <h4>글작성페이지</h4>
            <h4>글작성페이지</h4>
            <h4>글작성페이지</h4>
            <h4>글작성페이지</h4>
            <form action="/api/post/new" method="POST" style={{ display: "flex", flexDirection: "column", width: '70%', justifyContent: "center"}}>
                <span>title</span>
                <input type="text" id='title' name="title"></input>
                <br></br>

                <span>intro</span>
                <input type="text" id='intro' name="intro"></input>
                <br></br>

                <span>content</span>
                <textarea type="text" rows="30" id='content' name="content" style={{height: '500px'}}></textarea>
                <br></br>

                <span>썸네일이미지선택</span>
                <input type="file" accept="image/*"  onChange={ 
                    async (e) => {
                        let file = e.target.files[0];
                        if (!file) return;
                    
                        try {
                            let filename = encodeURIComponent(file.name);
                            let res = await fetch('/api/post/image?file=' + filename);

                            if (!res.ok) {
                                throw new Error('Presigned URL 요청 실패: ' + res.statusText);
                            }

                            res = await res.json();
                            console.log("Presigned URL 응답: ", res);
                        
                            if (!res.url) {
                                throw new Error("S3 업로드 URL이 존재하지 않습니다.");
                            }
                        
                            // S3 업로드
                            const formData = new FormData();
                            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                                formData.append(key, value);
                            });
                        
                            let 업로드결과 = await fetch(res.url, {
                                method: 'POST',
                                body: formData,
                            });
                        
                            console.log("업로드 결과 전체:", 업로드결과);
                        
                            if (업로드결과.ok) {
                                console.log("업로드 성공");
                                setSrc(res.url + '/' + filename);
                            } else {
                                throw new Error('S3 업로드 실패: ' + 업로드결과.statusText);
                            }
                        } catch (error) {
                            console.error("에러 발생:", error);
                        }
                    }
                } />

                <div>
                    <img id="thumbnail" name="thumbnail" value={src}  src={src} />
                </div>
                <br></br>

                <span>tag</span>
                <select id='tag' name="tag">
                    <option value="Javascript">Javascript</option>
                    <option value="React">React</option>
                    <option value="ReactNative">ReactNative</option>
                    <option value="Typescript">Typescript</option>
                    <option value="HTML/CSS">HTML/CSS</option>
                </select>
                <br></br>

                <span>like</span>
                <input type="number" id='like' name="like" value={0}></input>
                <br></br>

                <button type="submit">발행</button>
            </form>
        </div>
    )
}