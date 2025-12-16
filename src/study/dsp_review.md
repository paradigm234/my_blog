---
icon: streamline-plump:wave-signal-square-solid
date: 2025-12-16
category:
  -计算机基础408
---
# Digital Signal Processing

## 第一章

### 运算

序列的和：逐点对应相加

序列的积：逐点对应相乘

序列的移位：左加右减

反褶：x（-n）

反褶和移位加一起：先反褶后移位（其实都行）

反褶只针对n，不针对移位量

累加和：![image-20251215134213016](/coding_images/image-20251215134213016.png)

y（n）-y（n-1） = x（n）

差分运算：前向/后向  R（n）

抽取序列：![image-20251215135517209](/coding_images/image-20251215135517209.png)

两倍的采样间隔

序列的能量：

![image-20251215135623445](/coding_images/image-20251215135623445.png)

单位阶跃序列

![image-20251215141945414](/coding_images/image-20251215141945414.png)

复指数序列

![image-20251215144205996](/coding_images/image-20251215144205996.png)

### 周期性

![image-20251215144727287](/coding_images/image-20251215144727287.png)

2pi/欧米伽

![image-20251215145021173](/coding_images/image-20251215145021173.png)

![image-20251215145125240](/coding_images/image-20251215145125240.png)

但是如果是无理数，无周期

并非离散时间正弦信号都有周期

![image-20251215145431224](/coding_images/image-20251215145431224.png)

### 线性系统

既满足可加性又满足比例性

![image-20251215204845657](/coding_images/image-20251215204845657.png)

线性系统必满足0输入就0输出，但是反过来不一定

移不变系统：若系统响应与激励加于系统的时刻无关，则系统为移不变或时不变系统

先延迟再过系统 == 先过系统后延时，则移不变

==一般来说在n上做手脚的都不是移不变==

滑动平均系统：是线性移不变

![image-20251215210923349](/coding_images/image-20251215210923349.png)

### 线性卷积

LSI系统：线性移不变离散时间系统

单位冲激响应：h（n）

![image-20251215211132519](/coding_images/image-20251215211132519.png)

对于LSI系统，它的输出y（n）可以用输入x（n）与单位脉冲响应h（n）的线性卷积来表示

![image-20251215211337934](/coding_images/image-20251215211337934.png)

证明：用乘积和的形式带入以后用lsi系统的性质往下推导

![image-20251215211629708](/coding_images/image-20251215211629708.png)

 ![image-20251215211935024](/coding_images/image-20251215211935024.png)

先反褶得到h(-m) 然后移位h(-m+n) 然后相乘 最后累和

计算方法：

![image-20251215212305605](/coding_images/image-20251215212305605.png)

千万不要进位，因为是两个时刻发生的事情

重要性质：

![image-20251215212439362](/coding_images/image-20251215212439362.png)

运算规则

1、交换律

2、结合律

![image-20251215212655372](/coding_images/image-20251215212655372.png)

3、分配率

![image-20251215212713311](/coding_images/image-20251215212713311.png)

![image-20251215213012925](/coding_images/image-20251215213012925.png)

