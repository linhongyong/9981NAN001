package org.nan.dao;


import org.nan.entities.Habit;

import java.util.List;

public interface HabitDao extends BaseDao<Habit> {
	List<Habit> getAllHabits();
	boolean updateDaysUp(Integer id);
	boolean updateDaysDown(Integer id);
}	
