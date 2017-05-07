package org.nan.entities;

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

/**
 * Created by nimon on 2017/5/3.
 */
@Entity
@Table(name = "t_user")
public class User implements Serializable {

    private int id;
    private String username;
    private  String password;
    private Date startTime;
    private Date lastTime;

    public User() {
    }

    public User(int id, String username, String password, Date startTime, Date lastTime) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.startTime = startTime;
        this.lastTime = lastTime;
    }

    @Override
    @Transient
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", settingTime=" + startTime +
                ", lastTime=" + lastTime +
                '}';
    }
    @Id
    @GeneratedValue
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_time",nullable = false)
    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date settingTime) {
        this.startTime = settingTime;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_time",nullable = false)
    public Date getLastTime() {
        return lastTime;
    }

    public void setLastTime(Date lastTime) {
        this.lastTime = lastTime;
    }
}
