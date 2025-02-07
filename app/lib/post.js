import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

/**
 * 특정 게시글을 ID로 조회하는 함수
 * @param {string} postId - MongoDB ObjectId
 * @returns {Promise<Object|null>} - 게시글 데이터 (result) 또는 null
 */
export async function getPostById(postId) {
  try {
    const client = await connectDB;
    const db = client.db("forum");

    // ObjectId 유효성 검사
    if (!ObjectId.isValid(postId)) return null;

    const result = await db.collection('post').findOne({ _id: new ObjectId(postId) });

    return result; // result 그대로 반환 (page.js에서 사용 가능)
  } catch (error) {
    console.error("게시글 조회 중 오류 발생:", error);
    return null;
  }
}

