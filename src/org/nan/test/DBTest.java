package org.nan.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.nan.entities.User;
import org.nan.service.UserService;
import org.nan.service.impl.UserServicelmpl;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;

/**
 * Created by Watermelon_R on 2017/5/6.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class DBTest {


    UserService userService;

    @Test
    public void testUser(){
        userService = new UserServicelmpl();
        User user = new User();
        user.setUsername("watermelon");
        user.setPassword("ljf645712");
        user.setStartTime(new Date());
        user.setLastTime(new Date());
        userService.save(user);
    }

}
