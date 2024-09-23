package com.example.backend.configs;

import java.util.Arrays;
import org.springframework.web.filter.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
			.cors(withDefaults())
			.authorizeHttpRequests(authorizeRequests -> authorizeRequests
					.requestMatchers("/password/validate")
					.hasAuthority("SCOPE_password-validator/password:validate"))
			.oauth2ResourceServer(oauth2 -> oauth2
					.jwt(withDefaults()));  
		return http.build();
	}

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
         // TODO: Change endpoint with domain AWS ---------------------------------------
        corsConfiguration.setAllowedOrigins(Arrays.asList(
            "http://ec2-107-22-85-101.compute-1.amazonaws.com",
            "http://localhost:4200",
            "http://localhost"
            ));
         // -----------------------------------------------------------------------------
        corsConfiguration.setAllowedMethods(Arrays.asList("OPTIONS", "POST"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        corsConfiguration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration); 

        return new CorsFilter(source);
    }
}
