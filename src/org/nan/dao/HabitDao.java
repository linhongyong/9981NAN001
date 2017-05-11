package org.nan.dao;


import org.nan.entities.Action;

import java.util.List;

public interface HabitDao extends BaseDao<Action> {
	List<Action> getAllHabits();
	boolean updateDaysUp(Integer id);
	boolean updateDaysDown(Integer id);
}	
