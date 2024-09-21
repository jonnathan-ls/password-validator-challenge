package com.example.backend.utils;

import java.util.ArrayList;
import java.util.List;

public class RegexManagerUtil {
    public static String buildRegex(List<String> conditions) {
        StringBuilder regex = new StringBuilder();
        regex.append("^");
        for (String part : conditions) {
            regex.append(part);
        }
        regex.append("$");

        return regex.toString();
    }

    public static String getRegexExpression(ArrayList<String> requirements) {
        List<String> conditions = new ArrayList<String>();
        for (String req : requirements) {
            conditions.add(req);
        }
        String regexExpression = buildRegex(conditions);

        return regexExpression;
    }
}
