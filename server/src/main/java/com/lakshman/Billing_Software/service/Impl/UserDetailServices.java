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
public class UserDetailServices implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public @NonNull UserDetails loadUserByUsername(@NonNull String identifier) throws UsernameNotFoundException {
        // Try to find by email first, then fall back to userId for backward
        // compatibility
        // This handles old JWT tokens that stored userId (UUID) instead of email
        UserEntity existingUser = userRepository.findByUserEmail(identifier)
                .or(() -> userRepository.findByUserId(identifier))
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + identifier));
        return new User(existingUser.getUserEmail(), existingUser.getUserPassword(),
                Collections.singleton(new SimpleGrantedAuthority(existingUser.getUserRole())));
    }
}
