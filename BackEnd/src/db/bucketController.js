const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

// Set up AWS credentials

async function getFileContent() {
  // Set up AWS credentials
  const s3Client = new S3Client({
    region: 'eu-west-2',
    credentials: {
      accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = { Bucket: 'skillsburst-bucket', Key: 'u1q1.json' };

  try {
    const response = await s3Client.send(new GetObjectCommand(params));
    // Read the body stream and convert it to a string
    let fileContent = '';
    response.Body.on('data', (chunk) => {
      fileContent += chunk.toString();
    });
    response.Body.on('end', () => {
      console.log('File content:', fileContent);
      console.log('done');
    });
  } catch (err) {
    console.error(err, err.stack);
  }
}


getFileContent();