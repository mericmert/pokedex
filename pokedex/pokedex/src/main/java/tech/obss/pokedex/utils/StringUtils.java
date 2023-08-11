package tech.obss.pokedex.utils;


import java.util.Objects;

public class StringUtils {
    public static boolean isNotBlank(String str){
        return Objects.nonNull(str) && str.length() != 0;
    }
    public static boolean isBlank(String str){
        return !isNotBlank(str);
    }
}