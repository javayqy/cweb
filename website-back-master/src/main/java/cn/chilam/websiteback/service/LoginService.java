package cn.chilam.websiteback.service;

import cn.chilam.websiteback.common.entity.ResultMap;
import cn.chilam.websiteback.pojo.User;

import java.util.List;

/**
 * @program: website-back
 * @description: 登录服务接口
 * @author: chilam
 * @create: 2020-03-04 17:28
 **/
public interface LoginService {
    Boolean loginVerify(String username, String password);

    ResultMap refreshToken(String token);

    int resign(String username,String password,String phoneNum,String realName,
               String idCard);

}
