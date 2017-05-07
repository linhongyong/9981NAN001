package org.nan.dao;

import org.hibernate.Query;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * hibernate 基本操作
 * @author Watermelon_R
 *
 * @param <T>
 */
public interface BaseDao<T> {
	
	/**
	 * 保存一个对象
	 *  */
	boolean save(T t);

    /**
     *
     * 保存或更新实体, 实体没有主键时保存，否则更新
     *
     * @param entity
     *            实体对象
     *
     */
    boolean saveOrUpdate(T entity);

    /**
     *
     * 批量更新实体
     *
     * @param entities
     *            实体集合
     *
     */
    boolean updateAll(Collection<?> entities);


    /**
     *
     * 批量保存或更新实体, 实体没有主键时保存，否则更新
     *
     * @param entity
     *            实体集合
     *
     */
    boolean saveOrUpdateAll(Collection<?> entity);

    /**
     *
     * 批量保存实体
     *
     * @param entities
     *            实体集合
     */
    boolean saveAll(Collection <?> entities);


    /**
     *
     * 获取单个实体，根据实体类及实体的主键获取。
     *
     * @param entityClass
     *            实体类
     * @param id
     *            实体主键
     * @return 实体对象
     */
    @SuppressWarnings("hiding")
    <T> T get(Class<T> entityClass, Serializable id);


    /**
     * 获取单个实体，根据查询语句及参数获取。
     *
     * @param queryString
     *            查询语句
     * @param params
     *            可选的查询参数
     * @return 单个实体，如果查询结果有多个，则返回第一个实体
     */
    @SuppressWarnings("hiding")
    <T> T getOne(String queryString, Map<String, Object> params);


    /**
     * 获取单个实体，根据查询语句及参数获取。
     *
     * @param queryString
     *            查询语句
     * @param params
     *            可选的查询参数
     * @return 单个实体，如果查询结果有多个，则返回第一个实体
     */
    @SuppressWarnings("hiding")
    <T> T getOne(String queryString, Object[] params);


    /**
     *
     * 查询实体列表
     *
     * @param queryString
     *            查询语句
     * @param params
     *            可选的查询参数
     * @return 实体列表
     */
    @SuppressWarnings("hiding")
    <T> List<T> findList(CharSequence queryString, Object... params);




    /**
     *
     * 查询实体列表
     *
     * @param queryString
     *            查询语句
     * @param params
     *            可选的查询参数
     * @return 实体列表
     */
    @SuppressWarnings("hiding")
    <T> List<T> findList(String queryString, Map<String, Object> params);





    /**
	 * 删除对象,对象需要ID,hibernate可以删除游离对象
	 * @param id
	 */
	boolean delete(Integer id);

	/**
	 * 删除游离对象
	 * @param t
	 * @return
	 */
	boolean delete(T t);
	/**
	 * 更新对象
	 * @param t
	 */
	boolean update(T t);
	
	
	public T load(Integer id);
	
	/**
	 * 查找一个对象根据Id
	 * @param id
	 * @return
	 */
	T getById(Integer id);

	/**
	 * 得到指定的一组对象
	 * @param ids
	 * @return
     */
	List<T> getByIds(Integer[] ids);
	
	/**
	 * 查找一组对象
	 * @return
	 */
	List<T> getAll(String hql, Object[] args);

	/**
	 * 重载,直接返回当前类的所有记录
	 * @return
     */
	public List<T> getAll();




	/**
	 * 设置hql一组问号值
	 * @param query
	 * @param args
	 * @return
	 */
	Query setParamsByObjects(Query query, Object[] args);


}
