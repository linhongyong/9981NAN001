package org.nan.dao.impl;


import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.nan.dao.BaseDao;
import org.nan.service.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.*;

/**
 * Updated by nimon on 2017/5/4.
 */
@Repository("baseDaoImpl")
public class BaseDaoImpl<T> implements BaseDao<T> {
    @Autowired
    private SessionFactory sessionFactory;
    private Class<?> clz;    //// TODO: 2017/5/4  ?代表什么

    /**
     * 获取当前可用的session
     *
     * @return
     */
    public Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    /**
     * 创建一个Class的对象来获取泛型的class
     */

    public BaseDaoImpl(){}

    /**
     * 改为构造方法
     */
    public Class getClz() {
        //获取第一个泛型的真实类型Class对象
        clz = ((Class<?>)
                (((ParameterizedType) (this.getClass().getGenericSuperclass())).getActualTypeArguments()[0]));
      return clz;
    }


    @Override
    public boolean save(T t) {
        try {
            getSession().save(t);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean update(T t) {
        try {
            getSession().update(t);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    @Override
    public boolean saveOrUpdate(T t) {
        try {
            this.getSession().saveOrUpdate(t);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean saveAll(Collection<?> entities) {
        Iterator<?> iterator = entities.iterator();
        while (iterator.hasNext()) {
            Object entity = iterator.next();
            try {
                getSession().save(entity);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
        return true;
    }

    @Override
    public boolean updateAll(Collection<?> entities) {
        Iterator<?> iterator = entities.iterator();
        while (iterator.hasNext()) {
            Object entity = iterator.next();
            try {
                getSession().update(entity);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
        return true;
    }

    @Override
    public boolean saveOrUpdateAll(Collection<?> entities) {
        Iterator<?> iterator = entities.iterator();
        while (iterator.hasNext()) {
            Object entity = iterator.next();
            try {
                getSession().saveOrUpdate(entity);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
        return true;
    }



    @Override
    public <T> T get(Class<T> entityClass, Serializable id) {
        T entity = (T) getSession().get(entityClass, id);
        return entity;
    }

    @Override
    public <T> T getOne(String queryString, Map<String, Object> params) {

        Query query = getSession().createQuery(queryString);
        setParameter(query, params);
        List list = query.setMaxResults(1).list();
        if (list == null) {
            return null;
        }
        return (T) list.get(0);
    }

    @Override
    public <T> T getOne(String queryString, Object[] params) {

        Query query = getSession().createQuery(queryString.toString());
        for (int i = 0; i < params.length; i++) {
            query.setParameter(i, params[i]);
        }
        List list = query.setMaxResults(1).list();
        if (list == null) {
            return null;
        }
        return (T) list.get(0);

    }

    @Override
    public <T> List<T> findList(CharSequence queryString, Object[] params) {

        Query query = getSession().createQuery(queryString.toString());
        for(int i=0;i<params.length;i++){
            query.setParameter(i,params[i]);
        }
        return query.list();
    }

    @Override
    public <T> List<T> findList(String queryString, Map<String, Object> params) {

        Query query = getSession().createQuery(queryString.toString());
        for(int i=0;i<params.size();i++){
            query.setParameter(i,params.get(i));
        }
        return query.list();
    }

    @Override
    public boolean delete(Integer id) {
        try {
            getSession().delete(load(id));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean delete(T t) {
        try {
            getSession().delete(t);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    @Override
    public T load(Integer id) {
        return (T) getSession().load(getClz(), id);
    }

    @Override
    public T getById(Integer id) {
        return (T) getSession().get(getClz(), id);
    }

    /**
     * 按照数组id返回一组数据
     *
     * @param ids
     * @return
     */
    @Override
    public List<T> getByIds(Integer[] ids) {
        return getSession()
                .createQuery("FROM User  WHERE id IN (:ids)")
                .setParameterList("ids", ids)
                .list();
    }


    @Override
    public List<T> getAll(String hql, Object[] args) {
        Session session = getSession();
        Query query = session.createQuery(hql);
        return setParamsByObjects(query, args).list();
    }


    @Override
    public List<T> getAll() {
        return getSession().createQuery(//
                "FROM " + getClz().getSimpleName())//
                .list();
    }


    @Override
    public Query setParamsByObjects(Query query, Object[] args) {
        if (args != null && args.length > 0) {
            for (int i = 0; i < args.length; i++) {
                query.setParameter(i + 1, args[i]);
            }
        }
        return query;
    }

    protected Query setParameter(Query query, Map<String, Object> parameterMap) {
        if(!Objects.isNull(parameterMap)) {
            for (@SuppressWarnings("rawtypes")
                 Iterator iterator = parameterMap.keySet().iterator(); iterator.hasNext(); ) {
                String key = (String) iterator.next();
                query.setParameter(key, parameterMap.get(key));
            }
        }
        return query;
    }


}
