package tech.obss.pokedex.service;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tech.obss.pokedex.auth.model.Role;
import tech.obss.pokedex.model.Pokemon;
import tech.obss.pokedex.model.Type;
import tech.obss.pokedex.model.User;
import tech.obss.pokedex.model.dto.pokemon.PutRequest;
import tech.obss.pokedex.repository.PokemonRepository;
import tech.obss.pokedex.utils.StringUtils;

import java.io.File;
import java.io.IOException;
import java.security.InvalidParameterException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PokemonService {

    private final PokemonRepository pokemonRepository;
    private final StorageService storageService;
    private final TypeService typeService;

    public List<Pokemon> getAllPokemons(String name, String sortBy, String types, Integer page, Integer size) {
        Specification<Pokemon> spec = ((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.isNotBlank(name)){
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
            }
            if (StringUtils.isNotBlank(types)){
                predicates.add(root.get("types").get("name").in(types.split("_")));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        boolean isPaginated = Objects.nonNull(page) && Objects.nonNull(size);
        if (isPaginated && StringUtils.isNotBlank(sortBy)){
            Pageable pageSortRequest = PageRequest.of(page, size, sortRequest(sortBy));
            return pokemonRepository.findAll(spec, pageSortRequest);
        } else if (StringUtils.isNotBlank(sortBy)){
            Sort sort = sortRequest(sortBy);
            return pokemonRepository.findAll(spec, sort);
        } else if (isPaginated){
            Pageable pageRequest = PageRequest.of(page, size);
            return pokemonRepository.findAll(spec, pageRequest);
        }
        return pokemonRepository.findAll(spec);

    }

    public Optional<Pokemon> getPokemon(Long id) {
        return pokemonRepository.findById(id);
    }

    public Pokemon savePokemon(Pokemon pokemon) {
        return pokemonRepository.save(pokemon);

    }

    public boolean existsById(Long id) {

        return pokemonRepository.existsById(id);

    }

    private Sort sortRequest(String sortBy){
        return switch (sortBy) {
            case "lowest_n" -> Sort.by("id").ascending();
            case "lowest_hp" -> Sort.by("hp").ascending();
            case "lowest_at" -> Sort.by("attack").ascending();
            case "lowest_def" -> Sort.by("defence").ascending();
            case "lowest_speed" -> Sort.by("speed").ascending();
            case "highest_n" -> Sort.by("id").descending();
            case "highest_hp" -> Sort.by("hp").descending();
            case "highest_at" -> Sort.by("attack").descending();
            case "highest_def" -> Sort.by("defence").descending();
            case "highest_speed" -> Sort.by("speed").descending();
            default -> throw new InvalidParameterException("Invalid sort type!");
        };
    }

    public void imageUpload(MultipartFile file, Pokemon pokemon) {
        try{
            storageService.uploadImageToFileSystem(file,pokemon);
        } catch (Exception e){
            throw new InvalidParameterException("You couldn't upload the file properly!");
        }
    }

    public byte[] getImage(String filename) throws IOException {
            return storageService.downloadImageFromFileSystem(filename);
    }

    public void removePokemons(String idList) {
        String[] ids = idList.split("\\|");
        for(String id : ids){
            pokemonRepository.deleteById(Long.parseLong(id));
        }
    }

    public String updatePokemon(PutRequest req, Long id, MultipartFile image_file) {
        if (image_file != null){
            try{
                storageService.updateImage(id, image_file);
            } catch (IOException exception){
                System.out.println("Image couldn't be updated!");
            }
        }
        Pokemon pokemon = pokemonRepository.findById(id).orElseThrow();
        pokemon.setName(req.getName());
        pokemon.setInfo(req.getInfo());
        pokemon.setHeight(req.getHeight());
        pokemon.setWeight(req.getWeight());
        pokemon.setHp(req.getHp());
        pokemon.setAttack(req.getAttack());
        pokemon.setDefence(req.getDefence());
        pokemon.setSpeed(req.getSpeed());
        if (!req.getTypes().isBlank()){
            Type type = typeService.findByName(req.getTypes());
            if (!pokemon.getTypes().contains(type)){
                pokemon.getTypes().add(type);
            }
        }
        pokemonRepository.save(pokemon);
        return "User updated!";
    }
}
