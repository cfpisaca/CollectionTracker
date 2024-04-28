package com.postgresql.collectionTracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.postgresql.collectionTracker.entity.MediaData;
import com.postgresql.collectionTracker.repository.StorageRepository;
import com.postgresql.collectionTracker.util.MediaUtils;

import jakarta.transaction.Transactional;

import java.io.IOException;
import java.util.Optional;

@Service
public class StorageService {

    @Autowired
    private StorageRepository repository;

    @Transactional
    public String uploadMedia(MultipartFile file) throws IOException {

        repository.save(MediaData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .mediaData(MediaUtils.compressMedia(file.getBytes())).build());
        {
            return "file uploaded successfully : " + file.getOriginalFilename();
        }
    }

    @Transactional
    public byte[] downloadMedia(String fileName){
        Optional<MediaData> dbMediaData = repository.findByName(fileName);
        byte[] medias=MediaUtils.decompressMedia(dbMediaData.get().getMediaData());
        return medias;
    }
}
