import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'your-access-key',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'your-secret-key',
  region: process.env.AWS_REGION || 'your-region',
});

export const getresume = async (fileUrl: string): Promise<Buffer | null> => {
  const s3 = new AWS.S3();
  const fileKey = fileUrl.split('/').pop();

  const params = {
    Bucket: 'resumatchai',
    Key: fileKey!,
  };

  try {
    const data = await s3.getObject(params).promise();
    return data.Body as Buffer;
  } catch (err) {
    console.error('Error fetching file:', err);
    return null;
  }
};
