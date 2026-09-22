package com.klu.entity;

import java.time.LocalDateTime;

import com.klu.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name="Users")
@Getter
@Setter
public class User {
	
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Column(nullable=false,unique=true)
	private String email;
	@NotBlank
	@Column(nullable=false)
	private String password;
	@NotBlank
	@Column(nullable=false,unique=true)
	private String username;
	@Enumerated(EnumType.STRING)
	private Role role;
	private boolean enabled;
	
	private LocalDateTime createdAt;
}
