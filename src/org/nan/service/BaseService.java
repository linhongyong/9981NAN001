package org.nan.service;

import java.util.List;

/**
 * Created by Watermelon_R on 2017/5/4.
 */
public interface BaseService<T> {

    /**
     * 保存
     * @param t
     * @return
     */
    boolean save(T t);

    /**
     * 删除对象实例
     * @param t
     * @return
     */
    boolean delete(T t);

    /**
     * 根据id删除
     * @param id
     * @return
     */
    boolean delete(Integer id);

    /**
     * 更新
     * @param t
     * @return
     */
    boolean update(T t);

    /**
     * 根据id获取一个
     * @param id
     * @param <T>
     * @return
     */
    <T> T getOne(Integer id);

    /**
     * 查询全部
     * @return
     */
    List<T> getAll();
}
