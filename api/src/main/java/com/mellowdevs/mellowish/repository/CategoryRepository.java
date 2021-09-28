package com.mellowdevs.mellowish.repository;

import com.mellowdevs.mellowish.domain.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author mellow
 */
@Repository
public interface CategoryRepository extends MongoRepository<Category, String > {
    Category findCategoryBy_idAndUsername(String id, String username);
    List<Category> findAllByUsername(String username);
    Category deleteCategoryBy_idAndUsername(String id, String username);
    void deleteAllByUsername(String username);
}
