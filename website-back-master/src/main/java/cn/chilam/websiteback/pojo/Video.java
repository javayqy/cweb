package cn.chilam.websiteback.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * @program: website-back
 * @description: 视频信息
 * @author: chilam
 * @create: 2020-04-05 20:55
 **/
public class Video implements Serializable {

    private Integer id;
    private String name;
    private String url;
    private Long size;
    private Date date;

    public Video(String name, String url, Long size) {
        this.name = name;
        this.url = url;
        this.size = size;
    }

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
