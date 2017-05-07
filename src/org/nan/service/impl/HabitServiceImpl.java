package org.nan.service.impl;


import org.nan.dao.HabitDao;
import org.nan.entities.Habit;
import org.nan.service.BaseService;
import org.nan.service.HabitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(propagation = Propagation.REQUIRED)
@Service
public class HabitServiceImpl extends BaseServiceImpl<Habit> implements HabitService  {
	
	/*@Autowired
	private HabitDao mIHabitDao;

	@Transactional(propagation= Propagation.REQUIRED)
	@Override
	public boolean add(Habit habit) {
		return mIHabitDao.save(habit);
	}
	
	@Transactional(propagation= Propagation.REQUIRED)
	@Override
	public boolean delete(Integer id) {
		return mIHabitDao.delete(id);
	}
	
	@Transactional(propagation= Propagation.REQUIRED)
	@Override
	public boolean update(Habit habit) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Habit getOne(Integer id) {
		return mIHabitDao.getById(id);
	}
	@Transactional(readOnly=true)
	@Override
	public List<Habit> getAll() {
		List<Habit> allHabits = mIHabitDao.getAllHabits();
			return allHabits;
	}

	@Override
	public boolean daysUp(Integer id) {
		return mIHabitDao.updateDaysUp(id);
	}

	@Override
	public boolean daysDown(Integer id) {
		return mIHabitDao.updateDaysDown(id);
	}*/
}
