package com.amigoscode.customer;

import com.amigoscode.exception.DuplicateResourceException;
import com.amigoscode.exception.RequestValidationException;
import com.amigoscode.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    private final CustomerDAO customerDAO;
    private final CustomerDTOMapper customerDTOMapper;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(@Qualifier("jdbc") CustomerDAO customerDAO,
                           CustomerDTOMapper customerDTOMapper,
                           PasswordEncoder passwordEncoder) {
        this.customerDAO = customerDAO;
        this.passwordEncoder = passwordEncoder;
        this.customerDTOMapper = customerDTOMapper;
    }

    public List<CustomerDTO> getAllCustomers() {
        return customerDAO.selectAllCustomers()
                .stream()
                .map(customerDTOMapper)
                .collect(Collectors.toList());
    }

    public CustomerDTO getCustomer(Integer id) {
        return customerDAO.selectCustomerById(id)
                .map(customerDTOMapper)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "customer with id [%s] not found".formatted(id)
                ));
    }

    public void addCustomer(CustomerRegistrationRequest customerRegistrationRequest) {
        if (customerDAO.existsCustomerWithEmail(customerRegistrationRequest.email())) {
            throw new DuplicateResourceException("email already taken");
        }
        customerDAO.insertCustomer(
                new Customer(
                        customerRegistrationRequest.name(),
                        customerRegistrationRequest.email(),
                        passwordEncoder.encode(customerRegistrationRequest.password()),
                        customerRegistrationRequest.age(),
                        customerRegistrationRequest.gender()
                )
        );
    }

    public void deleteCustomerById(Integer id) {
        if (!customerDAO.existsCustomerWithId(id)) {
            throw new ResourceNotFoundException(
                    "customer with id [%s] not found".formatted(id)
            );
        }
        customerDAO.deleteCustomerById(id);
    }


    public void updateCustomer(Integer customerId, CustomerUpdateRequest updateRequest) {
        Customer customer = customerDAO.selectCustomerById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "customer with id [%s] not found".formatted(customerId)
                ));

        boolean changes = false;

        if(updateRequest.name() != null && !updateRequest.name().equals(customer.getName())){
            customer.setName(updateRequest.name());
            changes = true;
        }

        if(updateRequest.age() != null && !updateRequest.age().equals(customer.getAge())){
            customer.setAge(updateRequest.age());
            changes = true;
        }

        if(updateRequest.email() != null && !updateRequest.email().equals(customer.getEmail())){
            if(customerDAO.existsCustomerWithEmail(updateRequest.email())){
                throw new DuplicateResourceException("email already taken");
            }
            customer.setEmail(updateRequest.email());
            changes = true;
        }

        if(updateRequest.gender() != null && !updateRequest.gender().equals(customer.getGender())){
            customer.setGender(updateRequest.gender());
            changes = true;
        }

        if(!changes){
            throw new RequestValidationException("no data changes found");
        }

        customerDAO.updateCustomer(customer);
    }
}
