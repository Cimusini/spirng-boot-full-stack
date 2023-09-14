package com.amigoscode.security;

import java.time.LocalDateTime;

public record ApiError(
   String path,
   String message,
   int stautsCode,
   LocalDateTime localDateTime
) {}
