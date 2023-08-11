package tech.obss.pokedex.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tech.obss.pokedex.auth.model.Role;
import tech.obss.pokedex.model.User;
import tech.obss.pokedex.model.dto.user.PutRequest;
import tech.obss.pokedex.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    public List<User> getAll(){
        return userRepository.findAll();
    }

    public List<User> getAllByRole(Role role) {
        return userRepository.findAllByRole(role);
    }

    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }
    public Optional<User> getUserByIdAndRole(Long id, Role role){
        return userRepository.findByIdAndRole(id, role);
    }

    public User saveUser(User trainer) {
        return userRepository.save(trainer);
    }

    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    public boolean existsByIdAndRole(Long id, Role role){
        return userRepository.existsByIdAndRole(id, role);
    }


    public void removeUsers(String idList) {
        String[] ids = idList.split("\\|");
        for(String id : ids){
            userRepository.deleteById(Long.parseLong(id));
        }
    }

    public String updateUser(PutRequest request, Long userID) {
        User user =  userRepository.findById(userID).orElseThrow();
        user.setUsername(request.getUsername());
        user.setRole(Role.valueOf(request.getRole()));
        user.setEnabled(Boolean.parseBoolean(request.getIsEnabled()));
        user.setEmail(request.getEmail());
        userRepository.save(user);

        return "User updated!";
    }
}
