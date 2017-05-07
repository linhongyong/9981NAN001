package org.nan.dao;


import org.nan.entities.User;

/**
 * Created by nimon on 2017/5/3.
 */
public interface UserDao extends BaseDao<User> {
    /**
     * 根据username获取User对象
     * @param username
     * @return User实例
     */
    User getUserByUsername(String username);

}
