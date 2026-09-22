package com.klu.dto;

import com.klu.enums.Role;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequest {

	@NotBlank
	private String username;

	@NotBlank
	private String email;

	@NotBlank
	@Size(min = 6)
	private String password;

	@NotNull
	private Role role;
}