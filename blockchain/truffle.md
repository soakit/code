# truffle

以太坊合约的编译与部署
truffle build -> build json ->

## 1. 安装

```shell
npm i -g truffle
```

## 2. 配置

truffle.js

可配置本地测试网络，默认是 ganache 的端口。

> ganache链接：<https://www.trufflesuite.com/ganache>

## 3. 编写合约

1. contracts 目录下编写好合约。合约文件名与合约名要一致。
2. migrations 目录下编写部署脚本。
   参考链接：<https://www.trufflesuite.com/tutorial>

## 4. 编译与部署

```shell
truffle compile # 编译
truffle migrate # 部署
truffle migrate --reset --all # 重新部署
```

## 5. 单元测试

参考链接：<https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-solidity>

## 6. 使用web3链接区块链

```shell
npm i web3 -g
npm i truffle-contract -g
```

```js
import Web3 from "web3";
import TruffleContract from "truffle-contract";
import BuildJSON from "./your_path/build.json";

if (typeof window.web3 === "undefined") {
  alert("请安装MetaMask");
  return;
}
const web3 = new Web3(window.web3.currentProvider);
const contract = TruffleContract(BuildJSON);
contract.setProvider(web3);

// 合约部署
contract.deployed().then(async (ins) => {
  // 执行合约里的方法
  const res = await ins.your_contract_fn.call();
  console.log(res);
});
```
