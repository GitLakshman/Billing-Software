package com.lakshman.Billing_Software.service.Impl;

import com.lakshman.Billing_Software.entity.UserEntity;
import com.lakshman.Billing_Software.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public @NonNull UserDetails loadUserByUsername(@NonNull String userEmail) throws UsernameNotFoundException {
        UserEntity existingUser = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + userEmail));
        return new User(existingUser.getUserEmail(), existingUser.getUserPassword(),
                Collections.singleton(new SimpleGrantedAuthority(existingUser.getUserRole())));
    }
}
