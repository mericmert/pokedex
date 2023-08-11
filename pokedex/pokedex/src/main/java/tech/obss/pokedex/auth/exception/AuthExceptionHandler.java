package tech.obss.pokedex.auth.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class AuthExceptionHandler {
    @ExceptionHandler(InvalidRegisterRequestException.class)
    public ResponseEntity<Object> handleInvalidRegisterRequestException(Exception ex, WebRequest request){
        return new ResponseEntity<>(ex.getMessage(), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidAuthenticationException.class)
    public ResponseEntity<Object> handleInvalidAuthenticationException(Exception ex, WebRequest request) {
        return new ResponseEntity<>(ex.getMessage(), new HttpHeaders(), HttpStatus.UNAUTHORIZED);
    }

}
