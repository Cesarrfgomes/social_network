import aws from 'aws-sdk'
import { string0To255 } from 'aws-sdk/clients/customerprofiles'

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3 as string)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID as string,
        secretAccessKey: process.env.APP_KEY as string
    }
})

export const uploadFile = async (path: string, buffer: Buffer, mimetype: string0To255) => {
    const file = await s3.upload({
        Bucket: process.env.BUCKET_NAME as string,
        Key: path,
        Body: buffer,
        ContentType: mimetype
    }).promise()

    return file.Location
}