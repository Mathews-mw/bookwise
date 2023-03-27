import aws from 'aws-sdk';
import { env } from '../env';
import multerS3 from 'multer-s3';
import crypto from 'node:crypto';
import multer, { Multer } from 'multer';
import { S3Client } from '@aws-sdk/client-s3';

interface IStorageProvider {
	storage(): Multer;
	delete(file: string): Promise<void>;
}

const s3 = new S3Client({
	region: env.AWS_REGION,
	credentials: {
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
		accessKeyId: env.AWS_ACCESS_KEY_ID,
	},
});

export const S3StorageProvider: IStorageProvider = {
	storage: () => {
		const upload = multer({
			storage: multerS3({
				s3,
				bucket: env.AWS_BUCKET,
				acl: 'public-read',
				contentType: multerS3.AUTO_CONTENT_TYPE,
				metadata: function (req, file, cb) {
					cb(null, { fieldName: file.fieldname });
				},
				key: function (req, file, cb) {
					crypto.randomBytes(8, (err, hash) => {
						if (err) cb(err);

						const filename = `bookwise/${hash.toString('hex')}-${file.originalname}`;

						cb(null, filename);
					});
				},
			}),
		});

		return upload;
	},

	delete: async (file) => {
		const client = new aws.S3({
			region: env.AWS_REGION,
			credentials: {
				secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
				accessKeyId: env.AWS_ACCESS_KEY_ID,
			},
		});

		await client.deleteObject({
			Bucket: env.AWS_BUCKET,
			Key: file,
		});
	},
};

export const upload = multer({
	storage: multerS3({
		s3,
		bucket: `${process.env.AWS_BUCKET}`,
		acl: 'public-read',
		contentType: multerS3.AUTO_CONTENT_TYPE,
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			crypto.randomBytes(8, (err, hash) => {
				if (err) cb(err);

				const filename = `bookwise/${hash.toString('hex')}-${file.originalname}`;

				cb(null, filename);
			});
		},
	}),
});
