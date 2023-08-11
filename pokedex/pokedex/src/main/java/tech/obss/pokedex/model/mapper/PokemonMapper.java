package tech.obss.pokedex.model.mapper;

import tech.obss.pokedex.model.Pokemon;
import tech.obss.pokedex.model.dto.pokemon.PokemonDTO;

public class PokemonMapper {
    public static Pokemon toModel(PokemonDTO pokemonDTO) {
        return Pokemon.builder()
                .name(pokemonDTO.getName())
                .info(pokemonDTO.getInfo())
                .hp(pokemonDTO.getHp())
                .attack(pokemonDTO.getAttack())
                .defence(pokemonDTO.getDefence())
                .height(pokemonDTO.getHeight())
                .weight(pokemonDTO.getWeight())
                .speed(pokemonDTO.getSpeed())
                .build();
    }
}
