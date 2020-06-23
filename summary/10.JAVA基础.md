# 1. java 基础

## 1.1 JDK、JRE与JVM

JDK = JRE + Java的开发工具（javac.exe, java.exe, javadoc.exe）
JRE = JVM + Java核心类库

## 1.2 环境变量

- 目的——在任何位置运行java相关命令。

- 配置过程

  JAVA_HOME = jdk的所在目录
  path = %JAVA_HOME%\bin

## 1.3 文档注释

- 注释内容可以被JDK提供的工具 javadoc 所解析，生成一套以网页文件形式体现的该程序的说明文档。

-  操作方式

  ```shell
  javadoc -d [docName] -version [fileName]
  ```

## 1.4 数据类型

- 基本数据类型
  - 数值型
    - 整型
      - byte, shote, int, long
    - 浮点型
      - float, double
  - 字符型(char)
  - 布尔型(boolean)
- 引用数据类型
  - 类(class)
  - 接口(interface)
  - 数组([])