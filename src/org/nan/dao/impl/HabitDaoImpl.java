package org.nan.dao.impl;


import org.nan.dao.HabitDao;
import org.nan.entities.Action;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("habitDaoImpl")
public class HabitDaoImpl extends BaseDaoImpl<Action> implements HabitDao {

    @Override
    public List<Action> getAllHabits() {
        String hql = " FROM Action";
        try {
            return getAll(hql, null);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean updateDaysUp(Integer id) {

        Action habit = getById(id);
        habit.setDays(habit.getDays() + 1);
        return update(habit);
    }

    @Override
    public boolean updateDaysDown(Integer id) {
        Action habit = getById(id);
        habit.setDays(habit.getDays() - 1);
        return update(habit);
    }
}


