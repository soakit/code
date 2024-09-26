# 解密

## 过程

先将 entrypoint.sh 不 eval 拿出 step1.sh。得到结果 step1res.sh。发现还是 base64 了。继续拿出 step2.sh 执行得到结果。

## 遇到的坑

解码过程中，发现文件乱码了。

写一个简单的例子验证：

```shell
AA="YWFh" # aaa
echo -n "$AA" | base64 --decode >new_script.sh
```

```shell
file new_script.sh: International EBCDIC text, with no line terminators, with overstriking
```

怎么文件编码都变了。

chatGPT 搞起，分析出原因。

`AA="YWFh"` 解码后的内容是 `aaa`，这本质上是 ASCII 字符，应该不会产生 EBCDIC 编码的内容。然而，出现 **“International EBCDIC text”** 的信息，说明系统可能误将内容识别为 EBCDIC 编码，可能是由于文件中的某些特定字节模式被错误解读。

确认并排查这个问题的原因和解决方案。

### 原因

1. **误判**：`file` 命令有时会错误识别文件的编码，尤其是当文件内容非常简单时（如仅包含 `aaa`）。由于 `aaa` 是非常基础的字符序列，可能系统将其误认为是 EBCDIC。
2. **行终止符**：文件可能缺少典型的换行符（`\n`），这也可能引发 `file` 的误判。

### 解决方案

#### 添加行终止符（换行符）

你可以尝试在解码的内容后添加换行符，然后再检查文件的编码类型。

```bash
AA="YWFh"
echo "$AA" | base64 --decode > new_script.sh
```

注意这里不再使用 `-n`，这样 `echo` 会自动在 `aaa` 后面添加换行符（`\n`）。
