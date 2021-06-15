# mysql 必知必会

1. 创建数据库

   ```sql
   create database test;
   ```

2. 使用数据库

   ```sql
   use test;
   ```

3. 去重

   ```sql
   select distinct vend_id from products;
   ```

4. 分页

   ```sql
   # 第 1-5 条
   select * from products limit 5; # 等同于 limit 0, 5

   # 第 5-10 条
   select * from products limit 5, 5;

   select * from products limit 0, 1; # 等同于 limit 1

   # 从行 3 取 4 行，等同于 limit 3, 4
   select * from products limit 4 offset 3;
   ```

5. 不等于的两种表示

   ```sql
   select * from products
   where prod_name != 'fuses';

   select * from products
   where prod_name <> 'fuses';
   ```

6. between and 前后值都包含

   ```sql
   select prod_name, prod_price from products
   where prod_price >= 5.99 and prod_price <= 10;

   select prod_name, prod_price from products
   where prod_price between 5.99 and 10;
   ```

7. 计算次序

   ```sql
   # 先执行and再执行or
   SELECT prod_name, prod_price
   FROM products
   WHERE vend_id = 1002 OR vend_id = 1003 AND prod_price >= 10;

   # 因此需要用括号括起来
   SELECT prod_name, prod_price
   FROM products
   WHERE (vend_id = 1002 OR vend_id = 1003) AND prod_price >= 10;
   ```

8. in 操作符

   ```sql
   SELECT prod_name, prod_price
   FROM products
   WHERE vend_id IN (1002,1003)
   ORDER BY prod_name;
   ```

   优点：

   - IN 操作符简练、清晰
   - IN 操作符一般比 OR 操作符清单执行更快。
   - IN 的最大优点是可以包含其他 SELECT 语句，使得能够更动态地建立 WHERE 子句。

9. not 操作符
   MySQL 支持使用 NOT 对 IN 、BETWEEN 和 EXISTS 子句取反，这与多数其他 DBMS 允许使用 NOT 对各种条件取反有很大的差别。

10. \_ 通配符
    下划线的用途与% 一样，但下划线**只匹配单个字符**而不是多个字符。

11. 正则表达式

    ```sql
    select prod_name
    from products
    where prod_name REGEXP '1000$'
    order by prod_name;

    # 字符转义
    # 匹配\ 为了匹配反斜杠（\ ）字符本身，需要使用\\\ 。
    select vend_name
    from vendors
    where vend_name REGEXP '\\.';
    ```

12. 内置函数

    ```sql
    SELECT Concat(RTrim(vend_name), ' (', RTrim(vend_country), ')')
        as name
    FROM vendors
    ORDER BY vend_name;
    ```

    - 字符串处理函数
      Left() 返回串左边的字符
      Length() 返回串的长度
      Locate() 找出串的一个子串
      Lower() 将串转换为小写
      LTrim() 去掉串左边的空格
      Right() 返回串右边的字符
      RTrim() 去掉串右边的空格
      Soundex() 返回串的 SOUNDEX 值
      SubString() 返回子串的字符
      Upper() 将串转换为大写
    - 日期处理函数
      AddDate() 增加一个日期（天、周等）
      AddTime() 增加一个时间（时、分等）
      CurDate() 返回当前日期
      CurTime() 返回当前时间
      Date() 返回日期时间的日期部分
      DateDiff() 计算两个日期之差
      Date_Add() 高度灵活的日期运算函数
      Date_Format() 返回一个格式化的日期或时间串
      Day() 返回一个日期的天数部分
      DayOfWeek() 对于一个日期，返回对应的星期几
      Hour() 返回一个时间的小时部分
      Minute() 返回一个时间的分钟部分
      Month() 返回一个日期的月份部分
      Now() 返回当前日期和时间
      Second() 返回一个时间的秒部分
      Time() 返回一个日期时间的时间部分
      Year() 返回一个日期的年份部分
    - 数值处理函数
      Abs() 返回一个数的绝对值
      Cos() 返回一个角度的余弦
      Exp() 返回一个数的指数值
      Mod() 返回除操作的余数
      Pi() 返回圆周率
      Rand() 返回一个随机数
      Sin() 返回一个角度的正弦
      Sqrt() 返回一个数的平方根
      Tan() 返回一个角度的正切
    - 聚集函数
      AVG() 返回某列的平均值
      COUNT() 返回某列的行数
      MAX() 返回某列的最大值
      MIN() 返回某列的最小值
      SUM() 返回某列值之和

13. 分组的汇总
    使用 WITH ROLLUP 关键字，可以得到每个分组以及每个分组汇总级别（针对每个分组）的值

    ```sql
    select vend_id, count(*) as num_prods
    from products
    group by vend_id with rollup;
    ```

14. 分组过滤
    WHERE 过滤行，而 HAVING 过滤分组

    ```sql
    select cust_id, count(*) as orders
    from orders
    group by cust_id
    having orders >= 2;
    ```
