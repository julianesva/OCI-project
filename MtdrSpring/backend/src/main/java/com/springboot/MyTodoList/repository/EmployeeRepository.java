package com.springboot.MyTodoList.repository;

import com.google.common.base.Optional;
import com.springboot.MyTodoList.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    @Query("SELECT e FROM Employee e LEFT JOIN FETCH e.user WHERE e.id = :id")
    Optional<Employee> findEmployeeWithUserById(Integer id); // Removed @PathVariable annotation
}