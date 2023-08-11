package tech.obss.pokedex.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tech.obss.pokedex.model.FileData;
import tech.obss.pokedex.model.Pokemon;
import tech.obss.pokedex.repository.FileDataRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
@RequiredArgsConstructor
public class StorageService {

    private final FileDataRepository fileDataRepository;

    private final static String FOLDER_PATH = "/Users/mericmertbulca/desktop/image_data/";

    public void uploadImageToFileSystem(MultipartFile file, Pokemon pokemon) throws IOException {
        String fileName = pokemon.getId() + "_" + file.getOriginalFilename();
        String filePath = FOLDER_PATH + fileName;
        fileDataRepository.save(FileData.builder()
                .name(fileName)
                .type(file.getContentType())
                .filePath(filePath)
                .pokemon(pokemon)
                .build());

        file.transferTo(new File(filePath));
    }

    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        FileData fileData = fileDataRepository.findByName(fileName).orElseThrow();
        String filePath = fileData.getFilePath();
        byte[] image = Files.readAllBytes(new File(filePath).toPath());
        return image;
    }

    public void updateImage(Long id, MultipartFile imageFile) throws IOException {
        FileData fileData = fileDataRepository.findByPokemonId(id).orElseThrow();
        String fileName = id + "_" + imageFile.getOriginalFilename();
        String filePath = FOLDER_PATH + fileName;
        fileData.setName(fileName);
        fileData.setType(imageFile.getContentType());
        fileData.setFilePath(filePath);

        imageFile.transferTo(new File(filePath));
        fileDataRepository.save(fileData);
    }
}
