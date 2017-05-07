package org.nan.dao.impl;


import org.nan.dao.UserDao;
import org.nan.entities.User;
import org.springframework.stereotype.Repository;

/**
 * Created by nimon on 2017/5/3.
 */
@Repository("userlDaoImp")
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {

    @Override
    public User getUserByUsername(String username) {
        StringBuffer hql = new StringBuffer(" FROM User u WHERE u.username =");
        hql.append(username);
        User user = getOne(hql.toString(), new Object[]{});
        return user;
    }
}
