import aws from 'aws-sdk'

export default async function handler(요청, 응답) {
    try {
        aws.config.update({
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
            region: 'ap-northeast-2',
            signatureVersion: 'v4',
        });

        const s3 = new aws.S3();
        const url = await s3.createPresignedPost({
            Bucket: process.env.BUCKET_NAME,
            Fields: { key: 요청.query.file },
            Expires: 60, // seconds
            Conditions: [['content-length-range', 0, 1048576]], // 파일 용량 1MB 제한
        });
        console.log('성공url은: ', url);
        응답.status(200).json(url);
    } catch (error) {
        console.error('S3 presigned URL 생성 실패:', error);
        응답.status(500).json({ error: 'S3 URL 생성 중 오류가 발생했습니다.' });
    }
}
