package tech.obss.pokedex.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.obss.pokedex.model.Pokemon;
import tech.obss.pokedex.model.dto.pokemon.PokemonDTO;
import tech.obss.pokedex.model.dto.pokemon.PutRequest;
import tech.obss.pokedex.model.dto.user.RemoveRequest;
import tech.obss.pokedex.model.mapper.PokemonMapper;
import tech.obss.pokedex.service.PokemonService;
import tech.obss.pokedex.service.TypeService;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/pokemons")
@RequiredArgsConstructor
public class PokemonController {

    private final PokemonService pokemonService;
    private final TypeService typeService;

    @GetMapping("/")
    public ResponseEntity<List<Pokemon>> getAllPokemons(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String types
    ) {
        List<Pokemon> pokemons;

        pokemons = pokemonService.getAllPokemons(name, sortBy, types, page, size);

        if (pokemons.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(pokemons);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pokemon> getPokemon(@PathVariable Long id) {
        Optional<Pokemon> pokemon = pokemonService.getPokemon(id);
        if (pokemon.isPresent()) {
            return ResponseEntity.ok(pokemon.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/")
    public ResponseEntity<Pokemon> createPokemon(
            @ModelAttribute PokemonDTO pokemonDTO,
            @RequestPart MultipartFile image_file
    ) {
        Pokemon savedPokemon = pokemonService.savePokemon(PokemonMapper.toModel(pokemonDTO));
        if (Objects.nonNull(image_file)){
            pokemonService.imageUpload(image_file, savedPokemon);
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/delete")
    public ResponseEntity<String> removeUsers(@RequestBody RemoveRequest req){
        pokemonService.removePokemons(req.getIdList());
        return ResponseEntity.ok("Succesfully removed!");
    }

    @GetMapping("/images/{fileName}")
    public ResponseEntity<?> getImage(@PathVariable String fileName) throws IOException{
        byte[] imageData = pokemonService.getImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }

    @PutMapping("/{pokemon_id}")
    public ResponseEntity<String> updatePokemon(
            @PathVariable Long pokemon_id,
            @ModelAttribute PutRequest req,
            @RequestPart(required = false) MultipartFile image_file){
        return ResponseEntity.ok(pokemonService.updatePokemon(req, pokemon_id, image_file));
    }


}
