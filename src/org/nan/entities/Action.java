package org.nan.entities;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;


@Entity
@Table(name="t_action")
@DynamicInsert(true)
@DynamicUpdate(true)
public class Action implements Serializable {
	private Integer id;   //记录id
	private String name;
	private Integer days;
	private Integer wdays;
	private String about;
	private Date startTime;
	private Date endtTime;
	private Integer style;
	
	public Action() {
		super();
	}
	public Action(Integer id, String name, Integer days, String about,
				  Date startTime) {
		super();
		this.id = id;
		this.name = name;
		this.days = days;
		this.about = about;
		this.startTime = startTime;
	}
	@Id
	@GeneratedValue
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getDays() {
		return days;
	}
	public void setDays(int days) {
		this.days = days;
	}
	public String getAbout() {
		return about;
	}
	public void setAbout(String about) {
		this.about = about;
	}
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="start_time")
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	@Transient
	@Override
	public String toString() {
		return "Action [id=" + id + ", name=" + name + ", days="
				+ days + ", about=" + about + ", startTime=" + startTime + "]";
	}

	
	
	
	
}
