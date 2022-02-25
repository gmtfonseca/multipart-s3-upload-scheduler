# Multipart S3 Upload Scheduler

This script is a scheduler that uploads files to a S3 bucket weekly. It uses the [multipart upload API](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html) and streams, therefore, it's suited to upload big files.

## Setup

Just create a `.env` file at the root directory and set the following environment variables:

```shell
DAY_OF_WEEK= # The day of the week that the schedule should upload your file. Valid values are [SUN, MON, TUE, WED, THU, FRI, SAT].
FILES_PATH= # Comma separated absolute paths of files you want to upload.
PART_SIZE_MB= # The minimum number of bytes for an individual part upload
QUEUE_SIZE= # The size of the concurrent queue manager to upload parts in parallel. Set to 1 for synchronous uploading of parts. Note that the uploader will buffer at most QUEUE_SIZE * PART_SIZE_MB bytes into memory at any given time.
S3_BUCKET_NAME= # S3 Bucket Name to each the files will be uploaded.
AWS_ACCESS_KEY_ID= # Your AWS access key ID.
AWS_SECRET_ACCESS_KEY= # Your AWS secret access key ID
```
