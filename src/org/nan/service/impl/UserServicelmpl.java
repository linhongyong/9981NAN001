package org.nan.service.impl;

import org.nan.entities.Pagination;
import org.nan.entities.User;
import org.springframework.stereotype.Service;

import org.nan.service.UserService;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by nimon on 2017/5/3.
 */
@Transactional(propagation = Propagation.REQUIRED)
@Service("userServiceImpl")
public class UserServicelmpl extends BaseServiceImpl<User> implements UserService{


    @Override
    public User getUserByUsername(String username) {
        return null;
    }
}
