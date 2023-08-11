package tech.obss.pokedex.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tech.obss.pokedex.auth.exception.InvalidAuthenticationException;
import tech.obss.pokedex.auth.model.AuthDetails;
import tech.obss.pokedex.model.User;
import tech.obss.pokedex.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthorizationService {

    private final UserRepository userRepository;

    public boolean hasId(Long ID){
        try{
            String username =  ((AuthDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
            User user = userRepository.findByUsername(username).orElseThrow();
            return user.getId().equals(ID);
        } catch (Exception e){
            throw new InvalidAuthenticationException("You are not authorized!");
        }

    }

}
