package tech.obss.pokedex.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.obss.pokedex.model.User;
import tech.obss.pokedex.model.dto.user.PutRequest;
import tech.obss.pokedex.model.dto.user.RemoveRequest;
import tech.obss.pokedex.service.UserService;

import java.util.List;

@RestController
@RequestMapping("api/v1/users/")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getAll();
        if (users.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> removeUsers(@RequestBody RemoveRequest req){
        userService.removeUsers(req.getIdList());
        return ResponseEntity.ok("Succesfully removed!");
    }

    @PutMapping("/{user_id}")
    public ResponseEntity<String> updateUser(@PathVariable Long user_id, @RequestBody PutRequest req){
        return ResponseEntity.ok(userService.updateUser(req, user_id));
    }

}
