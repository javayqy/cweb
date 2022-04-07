package cn.chilam.websiteback.service.impl;

import cn.chilam.websiteback.mapper.UserMapper;
import cn.chilam.websiteback.pojo.User;
import cn.chilam.websiteback.service.UserService;
import cn.chilam.websiteback.util.FolderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @program: website-back
 * @description: 用户信息服务实现类
 * @author: chilam
 * @create: 2020-03-04 23:39
 **/
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;
    @Value("${upload.file.location}")
    private String address;

    @Override
    public User getUserInfoByName(String username) {
        return userMapper.selectByName(username);
    }

    @Override
    public List<User> getAllUser() {
//        PageHelper.startPage(1,10);
        return userMapper.getAllUser();
    }

    @Override
    public boolean updatePassword(String username, String password, String newPassword) {
        if (userMapper.getPasswordByUsername(username).equals(password)) {
            userMapper.updatePassword(username, newPassword);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String getAvatarUrl(String username) {
        return userMapper.getAvatarUrl(username);
    }

    @Override
    public int isExists(String username) {
        return userMapper.isExistsByUsername(username);
    }

    @Override
    public boolean deleteUserById(Integer id) {
        try{
            String filePath =
                    address + "/user/" + id + "_" + userMapper.selectByPrimaryKey(id).getUsername();
            System.out.println(filePath);
            FolderUtil.deleteFolder(filePath);
            userMapper.deleteByPrimaryKey(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }


    }

    @Override
    public boolean updateUserById(User user) {
        return userMapper.updateByPrimaryKeySelective(user);
    }

}
