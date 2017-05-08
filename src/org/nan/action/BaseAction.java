package org.nan.action;

import com.opensymphony.xwork2.ActionSupport;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.SessionAware;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;


/**
 * @Date   2017-05-08
 * Created by nimon on 2017/5/3.
 */
public class BaseAction extends ActionSupport implements SessionAware, ServletRequestAware {
    protected Map<String, Object> mSession;
    protected HttpServletRequest mRequest;

    @Override
    public void setServletRequest(HttpServletRequest request) {
        mRequest = request;
    }

    @Override
    public void setSession(Map<String, Object> map) {
        mSession = map;
    }
}
