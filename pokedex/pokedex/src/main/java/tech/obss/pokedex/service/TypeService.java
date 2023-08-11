package tech.obss.pokedex.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.obss.pokedex.model.Type;
import tech.obss.pokedex.repository.TypeRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TypeService {

    private final TypeRepository typeRepository;

    public List<Type> getTypes() {
        return typeRepository.findAll();
    }

    public void createType(Type type){
        typeRepository.save(type);
    }

    public Type findByName(String types) {
        return typeRepository.findByName(types).orElseThrow();
    }
}
