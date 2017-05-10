package org.nan.action;

import com.opensymphony.xwork2.ModelDriven;
import org.nan.entities.User;
import org.nan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
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
            if(loginUser.getPassword().equals(user.getPassword())) {
                mSession.put("loginUser",loginUser);
                return SUCCESS;
            }
            else {
                mRequest.setAttribute("ERROR","密码错误！");
                return INPUT;
            }
        }else{
            mRequest.setAttribute("ERROR","用户名不存在！");
            return INPUT;
        }
    }

    public String userRegister(){
        user.setStartTime(new Date());
        user.setLastTime(new Date());
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
