package com.lakshman.Billing_Software.controller;

import com.lakshman.Billing_Software.Util.JwtUtil;
import com.lakshman.Billing_Software.dto.AuthRequest;
import com.lakshman.Billing_Software.dto.AuthResponse;
import com.lakshman.Billing_Software.service.Impl.UserDetailServices;
import com.lakshman.Billing_Software.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailServices userDetailServices;
    private final UserService userService;

    private final JwtUtil jwtUtil;


    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) throws Exception {
        authenticate(authRequest.getUserEmail(), authRequest.getUserPassword());
        final UserDetails userDetails = userDetailServices.loadUserByUsername(authRequest.getUserEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);
        String role = userService.getUserRole(authRequest.getUserEmail());
        return new AuthResponse(jwtToken, authRequest.getUserEmail(), role);

    }

    private void authenticate(String userEmail, String userPassword) throws Exception {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userEmail, userPassword));
        }
        catch(DisabledException e){
            throw new Exception("User was Disables");
        }catch(BadCredentialsException e){
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email or Password is incorrect");
        }
    }

    @PostMapping("/encode")
    public String encodePassword(@RequestBody Map<String, String> payload) {
        return passwordEncoder.encode(payload.get("userPassword"));
    }

}
