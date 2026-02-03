package com.lakshman.Billing_Software.service.Impl;


import com.lakshman.Billing_Software.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUploadServiceImpl implements FileUploadService {

    @Value("${aws.bucket.name}")
    private String bucketName;

    private final S3Client s3Client;

    @Override
    public String uploadFile(MultipartFile file) {
        String fileNameExtension = Objects.requireNonNull(file.getOriginalFilename()).substring(file.getOriginalFilename().lastIndexOf(".")+1);
        String key = UUID.randomUUID().toString()+"." +fileNameExtension;

        try{
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .acl("public-read")
                    .contentType(file.getContentType())
                    .build();
            PutObjectResponse putObjectResponse = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

            if(putObjectResponse.sdkHttpResponse().isSuccessful()){
                return "https://"+bucketName+".s3.amazonaws.com/"+key;
            }
            else{
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An Internal server error occurred while uploading the file");
            }

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An Internal server error occurred while parsing the file");
        }
    }

    @Override
    public boolean deleteFile(String imageUrl) {
        String fileName = imageUrl.substring(imageUrl.lastIndexOf("/")+1);
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();
        s3Client.deleteObject(deleteObjectRequest);
        return true;
    }
}
