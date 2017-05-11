package org.nan.service.impl;


import org.nan.entities.Action;
import org.nan.service.HabitService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Transactional(propagation = Propagation.REQUIRED)
@Service
public class HabitServiceImpl extends BaseServiceImpl<Action> implements HabitService  {
	
	/*@Autowired
	private HabitDao mIHabitDao;

	@Transactional(propagation= Propagation.REQUIRED)
	@Override
	public boolean add(Action habit) {
		return mIHabitDao.save(habit);
	}
	
	@Transactional(propagation= Propagation.REQUIRED)
	@Override
	public boolean delete(Integer id) {
		return mIHabitDao.delete(id);
	}
	
	@Transactional(propagation= Propagation.REQUIRED)
	@Override
	public boolean update(Action habit) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Action getOne(Integer id) {
		return mIHabitDao.getById(id);
	}
	@Transactional(readOnly=true)
	@Override
	public List<Action> getAll() {
		List<Action> allHabits = mIHabitDao.getAllHabits();
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
