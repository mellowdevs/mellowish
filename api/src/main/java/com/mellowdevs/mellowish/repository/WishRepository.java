package com.mellowdevs.mellowish.repository;

import com.mellowdevs.mellowish.domain.Wish;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author mellow
 */
@Repository
public interface WishRepository extends MongoRepository<Wish, String> {
    List<Wish> findAllByCategoryId(String catId);
    Wish findWishBy_idAndCategoryIdAndUsername(String id,String catId, String username);
    Wish deleteWishBy_id(String id);
    void deleteAllByCategoryIdAndUsername(String catId, String username);

}
