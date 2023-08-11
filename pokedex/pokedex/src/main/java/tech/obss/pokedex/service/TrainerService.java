package tech.obss.pokedex.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.obss.pokedex.auth.model.Role;
import tech.obss.pokedex.model.Pokemon;
import tech.obss.pokedex.model.User;
import tech.obss.pokedex.repository.PokemonRepository;
import tech.obss.pokedex.repository.UserRepository;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class TrainerService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PokemonRepository pokemonRepository;

    public List<User> getAll() {
        return userService.getAllByRole(Role.TRAINER);
    }
    public Optional<User> getTrainer(Long id) {

        return userService.getUserByIdAndRole(id, Role.TRAINER);
    }
    public User saveTrainer(User trainer) {
        return userService.saveUser(trainer);
    }

    public boolean existsById(Long id) {
        return userService.existsByIdAndRole(id, Role.TRAINER);
    }

    public void catchPokemon(Long userId, Long pokemonId) {
        User user = userRepository.findById(userId).orElseThrow();
        Pokemon pokemon = pokemonRepository.findById(pokemonId).orElseThrow();
        user.getCatchList().add(pokemon);
        userRepository.save(user);
    }

    public void wishPokemon(Long userId, Long pokemonId) {
        User user = userRepository.findById(userId).orElseThrow();
        Pokemon pokemon = pokemonRepository.findById(pokemonId).orElseThrow();
        user.getWishList().add(pokemon);
        userRepository.save(user);
    }

    public List<Pokemon> getCatchList(Long userId) {
        User user =  userRepository.findById(userId).orElseThrow();
        return user.getCatchList();
    }

    public List<Pokemon> getWishList(Long userId) {
        User user =  userRepository.findById(userId).orElseThrow();
        return user.getWishList();


    }

    public void removeFromWishList(Long user_id, String pokemonIds) {
        User user = userRepository.findById(user_id).orElseThrow();
        List<Pokemon> wishList = user.getWishList();
        String[] ids = pokemonIds.split("\\|");
        Pokemon pokemon;
        for(String id : ids){
            pokemon = pokemonRepository.findById(Long.parseLong(id)).orElse(null);
            if (pokemon != null){
                wishList.remove(pokemon);
            }
        }
        userRepository.save(user);
    }

    public void removeFromCatchlist(Long userId, String pokemonIds) {
        User user = userRepository.findById(userId).orElseThrow();
        List<Pokemon> wishList = user.getWishList();
        String[] ids = pokemonIds.split("\\|");
        Pokemon pokemon;
        for(String id : ids){
            pokemon = pokemonRepository.findById(Long.parseLong(id)).orElse(null);
            if (pokemon != null){
                wishList.remove(pokemon);
            }
        }
        userRepository.save(user);
    }
}
