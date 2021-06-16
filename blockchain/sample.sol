// 版本号
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {
    uint256 number;
    address owner;

    struct Student {
        uint256 id;
        string name;
        uint256 age;
    }

    Student stu;

    constructor() {
        // msg.sender 合约执行者
        owner = msg.sender;
        stu = Student(0, "zhangsan", 18);
    }

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
    // view函数 只读取变量，不写入
    // returns 返回值类型
    function retrieve() public view returns (uint256) {
        return number;
    }
}
