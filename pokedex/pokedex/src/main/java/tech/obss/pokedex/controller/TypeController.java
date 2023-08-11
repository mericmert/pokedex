package tech.obss.pokedex.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.obss.pokedex.model.Type;
import tech.obss.pokedex.model.dto.type.CreateRequest;
import tech.obss.pokedex.service.TypeService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/types")
@RequiredArgsConstructor
public class TypeController {

    private final TypeService typeService;

    @GetMapping("/")
    public ResponseEntity<List<Type>> getPokemonTypes() {
        List<Type> types = typeService.getTypes();
        if (types.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(types);
    }
    @PostMapping("/")
    public ResponseEntity<?> createType(@RequestBody CreateRequest req) {
        Type type = Type.builder()
                .name(req.getName())
                .color(Type.Color.valueOf(req.getColor()))
                .build();

        typeService.createType(type);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
