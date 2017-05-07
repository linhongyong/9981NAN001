package org.nan.service;

import org.nan.entities.User;



/**
 * Created by nimon on 2017/5/3.
 */
public interface UserService extends BaseService<User> {

    User getUserByUsername(String username);
}
