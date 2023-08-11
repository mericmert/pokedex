package tech.obss.pokedex;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tech.obss.pokedex.repository.PokemonRepository;

@SpringBootApplication
@RequiredArgsConstructor
public class PokedexApplication {
    public static void main(String[] args) {
        SpringApplication.run(PokedexApplication.class, args);
    }

}
