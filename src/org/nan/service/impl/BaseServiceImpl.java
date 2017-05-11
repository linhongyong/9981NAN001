package org.nan.service.impl;

import org.nan.dao.BaseDao;
import org.nan.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

/**
 * Created by Watermelon_R on 2017/5/5.
 */
@Transactional(propagation = Propagation.REQUIRED)
@Service("baseService")
public class BaseServiceImpl<T> implements BaseService<T> {

    @Autowired
    @Qualifier("baseDaoImpl")
    private BaseDao baseDao;
    private Class<?> clz;
    public Class getClz(){
        clz = ((Class<?>)(((ParameterizedType) (this.getClass().getGenericSuperclass())).getActualTypeArguments()[0]));
        return clz;
    }


    @Override
    public boolean save(T t) {
        if(baseDao.save(t))
        return true;
        return false;
    }

    @Override
    public boolean delete(T t) {
        if(baseDao.delete(t))
        return true;
        return false;
    }

    @Override
    public boolean delete(Integer id) {
       if(baseDao.delete(id))
           return true;
           return false;
    }

    @Override
    public boolean update(T t) {
        if(baseDao.saveOrUpdate(t))
        return true;
        return false;
    }

    @Override
    public <T> T getOne(Integer id) {

        return (T) baseDao.get(getClass(),id);
    }

    @Override
    public List<T> getAll() {
        return null;
    }
}
