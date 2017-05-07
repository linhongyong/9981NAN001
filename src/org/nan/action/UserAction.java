package org.nan.action;

import com.opensymphony.xwork2.ModelDriven;
import org.nan.entities.User;
import org.nan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;

/**
 * Created by liujianfei on 2017/5/5.
 */
public class UserAction extends BaseAction implements ModelDriven<User> {
    private User user;
    @Autowired
    private UserService userService;
    public String userLogin(){
        User loginUser = userService.getUserByUsername(user.getUsername());
        if(!Objects.isNull(loginUser)){
            return SUCCESS;
        }
        return INPUT;
    }

    public String userRegister(){
        if(userService.save(user)){
            return this.SUCCESS;
        }
        return INPUT;
    }


    @Override
    public User getModel() {
        if(Objects.isNull(user)){
            user = new User();
        }
        return user;
    }
}
