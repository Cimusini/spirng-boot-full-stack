package com.amigoscode.auth;

import com.amigoscode.customer.Customer;
import com.amigoscode.customer.CustomerDTO;
import com.amigoscode.customer.CustomerDTOMapper;
import com.amigoscode.jwt.JWTUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final CustomerDTOMapper mapper;
    private final JWTUtil jwtUtil;

    public AuthenticationService(
            AuthenticationManager authenticationManager,
            CustomerDTOMapper mapper,
            JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.mapper = mapper;
        this.jwtUtil = jwtUtil;
    }

    public AuthenticationResponse login(AuthenticationRequest request){
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );
        Customer customer = (Customer) authenticate.getPrincipal();
        CustomerDTO customerDTO = mapper.apply(customer);
        String token = jwtUtil.issueToken(customerDTO.username(), customerDTO.roles());
        return new AuthenticationResponse(token, customerDTO);
    }
}
