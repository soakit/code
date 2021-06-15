# solidity

## 1. 格式

sample.sol

## 2.数据类型

- 布尔值：true false
  - 逻辑运算符：&& || !
- 整型
  - uint：无符号整型，智能表示正整数
  - int：和 js 里的 number 类似
- address
  地址，0x...一共 42 个字符，0x 表示 16 进制，共 160bit
  - 合约里的全局变量：msg.sender
  - address 类型的方法
    - blance 查看余额
    - transfer 转账
- string
  - string name = "zhangsan";
- 数组

  ```sol
    uint [5] arr = [1,2,3,4,5];
    arr[1] = 1;
    arr.push(6);
  ```

- map

  ```sol
  mapping(address => uint) users;
  users["address1"] = 100;
  users["address2"] = 10;
  ```

- struct: 结构体

  ```sol
    struct Student {
      uint id;
      string name;
      uint age;
    }
    Student stu;
    stu = Student(0, "zhangsan", 18)
  ```

- enum

  ```sol
    enum sex {
      male, female
    }
  ```
