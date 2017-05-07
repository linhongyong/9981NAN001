package org.nan.dao.impl;


import org.nan.dao.HabitDao;
import org.nan.entities.Habit;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("habitDaoImpl")
public class HabitDaoImpl extends BaseDaoImpl<Habit> implements HabitDao {

    @Override
    public List<Habit> getAllHabits() {
        String hql = " FROM Habit";
        try {
            return getAll(hql, null);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean updateDaysUp(Integer id) {

        Habit habit = getById(id);
        habit.setDays(habit.getDays() + 1);
        return update(habit);
    }

    @Override
    public boolean updateDaysDown(Integer id) {
        Habit habit = getById(id);
        habit.setDays(habit.getDays() - 1);
        return update(habit);
    }
}


