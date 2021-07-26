# Elasticsearch 5.x

## 1. 简介

- 基于 **Apache Lucene** 构建的**开源搜索引擎**
- 采用 java 编写，提供简单易用的 RESTFUL API
- 轻松的**横向扩展**，可支持 PB 级的结构化或非结构化数据处理
  > 横向扩展：加机器

## 2. 应用场景

- 海量数据分析引擎
  - 百度-实时日志监控平台
  - 英国卫报-实时分析公众对文章的回应
- 站内搜索
  - 维基百科、github 站内搜索
- 数据仓库

## 3. 安装

版本历史：1.x -> 2.x -> 5.x
2.x 更稳定，但 ES5 相较于之前版本，支持 lucene6，性能大幅提升，占用磁盘空间、构建索引的时间都更短，查询时间更快

### 3.1 浏览器 UI 界面

elasticsearch-head

### 3.2 集群

## 4.概念

### 4.1 基础

- 索引：含有相同属性的文档集合
  - 相当于数据库名，需小写
- 类型：索引可以定义一个或多个类型，文档必须属于一个类型
  - 相当于表
- 文档：文档是可以被索引的基本数据单位
  - 相当于行

### 4.2 分片

- 分片：每个索引都有多个分片，每个分片是一个 lucene 索引
- 备份：拷贝一份分片就完成了分片的备份

> 分片：将大数据量分成小份，减轻硬盘的压力，加快搜索速度，可横向扩展。创建索引时，默认5个分片，1个备份，分片数量只能创建时指定，而备份数量可以动态修改。
> 备份：提升可用性（备份分片可以在主分片失效时工作），分摊搜索压力