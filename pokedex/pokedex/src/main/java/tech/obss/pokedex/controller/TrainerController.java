package tech.obss.pokedex.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tech.obss.pokedex.auth.service.AuthorizationService;
import tech.obss.pokedex.model.Pokemon;
import tech.obss.pokedex.model.User;
import tech.obss.pokedex.model.dto.trainer.RemoveRequest;
import tech.obss.pokedex.service.TrainerService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/trainers")
@RequiredArgsConstructor
public class TrainerController {

    private final AuthorizationService authorizationService;
    private final TrainerService trainerService;

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllTrainers(){
        List<User> trainers = trainerService.getAll();
        if (trainers.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(trainers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getPokemon(@PathVariable Long id){
        Optional<User> trainer = trainerService.getTrainer(id);
        if (trainer.isPresent()){
            return ResponseEntity.ok(trainer.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/")
    public ResponseEntity<User> createTrainer(@RequestBody User trainer){
        User createdTrainer = trainerService.saveTrainer(trainer);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTrainer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateTrainer(@PathVariable Long id, @RequestBody User trainer) {
        if (!trainerService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        trainer.setId(id);
        User updatedTrainer = trainerService.saveTrainer(trainer);
        return ResponseEntity.ok(updatedTrainer);
    }

    @PreAuthorize("@authorizationService.hasId(#user_id)")
    @PostMapping("/{user_id}/catch/{pokemon_id}")
    public ResponseEntity<?> catchPokemon(
            @PathVariable(required = true) Long user_id,
            @PathVariable(required = true) Long pokemon_id){

        trainerService.catchPokemon(user_id, pokemon_id);
        return ResponseEntity.status(HttpStatus.OK)
                .body("User caught pokemon!");
    }

    @PreAuthorize("@authorizationService.hasId(#user_id)")
    @PostMapping("/{user_id}/wishlist/{pokemon_id}")
    public ResponseEntity<?> wishPokemon(
            @PathVariable(required = true) Long user_id,
            @PathVariable(required = true) Long pokemon_id){

        trainerService.wishPokemon(user_id, pokemon_id);
        return ResponseEntity.status(HttpStatus.OK)
                .body("User wished pokemon!");
    }

    @PreAuthorize("@authorizationService.hasId(#user_id)")
    @GetMapping("/catchlist/{user_id}")
    public ResponseEntity<List<Pokemon>> getCatchList(@PathVariable Long user_id){
        return ResponseEntity.ok(trainerService.getCatchList(user_id));
    }

    @PreAuthorize("@authorizationService.hasId(#user_id)")
    @GetMapping("/wishlist/{user_id}")
    public ResponseEntity<List<Pokemon>> getWishList(@PathVariable Long user_id){
        return ResponseEntity.ok(trainerService.getWishList(user_id));
    }

    @PostMapping("/{user_id}/wishlist/")
    public ResponseEntity<?> removeFromWishList(@PathVariable Long user_id, @RequestBody RemoveRequest request){
        trainerService.removeFromWishList(user_id, request.getPokemon_ids());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/{user_id}/catchlist/")
    public ResponseEntity<?> removeFromCatchList(@PathVariable Long user_id, @RequestBody RemoveRequest request){
        trainerService.removeFromCatchlist(user_id, request.getPokemon_ids());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
