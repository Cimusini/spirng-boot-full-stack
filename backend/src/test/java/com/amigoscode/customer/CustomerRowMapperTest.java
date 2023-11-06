package com.amigoscode.customer;

import org.junit.jupiter.api.Test;

import java.sql.ResultSet;
import java.sql.SQLException;

import static org.mockito.Mockito.*;

import static org.assertj.core.api.Assertions.assertThat;

class CustomerRowMapperTest {

    @Test
    void mapRow() throws SQLException {
        // Given
        CustomerRowMapper customerRowMapper = new CustomerRowMapper();
        ResultSet rs = mock(ResultSet.class);
        when(rs.getInt("id")).thenReturn(1);
        when(rs.getString("name")).thenReturn("Alex");
        when(rs.getString("email")).thenReturn("alex@gmail.com");
        when(rs.getInt("age")).thenReturn(19);
        when(rs.getString("gender")).thenReturn("MALE");
        when(rs.getString("password")).thenReturn("password");
        when(rs.getString("profile_image_id")).thenReturn("22222");

        // When
        Customer actual = customerRowMapper.mapRow(rs, 1);

        // Then
        Customer expeted = new Customer(
                1,"Alex","alex@gmail.com", "password", 19,Gender.MALE,"22222"
        );

        assertThat(actual).isEqualTo(expeted);
    }
}