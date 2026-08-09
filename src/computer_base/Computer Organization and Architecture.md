# Computer Organization and Architecture

## 第三章 存储系统

大纲：

- 层次结构
- 分类
- 性能指标

###  层次化结构

主存：工作台

辅存：仓库

![image-20260707223033585](/computer_organization_images/image-20260707223033585.png)

虚拟存储系统解决了主存容量不够的问题

cache-主存：解决了主存与CPU速度不匹配的问题

### 存储器分类

存储器分类（介质分类）：

- 半导体存储器：cache等
- 磁表面存储器（磁性材料）:磁盘、磁带
- 光存储器：以光介质存储信息

按照存取方式分类：

- 随机存取存储器（RAM）：读写任何一个存储单元所需时间相同，和物理位置无关
- 顺序存取存储器（SAM）：读写一个存储单元所需时间取决于存储单元所在的物理位置
- 直接存取存储器（DAM）:既有随机存取特性也有顺序存取特性。先直接选取信息所在位置，然后按照顺序存储方式存取。速度介于前两者之间

SAM和DAM叫穿行访问存储器

![image-20260707224104519](/computer_organization_images/image-20260707224104519.png)

CAM:按照内容查找，其他的按照地址存取

按照信息的可更改性可以分为：读写存储器（Cache）和只读存储器（ROM）

按照信息可保存性：断电消失为易失性存储器（cache），不消失为非易失存储器（磁盘光盘）

![image-20260707224442889](/computer_organization_images/image-20260707224442889.png)

###  性能指标

![image-20260707224725595](/computer_organization_images/image-20260707224725595.png)

### 主存储器的基本组成

MOS管：给一端加入高电平信号，mos管接通，电流流出，则认为是二进制1，反之为0

 ![image-20260708212611425](/computer_organization_images/image-20260708212611425.png)

片选线：指定存储芯片

==读写控制线可能有两根==

![image-20260708212710561](/computer_organization_images/image-20260708212710561.png)

寻址：

- 按字节寻址
- 按字寻址
- 按半子寻址
- 按双字寻址

现代计算机都是按照字节寻址

### SRAM和DRAM

D:dynamic动态

S：static静态

存储信息的不一元件（存储元）样：

- DRAM用栅极电容
- SRAM用双稳态触发器

![image-20260708220923932](/computer_organization_images/image-20260708220923932.png)

![image-20260708220930445](/computer_organization_images/image-20260708220930445.png)

A高电平B低电平是1，A低B高是0

区别：

- 1、电容放电信息被破坏，属于破坏性读取，读取后应该要重写操作，双稳态触发器在读出数据后的状态依旧是稳定的，无需重写
- 2、栅极成本低，集成度高，功耗低，静态RAM的双稳态，成本高，集成度低，功耗高
- 3、SRAM读取速度更快，因为不要重写

![image-20260708221800426](/computer_organization_images/image-20260708221800426.png)

### DRAM的刷新

 ![image-20260708224842050](/computer_organization_images/image-20260708224842050.png)

2ms刷新一次，每次刷新一行存储单元

读出一行信息后重新写入，占用1个读写周期

 刷新方式：

- 分散：读一个刷一行
- 集中：读完之后再统一刷，存在死区
- 异步：保证刷新周期内每一行都刷新一遍，存在死时间

![image-20260708225417499](/computer_organization_images/image-20260708225417499.png)

### DRAM地址线复用技术

行地址和列地址分为两次输送到缓冲器内，可以让地址线更少，芯片引脚更少

==但是SRAM是直接送地址==

![image-20260708225717971](/computer_organization_images/image-20260708225717971.png)

### ROM

只读存储器，断电之后不会丢数据

![image-20260709232244967](/computer_organization_images/image-20260709232244967.png)

SSD：固态硬盘，由控制单元和存储单元构成，与闪速存储器的核心区别在于控制单元不一样，但是存储介质类似，可以多次快速擦除重写。速度快，功耗低，价格搞。替代机械硬盘

主存 = BIOS芯片+RAM内存

![image-20260709233143726](/computer_organization_images/image-20260709233143726.png)

![image-20260709233609501](/computer_organization_images/image-20260709233609501.png)

### 双端口RAM和多模块存储器

双端口RAM:

- 用于多核CPU访问同一根内存条优化速度
- 要有独立的数据线，地址线，控制线

![image-20260709234031985](/computer_organization_images/image-20260709234031985.png)

- 两端口对同一主存不同地址单元存取数据是允许的
- 对同一地址单元读数据是允许的
- 对同一地址单元写入数据是不允许的
- 对同一地址单元，一个写数据，一个读出数据是不允许的

以上不允许行为会置“忙”信号为0，然后根据判断逻辑决定暂时关闭一个端口，未被关闭的正常访问，被关闭的端口延长一个很短的时间段后再访问

 多体（存储体）并行存储器：

- 高位交叉编址：高位是存储体号，地位是体内地址
- 低位交叉编址：地位是存储体号，高位是体内地址

 ![image-20260710012617080](/computer_organization_images/image-20260710012617080.png)

读取时间是r，缓冲时间是3r

==宏观上低位交叉编制读写一个字的时间接近r==

 ![image-20260710013106916](/computer_organization_images/image-20260710013106916.png)

若m过大会导致劳动力过剩，会浪费钱

多提并行存储器：

= 每个模块都有相同的容量和存取速度，各个模块都有独立的读写控制电路，地址寄存器和数据寄存器，他们并行工作，也可以交叉工作

单体多字存储器：

![image-20260710013403333](/computer_organization_images/image-20260710013403333.png)

一次读四个，和四个同时一次读一个的区别

双通道内存就是低位交叉的的多体存储器

高位交叉的多体存储器只是单纯的扩容

主频：反应读写周期

### 主存储器和CPU的连接

 `存储字长`：一个存储单元能存储多少位数据

当数据总线宽度>存储字长时，需要位扩展

![image-20260710222135761](/computer_organization_images/image-20260710222135761.png)

位扩展原理图：

![image-20260710222917762](/computer_organization_images/image-20260710222917762.png)

![image-20260710222959901](/computer_organization_images/image-20260710222959901.png)

可能会有同时写的情况，这种情况是不能允许的

![image-20260710224901760](/computer_organization_images/image-20260710224901760.png)

上图是线选法：采用一些位数来选择片，但是不能同时为1和0，n条线就有n个选片信号

改进，加一个译码器（非门）

1-2译码器，2-4译码器，3-8译码器

![image-20260710225443487](/computer_organization_images/image-20260710225443487.png)

==所有地址信息都是CPU直接传过来的==

![image-20260710225916374](/computer_organization_images/image-20260710225916374.png)

### 外存储器（磁盘）

磁带划过磁头可以一比特一比特的写数据和读取数据

==以1bit为单位，读写不能同时进行==

![image-20260711105050496](/computer_organization_images/image-20260711105050496.png)

![image-20260711105250127](/computer_organization_images/image-20260711105250127.png)

#### 磁盘设备组成

存储区域：

- 磁头数：记录面数，表示硬盘总共有多少个磁头，磁头用于读取/写入盘面上记录面的信息，一个记录面对应一个磁头
- 柱面数：表示硬盘每一面盘片上有多少条磁道。在一个盘组中，不同记录面的相同编号的所有磁道构成的一个圆柱面
- 扇区数：每一条磁道上有多少个扇区

硬盘存储器：硬盘存储器 = 磁盘驱动器，磁盘控制器，盘片

驱动器：核心组件好似磁头和盘片组件，可有事一种可移动头固定盘片的硬盘存储器
磁盘控制器：是硬盘存储器和主机的接口

![image-20260711110821375](/computer_organization_images/image-20260711110821375.png)

磁盘正反面都可以涂磁性材质，磁头可以做成上下都可以读取的形式

#### 性能指标

容量：一个磁盘可以存储的字节总数，分为格式化和非格式化

记录密度：盘片单位面积上记录的二进制信息量，以道密度，位密度，面密度来表示

![image-20260711112352709](/computer_organization_images/image-20260711112352709.png)

平均存取时间 = 寻道时间（定位道） + 旋转延迟时间 （定位扇区）+ 传输时间（传输数据所花费的时间）

磁盘地址

驱动器号 + 柱面号 + 盘面号 + 扇区号

![image-20260711115014336](/computer_organization_images/image-20260711115014336.png)

![image-20260711115050317](/computer_organization_images/image-20260711115050317.png)

工作过程：

寻址、读盘、写盘。每个操作都对应一个控制字，硬盘工作时，第一步是取控制字，第二步是执行控制字

磁盘阵列（RAID）

 将多个独立物理磁盘组成一个独立的逻辑盘，数据在多个物理盘上分割交叉存储，并行访问，具有更好的存储性能、可靠性和安全性

![image-20260711120805050](/computer_organization_images/image-20260711120805050.png)

![image-20260711121009229](/computer_organization_images/image-20260711121009229.png)

![image-20260711121040104](/computer_organization_images/image-20260711121040104.png)

RAID可以根据海明校验码恢复错误数据

RAID0没有容错能力，RAID1容量会减少一半

![image-20260711121317553](/computer_organization_images/image-20260711121317553.png)

![image-20260711121346236](/computer_organization_images/image-20260711121346236.png)

### 固态硬盘（SSD）

闪存翻译层：将逻辑块号翻译为物理地址

 ![image-20260711150742427](/computer_organization_images/image-20260711150742427.png)

因为是通过电路定位地址，所以可以SSD随机访问

SSD读写速度快，随机访问性能高，用电路控制访问位置，机械硬盘通过移动磁臂旋转磁盘控制访问位置，有寻道时间和旋转延迟

SSD安静无噪音，耐摔抗震，能耗低，造价贵

一个块擦除次数过多可能会坏掉，二机械硬盘的扇区不会因为写的次数太多而坏掉

磨损均衡技术：用于延长寿命，读多写少的数据会迁移到老的闪存芯片里，让比较新的闪存块承担更多的写任务。SSD会自动检测，进行数据的迁移和分配。

### Cache

CPU速度远大于存储器速度，利用Cache来缓和速度差距矛盾

![image-20260711152759847](/computer_organization_images/image-20260711152759847.png)

#### 局部性原理 

空间局部性：在最近的未来要用到的信息指令和数据，很可能与现在正在使用的信息在存储空间上市邻近的

时间局部性：在最近的未来要使用的信息很可能是现在正在使用的信息，例如循环代码（很多数据会在短时间内重复访问）

==基于局部性原理，可以把CPU目前访问的地址周围的部分数据放到cache中==

#### 性能分析

CPU在cache中访问到了称为命中

![image-20260711154201201](/computer_organization_images/image-20260711154201201.png)

两种访问策略：同时访问cache和内存以及先访问cache后访问内存

问题：如何界定周围？

将主存的存储空间分块，每1KB为一块，==主存和cache之间以块为单位进行数据交换==

![image-20260711154737693](/computer_organization_images/image-20260711154737693.png)

和操作系统差不多

在cache找不到后，在主存里找，找到以后就会复制一份调入到cache里面去

#### cache主存映射方式

- 全相联映射：任意存
- 直接映射：取余存固定的
- 组相联映射：把前两个融合一下

![image-20260711160054685](/computer_organization_images/image-20260711160054685.png)

标记用来表示该cache块存的是哪个主存块的数据，然后有效位是标记的标记，用于表示该cache块是否被使用存数据。

1、全映射

![image-20260711162850031](/computer_organization_images/image-20260711162850031.png)

将地址空间分为主存块号 + 快内地址

标记就为这个22位块号地址

若有效位为1且命中地址，则可以访问到cache里面的数据，若未命中或有效位为0，则去访问主存，说明cache里没这个数据

==命中率高，空间利用充分，速度慢==

2、直接映射

![image-20260711163729694](/computer_organization_images/image-20260711163729694.png)

直接看主存块号末尾几位，就可以

==速度块，只要一次对比，空间利用不充分，命中率低==

3、组相联映射

![image-20260711165642570](/computer_organization_images/image-20260711165642570.png)

==上面两种的这种，效果最好==

#### cache替换算法

- 随机算法
- 先进先出
- 近期最少使用
- 最近不经常使用

1、随机算法（RAND）

若cache已满，则随机选择一块替换 

![image-20260711170943268](/computer_organization_images/image-20260711170943268.png)

2、先进先出算法（FIFO）

若cache已满，则替换最先被调入Cache 的块

![image-20260711171051206](/computer_organization_images/image-20260711171051206.png)

实现很简单，按照0123放入，再轮流按照0123替换，但是没有考虑到局部性原理，所以效率不高，最先调入cache的块也有可能是被频繁访问的

抖动现象：频繁的换入换出

3、最近最少使用（LRU）

为每一个cache设置一个计数器，用于记录每个cache多久没被访问，当cache满后替换计数器最大的

![image-20260711174319915](/computer_organization_images/image-20260711174319915.png)

![image-20260711174336429](/computer_organization_images/image-20260711174336429.png)

注意：命中之后，所命中的行

==此算法考虑了局部性原理，近期访问过得主存块，在不久的将来很有可能再次访问，所以这个算法性能很好，命中率高==

4、最不经常使用算法（LFU）

为每一个cache块设置一个计数器，用于记录每个cache块被访问过几次，当cache满后替换计数器最小的

![image-20260711175237557](/computer_organization_images/image-20260711175237557.png)

和LRU的区别是，一个是讨论局部，一个讨论全局，LFU不如LRU,没有很好的遵循局部性原理

#### cache写策略

写命中：CPU对某个地址进行写操作，并且在Cache中已经命中

- 写回法：CPU对cache写命中时，只修改cache的内容，而不立即写入主存，只有当此块被换出时才写回主存，==需要增加脏位==
- 全写法：对cache命中后，必须吧数据同时写入cache和主存，一般使用写缓冲

![image-20260711175903983](/computer_organization_images/image-20260711175903983.png)

![image-20260711175927363](/computer_organization_images/image-20260711175927363.png)

写回法有数据不一致的隐患，全写法没有这个隐患

可以使用写缓冲，是利用SRAM实现的FIFO队列，使用写缓冲，CPU写的速度很快，若写操作不频繁，则效果很好，若频繁，写缓冲可能饱和

写不命中：

- 写分配法：当CPU对cache写不命中时候，只写入主存，不调入cache，搭配全写法使用，==搭配全写法使用==
- 全写法：当CPU对cache写命中时，必须把数据同时写入cache和主存，一般使用写缓冲

#### 多级cache

离CPU越近速度越快，容量越小
离CPU越远速度越慢，容量越大

![image-20260711180635777](/computer_organization_images/image-20260711180635777.png)

![image-20260711180658235](/computer_organization_images/image-20260711180658235.png)

## 第四章 指令系统

指令  = 操作码 + 地址码

`指令`：计算机运行的最小功能单位

操作码：描述用户要干什么

地址码：描述对谁操作

### 指令的基本格式

#### 零地址指令

1、不需要操作数，如空操作，停机，关中断等指令
2、堆栈计算机，两个操作数隐含存放在栈顶和次栈顶，计算结果压回栈顶

![image-20260718172423637](/computer_organization_images/image-20260718172423637.png)

#### 一地址指令

1、只需要单操作数，如加1，减1，取反，求补等

![image-20260718172652984](/computer_organization_images/image-20260718172652984.png)

2、需要两个操作数，但其中一个操作数隐含在某个寄存器

![image-20260718172639407](/computer_organization_images/image-20260718172639407.png)

####  二、三地址指令

![image-20260718172934548](/computer_organization_images/image-20260718172934548.png)

#### 四地址指令

![image-20260718173101851](/computer_organization_images/image-20260718173101851.png)

注意：A4指向的是下一条将要执行指令的地址

每次取完指令就会让PC的指改为新的A3地址，A4指向下一条指令

#### 指令长度分类

`指令字长`：一条指令的总长度（可能会变 ）

`机器字长`：CPU进行一次整数运算所能处理的二进制数据的位数（和ALU位数相关）

`存储字长`：一个存储单元中的二进制代码位数(和MDR位数相同)

![image-20260718174850962](/computer_organization_images/image-20260718174850962.png)

定长：n位 -> 最多2的n次方条指令

#### 操作类型分类

- 数据传送：LOAD/STORE
- 算术逻辑操作：算术（加减乘除）+逻辑（与或非）
- 移位操作
- 输入输出操作

![image-20260718213609526](/computer_organization_images/image-20260718213609526.png)

这里的寄存器指的是CPU的寄存器

### 扩展操作码指令格式

定长指令字结构 + 可变长操作码

![image-20260719155325599](/computer_organization_images/image-20260719155325599.png)

二地址指令前四位全为1--CPU要根据前四位是否为1来判断是三地址指令还是二地址指令

![image-20260719155521821](/computer_organization_images/image-20260719155521821.png)

记住：0地址指令16条，其他15条

要求：

- 不允许短码是长码的前缀，短操作码不能与长操作码的前面部分代码相同，以免分不清是什么操作码
- 各个指令码一定不能重复

 

==通常那个情况下，对于使用频率比较高的指令，分配较短的操作码；对使用频率较低的指令，分配较长的操作码，从而减少指令译码和分析的时间==

![image-20260719165344178](/computer_organization_images/image-20260719165344178.png)

![image-20260719165735740](/computer_organization_images/image-20260719165735740.png)

![image-20260719165744356](/computer_organization_images/image-20260719165744356.png)

很像计网的子网掩码划分

CPU解析：

读入16位，然后判断前四位是否全1，如果不是，那就是三地址指令，那就按照三地址指令的规则去执行指令，如果是继续判断是否前六位都是全1，如果不是则二地址指令，如果是，则继续检测是否前11位都是1，如果不是，那就是一地址指令，如果是，那就是零地址指令

扩展操作码特点：

- 优点：在指令字长有限的前提下，仍然保持比较丰富的指令种类
- 缺点：增加了指令译码和分析的难度，使控制器的设计复杂化

定长操作码特点：

- 优点：定长操作码对于简化计算机硬件设计，提高指令译码和识别速度很有利
- 缺点：指令数量增加的时候会占用更多固定位，留给表示操作数地址的位数受限

### 指令寻址

- 顺序寻址
- 跳跃寻址

 顺序寻址，PC每次移动一个，1是指指令字长

跳跃寻址：

![image-20260719205212400](/computer_organization_images/image-20260719205212400.png)

通过JMP/CALL操作码进行转移

![image-20260719205254804](/computer_organization_images/image-20260719205254804.png)

### 数据寻址

确定本条指令的地址码指明的真实地址

JMP若指向的是真实地址，直接复制给程序计数器（PC）

但是不是真实地址的话，就会出错，所以需要数据寻址

![image-20260719211025584](/computer_organization_images/image-20260719211025584.png)

![image-20260719211128220](/computer_organization_images/image-20260719211128220.png)

形式地址和逻辑地址差不多

#### 直接寻址

形式地址就是操作数的真是地址

EA = A

![image-20260719211554737](/computer_organization_images/image-20260719211554737.png)

优点：直接把A放到CPU的MAR里面就可以，很方便

缺点：形式地址的位数有限，所以寻址范围不大，操作数地址地址如果改变的话，这种方式不易修改

#### 间接寻址

指令的地址字段给出的形式地址不是操作数的真正地址，而是操作数的有效地址所在存储单元的地址，也就是操作数地址的地址

EA = （A）括号指的是A地址指向的主存单元的数据

==套一次娃==

==闯关游戏，先去通过地址找到地图，然后根据地图的地址找操作数==

以上是一次间接，还可以二次套娃，两次间接

![image-20260719212121050](/computer_organization_images/image-20260719212121050.png)

优点：可以扩大寻址范围，便于编制程序

缺点：指令在执行阶段会多次访存，执行效率比较低

#### 寄存器寻址

在指令字中直接给出操作数所在的寄存器编号

EA = R，其操作数在由Ri所指的寄存器内

==不存地址，直接存编号，然后访存相应编号的寄存器即可==

通过译码器电路直接访存对应编号的寄存器

优点：指令在执行阶段不访存主存，只访问寄存器

指令字短且切换速度快，支持向量/矩阵运算

缺点：寄存器价格贵，计算机中的寄存器个数有限

![image-20260719213422732](/computer_organization_images/image-20260719213422732.png)

#### 寄存器间接寻址

![image-20260719213529878](/computer_organization_images/image-20260719213529878.png)

和前面的原理一样

#### 隐含寻址

不是明显的给出操作数的地址，而是在指令中隐含着操作数的地址

![image-20260719213820598](/computer_organization_images/image-20260719213820598.png)

只给出一个操作数地址，另一个默认在ACC（累加寄存器中）

优点：有利于缩短指令字长

缺点：

需要增加存储操作数或隐含地址的硬件

#### 立即寻址

直接把操作数写在指令中

形式地址A就是操作数本身，而非地址，又称为立即数，一般采用补码形式，#表示立即寻址特征

![image-20260719214615288](/computer_organization_images/image-20260719214615288.png)

优点：不需要访存，执行时间最短

缺点：A的位数限制了立即数的范围，如果A的位数为n，且立即数采用补码，可表示的数据范围是

![image-20260719214745204](/computer_organization_images/image-20260719214745204.png)

![image-20260719214815090](/computer_organization_images/image-20260719214815090.png)

#### 偏移寻址-基址寻址

将CPU中的基址寄存器（BR）的内容加上指令格式中的形式地址A，二形成操作数的有效地址

基址寄存器就是操作系统中的重定位寄存器

![image-20260720152143249](/computer_organization_images/image-20260720152143249.png)

![image-20260720152237948](/computer_organization_images/image-20260720152237948.png)

也可以使用通用寄存器，但是要多一个字段描述通用寄存器的编号，指明用哪个通用寄存器来代替基址寄存器

若通用寄存器有n个，则R0需要log2n位

优点：便于程序“浮动”，方便实现多道程序并发运行

注意：基址寄存器是面向操作系统的，其内容由操作系统或管理程序确定。在程序执行过程中，基址寄存器的内容不变，形式地址可以变，全部由操作系统进行管理。

#### 偏移寻址-变址寻址

有效地址EA等于指令中字中的形式地址A与变址寄存器IX的内容相加之和

EA = （IA）+ A

IX是可变址寄存器，==面向用户==，程序执行过程中变址寄存器的内容可以由用户改变，形式地址A不变

![image-20260720153222071](/computer_organization_images/image-20260720153222071.png)

#### 偏移寻址相对寻址

![image-20260720171129829](/computer_organization_images/image-20260720171129829.png)

A是基地址，IX是偏移量

![image-20260720171332939](/computer_organization_images/image-20260720171332939.png)

优点：在数组处理过程中，可以设定A为数组的首地址，不断改变变址寄存器IX的内容，便可以很容易形成数组中任一数据的地址，特别适合编制循环程序

#### 相对寻址

把PC 的内容加上指令格式中的形式地址A而形成操作数的有效地址

EA = （PC） + A

A是相对于PC所指地址的位移量，可正可负

==A是基于下一跳指令的存放地址的位移量==

![image-20260720172158429](/computer_organization_images/image-20260720172158429.png)

![image-20260720172631620](/computer_organization_images/image-20260720172631620.png)

优点：这段代码在程序内浮动的时候不用更改跳转指令的地址码，因为是相对位置，只会在程序内部循环浮动

注意：基址寻址的浮动是指整段程序在内存里的浮动，而相对寻址指的是某一段程序在程序内部的浮动

==相对寻址广泛应用于转移指令==

ACC加法指令的地址码，可以采用分段式解决方式，即把程序段和数据段分开

![image-20260720173110212](/computer_organization_images/image-20260720173110212.png)

注意：取出当前指令之后，PC会指向下一条指令，相对寻址是相对于下一条命令的偏移

硬件如何实现数的比较：

![image-20260720173627107](/computer_organization_images/image-20260720173627107.png)

#### 堆栈寻址

操作数存在堆栈中，隐含使用堆栈指针(SP)作为操作数地址

堆栈是存储器中特定的按照“后进先出”原则管理的存储区，改存储区中被读写单元的地址是用一个特定的寄存器给出的，该寄存器成为堆栈指针

![image-20260720174108048](/computer_organization_images/image-20260720174108048.png)

以上是硬堆栈

软堆栈：

SP存的是主存地址，利用主存的一片区域进行堆栈操作，需要对主存进行访存

![image-20260720174307389](/computer_organization_images/image-20260720174307389.png)

总结：

![image-20260720174409073](/computer_organization_images/image-20260720174409073.png)

### 汇编语言

高级语言 -> 汇编语言 -> 机器语言（二进制）

![image-20260722172845884](/computer_organization_images/image-20260722172845884.png)

#### x86汇编语言指令基础

指令的作用：

- 处理程序执行流
- 处理数据

操作码 + 地址码

![image-20260722174906300](/computer_organization_images/image-20260722174906300.png)

mov指令：操作数d，源操作数s（destination和source）

mov指令功能：将源操作数s复制到目的操作数d所指的位置

mov eax,ebx  //将寄存器ebx的值复制到寄存器eax

mov eax，5 //将立即数5复制到寄存器eax

mov eax,dword ptr [af996h] //将内存地址af996h所指的32bit值复制到寄存器eax中

mov byte ptr [af996h]，5 //将立即数5复制到内存地址af996h所指的一字节中

读写长度说明：

- dword ptr --双字，32bit
- word ptr -- 单字，16bit
- byte ptr --字节，8bit

认识x86架构的寄存器

==以E开头的就是32bit的寄存器==

==以X结尾的就是通用寄存器==

![image-20260722180541307](/computer_organization_images/image-20260722180541307.png)

对于通用寄存器，如果不写E，直接写AX，BX则说明使用低的16bit

也可以只使用低位8bit

![image-20260722180923204](/computer_organization_images/image-20260722180923204.png)

==但是只有通用寄存器可以这样==

ESI/EDI 是变址寄存器，通常用于处理线性表，字符串的处理

EBP:堆栈基指针

ESP：堆栈顶指针

![image-20260722181030122](/computer_organization_images/image-20260722181030122.png)

- 带中括号说明是间接寻址

![image-20260722181212629](/computer_organization_images/image-20260722181212629.png)

常见运算指令

- 加：add d,s
- 减：sub d,s
- 乘：mul d,s(无符号)/imul d,s（有符号）
- 除：dis s/idiv s（被除数已经放到了寄存器中，属于隐含寻址）
- 取负数：neg d （将d,取负数，存入d）
- 自增++：inc d 
- 自减--：dec d

![image-20260722200153931](/computer_organization_images/image-20260722200153931.png)

左边的是要放进去的，不能是常数，且两个操作数不能同时在主存里，保证每一条指令不要访问太多次主存

逻辑运算指令：

- 与：and d,s
- 或： or d,s
- 非: not d
- 异或：xor d,s
- 左移：shl d,s(将逻辑左移s位，结果放到d中)
- 右移：shr d,s（逻辑右移s位，结果放到d中）

AT&T格式的x86语言（了解一下）

![image-20260722201349937](/computer_organization_images/image-20260722201349937.png)

![image-20260722201403064](/computer_organization_images/image-20260722201403064.png)

==注意主存地址偏移量表示的不同==

#### 选择语句

无条件转移指令：jmp

jmp<地址>

jmp 128 地址可以用常数给出
jmp eax 地址也可以来自于寄存器
jmp [999]地址也可以来自于主存

标号：用来锚定一个位置

如果写绝对地址不够灵活

所以可以jmp NEXT

![image-20260722203717958](/computer_organization_images/image-20260722203717958.png)

条件转移指令

je/jne/jg/jge/jl/jle

![image-20260722204017925](/computer_organization_images/image-20260722204017925.png)

![image-20260722204146874](/computer_organization_images/image-20260722204146874.png)

else先写，if在后面

#### 循环语句

用条件转移指令实现循环

![image-20260722224116072](/computer_organization_images/image-20260722224116072.png)

![image-20260722224407980](/computer_organization_images/image-20260722224407980.png)

loop looptop  //ecx--，若ecx ！= 0跳出到looptop

loopx：loopnz（not zero）

![image-20260722230122920](/computer_organization_images/image-20260722230122920.png)

#### 函数调用的机器级表示

 ![image-20260722233552655](/computer_organization_images/image-20260722233552655.png)

栈帧：保存函数大括号内定义的局部变量，保存函数调用相关信息

![image-20260723210704440](/computer_organization_images/image-20260723210704440.png)

call：

- 将IP旧址压栈保存
- 设置新的IP值，无条件转移至被调用函数的第一条指令

  ret（return）：

- 从的栈函数帧顶部找到IP旧值，将其出栈并回复IP寄存器

![image-20260723211649780](/computer_organization_images/image-20260723211649780.png)

EBP/ESP分别指向栈帧的顶部和底部

push/pop指令：实现入栈出栈操作，x86默认4字节为单位。

push x //让esp-4个字节，将x压入栈
pop y/栈顶元素出栈写入y，再让esp加4

![image-20260723212036573](/computer_organization_images/image-20260723212036573.png)

pop eax
pop [ebp+8] 

mov指令访问栈帧：

![image-20260723213244703](/computer_organization_images/image-20260723213244703.png)

可以使用减法加法指令修改栈顶指针esp的值

![image-20260723215759739](/computer_organization_images/image-20260723215759739.png)

![image-20260723215909254](/computer_organization_images/image-20260723215909254.png)

总结（重要）

![image-20260723220048304](/computer_organization_images/image-20260723220048304.png)

调用者：call指令

被调用：

- 保存上一层函数栈帧，设置当前函数栈帧
- 处理逻辑
- 恢复上一层函数的栈帧
- 执行ret指令

对于栈帧：

- 通常来说局部变量集中存储在栈顶底部区域
- 通常来说调用参数集中存储在栈帧顶部区域

- 栈帧最底部一定是上一层栈帧基地址
- 栈帧最顶部一定是返回地址

![image-20260723225312472](/computer_organization_images/image-20260723225312472.png)

零头是因为gcc编译器每个栈帧大小设置为16B的整数倍

![image-20260723225511360](/computer_organization_images/image-20260723225511360.png)

下面这个图很重要，要顺明白：

![image-20260723230247092](/computer_organization_images/image-20260723230247092.png)

![image-20260723232551336](/computer_organization_images/image-20260723232551336.png)

总结


![image-20260723232614123](/computer_organization_images/image-20260723232614123.png)

### RISC和CISC

简单指令集和复杂指令集

CISC：

- 一条指令完成一个复杂的基本功能
- 代表：x86架构，主要用于笔记本，台式机
- 典型程序中80%的语句仅仅使用处理机中20%的指令（所以会有很多冗余的东西）

==相当于提供C语言和一大堆库函数==

RISC:

- 一条指令完成一个基本动作，多条指令组合完成一个复杂的基本功能
- 代表：ARM架构，主要用于手机，平板等

==一个指令一个电路，电路设计很简单，工号更低，更方便并行和流水线技术的执行==

![image-20260723233518713](/computer_organization_images/image-20260723233518713.png)

RISC寄存器多是因为只能load/store两种主存访问方式，必须要借助大量的寄存器进行计算

## 第五章 中央处理器（CPU）

控制器的基本组成

- CU：控制单元，分析指令，给出控制信号
- IR：指令寄存器，存放当前执行的指令
- PC：程序计数器，存放下一条指令地址，有自动加1功能

![image-20260727174950339](/computer_organization_images/image-20260727174950339.png)

![image-20260727175139430](/computer_organization_images/image-20260727175139430.png)

### CPU的功能和基本结构

功能：

指令控制：完成取指令、分析指令和执行指令，即程序的顺序控制

操作控制：一条指令的功能往往是由若干操作性好的组合来实现的，CPU管理并产生操作信号

时间控制：对各种操作加一时间上的控制

数据加工：对数据进行算术和逻辑运算

中断处理：对计算机运行过程中出现的异常情况和特殊请求进行处理

分为控制器和运算器：

- 运算器是负责对数据进行加工
- 控制器协调并控制计算机各部件执行程序的指令序列，包括取指令，分析指令，执行指令

![image-20260727180529500](/computer_organization_images/image-20260727180529500.png)

中断处理：管理总线及输入输出，处理异常情况和特殊请求

![image-20260727200011152](/computer_organization_images/image-20260727200011152.png)

专用数据通路方式：只要两个器件之间有数据来往，就安排专门的连接线路，根据指令执行过程中的数据和地址的流动方向安排连线线路

问题：成本大，难度大

解决方法：

- 使用多路选择器，根据控制信号选择一路输出
- 使用三态门，可以控制一路是否输出

![image-20260727200504593](/computer_organization_images/image-20260727200504593.png)

- CPU内部单总线方式：将所有寄存器的输入端和输出端都连接到一条公共的通路上（类似于使能信号）

![image-20260727200647540](/computer_organization_images/image-20260727200647540.png)

- 暂存寄存器：用于暂存从主存读来的数据，这个数据不能存放在通用寄存器中，否则会破坏其原有内容

![image-20260729234148185](/computer_organization_images/image-20260729234148185.png)

控制器的内部结构：

- 程序计数器（PC）：指出下一条指令在主存中的存放地址，CPU就是根据PC的内容去主存中取指令。因程序中指令时顺序执行的，所以PC有自增功能。
- 指令寄存器：用于保存当前正在执行的那条指令
- 指令译码器：仅对操作码字段进行译码，向控制器
- 微操作信号发生器：根据IR的内容（指令）、PSW的内容及时序信号，产生控制整个计算机系统所需的各种控制信号，其结构有组合逻辑型和存储逻辑型两种
- 时序系统：用于产生各种时序信号，它们都是由统一时钟分频得到的。
- 存储器地址寄存器（MAR）:用于存放所要访问的主存单元的地址
- 存储器数据寄存器（MDR）：用于存放向主存写入的信息或从主存中读出的信息

![image-20260730010045296](/computer_organization_images/image-20260730010045296.png)

==MAR通过地址利用地址总线传给主存，主存根据地址信号查找对应单元，找到数据后利用数据总线把找到的数据送到MDR中==

- CPU内部总线：CPU内部器件进行数据传送的公共通路

总图：

![image-20260730010345050](/computer_organization_images/image-20260730010345050.png)

有的寄存器是用户可见，也就是程序员可以通过汇编语言进行编程的寄存器

以下是用户可见：

- PSW
- ACC
- Rn(通用寄存器)
- PC

其他寄存器用户不可见，如：

- 暂存寄存器
- IR
- MAR
- MDR
- 移位寄存器

![image-20260730010552019](/computer_organization_images/image-20260730010552019.png)

![image-20260730010848024](/computer_organization_images/image-20260730010848024.png)

本章重点为CU--控制单元

数据流动：

- 单总线
- 多总线
- 专用通路

### 单总线流动

![image-20260801012102317](/computer_organization_images/image-20260801012102317.png)

内部总线是指同一部件，如CPU内部连接各寄存器及运算部件之间的总线；
系统总线是指同一台计算机系统的各部件，如CPU、内存、通道和各类IO接口之间互相连接的总线

寄存器之间数据传送：

![image-20260801012034056](/computer_organization_images/image-20260801012034056.png)

主存与CPU之间的数据传送

![image-20260801012215325](/computer_organization_images/image-20260801012215325.png)

![image-20260801012322578](/computer_organization_images/image-20260801012322578.png)

必须指明操作地址，把地址放到MAR中

执行算术或逻辑运算：

比如一条加法指令、微操作序列及控制信号：

![image-20260801012627213](/computer_organization_images/image-20260801012627213.png)

![image-20260801012636578](/computer_organization_images/image-20260801012636578.png)

单总线必须要把其中一个操作数放到暂存寄存器中

![image-20260801012851244](/computer_organization_images/image-20260801012851244.png)

分析：RO是间接寻址，先从R0找到地址，然后再找

- 取指周期

完成指令的取出，放到IR中

![image-20260801013136366](/computer_organization_images/image-20260801013136366.png)

- 间址周期

完成取数操作，被加数再主存中，加数已经放在寄存器R1中

![image-20260801013212654](/computer_organization_images/image-20260801013212654.png)

![image-20260801013512697](/computer_organization_images/image-20260801013512697.png)

- 执行周期

完成取数操作，被加数再主存中，加数已经放在寄存器R1中

![image-20260801013633463](/computer_organization_images/image-20260801013633463.png)

最后把结果写回了主存

![image-20260801013653654](/computer_organization_images/image-20260801013653654.png)

![image-20260801013728625](/computer_organization_images/image-20260801013728625.png)

### 专用数据通路

![image-20260801145701490](/computer_organization_images/image-20260801145701490.png)

取指周期：

![image-20260801150422096](/computer_organization_images/image-20260801150422096.png)

MDR和MAR：

- MDR与主存是双向数据流动的
- MAR与主存是单向，执行读不能写

![image-20260801150943450](/computer_organization_images/image-20260801150943450.png)

==只有寄存器才可以打括号==

![image-20260801151300782](/computer_organization_images/image-20260801151300782.png)

![image-20260801155642284](/computer_organization_images/image-20260801155642284.png)

![image-20260801151612630](/computer_organization_images/image-20260801151612630.png)

![image-20260801155558934](/computer_organization_images/image-20260801155558934.png)

### 硬布线控制器

![image-20260801160625821](/computer_organization_images/image-20260801160625821.png)

指令周期流程：

- 取指周期
- 间址周期（间接寻址）
- 执行周期
- 中断周期（处理中断信号）

CU发出一个微命令，可完成对应微操作。

一个节拍内可以并行完成多个“相容的”微操作

同一个微操作可能在不同指令的不同阶段被使用。

不同指令的执行周期所需节拍数各不相同。为了简化设计，选择定长的机器周期，以可能出现的最大节拍数为准（通常以访存所需节拍数作为参考）

若实际所需节拍数比较少，可以将微操作安排在机器周期末尾几个节拍上进行

![image-20260802095558263](/computer_organization_images/image-20260802095558263.png)

以上图很重要

操作指令码、目前的机器周期、节拍信号、机器状态条件

硬布线控制器的设计

- 分析每个阶段的微操作序列：确定哪些指令在什么阶段在什么条件下会使用到的微操作
- 选择CPU的控制方式：采用定长机器周期还是不定长机器周期，每个机器周期安排几个节拍？
- 安排微操作序列：如何用三个节拍完整整个机器周期内的所有微操作
- 电路设计：确定每个微操作命令的逻辑表达式，并用电路实现

![image-20260802101627824](/computer_organization_images/image-20260802101627824.png)

![image-20260802101653354](/computer_organization_images/image-20260802101653354.png)

最后一步：找到有效地址后把原先的逻辑地址覆盖，方便下一步操作

![image-20260802102346368](/computer_organization_images/image-20260802102346368.png)

A0在这里是符号位，BAN X 的意思是如果X为负数，就跳转到IR的地址，如果为正数，就正常PC+1

安排微操作书序的原则：

假设一个机器周期三个节拍：

- 原则一：微操作先后顺序不得随意更改
- 原则二：被控对象不同的微操作，尽量安排在一个节拍完成
- 原则三：占用时间较短的微操作，尽量安排在一个节拍内完成，并允许有先后顺序

安排时序周期：

![image-20260802103212844](/computer_organization_images/image-20260802103212844.png)

M（MAR）->MDR 从主存取数据，用时较长，因此必须一个时钟周期才能保证微操作的完成

MDR-> IR 是CPU内部寄存器的数据传送，速度更快，因此在一个时钟周期内可以紧接着完成OP（IR）-> ID也就是一次同时发出两个微命令

非访存指令（不用进入间址周期）：

![image-20260802110056982](/computer_organization_images/image-20260802110056982.png)

访存指令：

![image-20260802110156425](/computer_organization_images/image-20260802110156425.png)

组合逻辑设计：

![image-20260802110505335](/computer_organization_images/image-20260802110505335.png)

![image-20260802110809257](/computer_organization_images/image-20260802110809257.png)

![image-20260802110929832](/computer_organization_images/image-20260802110929832.png)

简址阶段：

![image-20260802111737353](/computer_organization_images/image-20260802111737353.png)

IND = 0说明间接寻址结束，执行操作开始

执行周期：

![image-20260802111823899](/computer_organization_images/image-20260802111823899.png)

对于M（MAR） -> MDR微操作：

FE取指T1，IND间址T1,EX执行周期T1均要执行这个微操作

![image-20260802115118245](/computer_organization_images/image-20260802115118245.png)

得到逻辑表达式就转化为数字电路：

![image-20260802115156034](/computer_organization_images/image-20260802115156034.png)

然后将电路集成到CU内部，然后接上信号就好了

设计步骤：

- 分析每个阶段的微操作序列
- 选择CPU的控制方式
- 安排微操作时序
- 电路设计：1、列出操作时间表。2、写出微操作命令的最简表达式。3，画出逻辑图。

硬布线控制器特点：

指令越多，设计和实现越复杂，因此一般运用于RISC（精简指令集）如果扩充一条新的指令，则控制器的设计就要大概，因此扩充指令较为困难，由于使用纯硬件实现控制，因此执行速度较快。微操作控制信号由组合逻辑电路即时产生。

### 微程序控制器

引入软件思想的控制器

程序：由指令序列组成。

指令是由各种微操作序列组成

现在来引入微指令来完成微操作，继续套娃

微程序：由微指令序列组成，每一种指令对应一个微程序

指令是对程序执行步骤的描述
微指令是对程序指令执行步骤的描述

![image-20260802120337047](/computer_organization_images/image-20260802120337047.png)

==微命令控制硬件动作，多个微命令形成微操作，多个微操作组成微指令，多个微指令组成一条机器指令。==

微指令基本格式

操作控制 + 顺序控制（指明下一条微指令的地址）

CU的基本结构

控制存储器CM：用于存放各指令对应的微程序，控制存储器可用于只读存储器ROM构成

CMAR：微地址寄存器，接收为地址形成部件送来的微地址，为在CM中读取微指令做准备

地址译码：将地址码转化为存储单元控制信号

微地址形成部件：产生初试微地址和后继微地址，以保证微指令的连续执行。

顺序逻辑：标志+CLK

CMDR：用于存放从CM中取出的微指令，它的同微指令字长相等。

![image-20260802130425828](/computer_organization_images/image-20260802130425828.png)

![image-20260802130704334](/computer_organization_images/image-20260802130704334.png)

![image-20260802135521409](/computer_organization_images/image-20260802135521409.png)

![image-20260802135731659](/computer_organization_images/image-20260802135731659.png)

![image-20260802140542252](/computer_organization_images/image-20260802140542252.png)

程序由指令组成，微程序由微指令组成，微指令可能会对应一个或者多个微操作，主存储器存放指令，控制器存储器是存放微指令的，MAR/CMAR

### 微指令的设计

微命令和微操作是一一对应的，一个微命令对应一根输出线

有的微命令可以并行执行，因此一条微指令可以包含多个微命令

![image-20260803212808208](/computer_organization_images/image-20260803212808208.png)

1、水平型微命令

==一条微命令能定义多个可并行的微命令==

操作控制 + 顺序控制

![image-20260803212940537](/computer_organization_images/image-20260803212940537.png)

优点：微程序端，执行速度快

缺点：微指令长，编写微程序比较麻烦

2、垂直型微指令

一条微指令只能定义一个微命令，由微操作码字段规定具体功能

![image-20260803212948588](/computer_organization_images/image-20260803212948588.png)

优点：微指令短，简单，规整，便于编写微程序

缺点：微程序很长，执行速度慢，工作效率低

![image-20260803212955206](/computer_organization_images/image-20260803212955206.png)

#### 微指令的编码方式

微指令的编码方式又称微指令的控制方式，它是指如何对微指令的控制字段进行编码，以形成控制信号。编码的目标是在保证速度的情况下，尽量缩短微指令字长。

直接编码：

![image-20260803220127358](/computer_organization_images/image-20260803220127358.png)

字段直接编码：

![image-20260803221037276](/computer_organization_images/image-20260803221037276.png)

一般把互斥的微操作放到同一个段里

![image-20260803221655240](/computer_organization_images/image-20260803221655240.png)

优点：可以缩短微命令字长

缺点：要通过译码电路后再发出微命令，因此比直接编码方式慢

![image-20260803221839190](/computer_organization_images/image-20260803221839190.png)

如何确定下一条指令的地址：

1、断定方式：直接根据微指令的下地址字段直接给出后继微指令的地址

2、根据机器指令的操作码形成，当机器指令至寄存器后，微指令的地址由操作码经微地址形成部件形成

3、增量计数器法：（CMAR）+ 1 -> CMAR

4、分支转移 转移方式：指明判别条件

5、通过测试网络

![image-20260803223442454](/computer_organization_images/image-20260803223442454.png)

6、由硬件产生微程序入口地址

==第一条微指令地址==由专门==硬件==产生

中断周期由==硬件==产生==中断周期微程序首地址==

![image-20260803225524358](/computer_organization_images/image-20260803225524358.png)

重点：直接编码，字段直接编码，断定法，计数器法

#### 微程序控制单元的设计（可能不考）

![image-20260803225943955](/computer_organization_images/image-20260803225943955.png)

设计步骤：

1、分析每个阶段的微操作序列
2、写出对应机器指令的微操作命令及节拍安排
3、确定微指令格式
4、编写微指令码点

![image-20260803231820883](/computer_organization_images/image-20260803231820883.png)

![image-20260803232147698](/computer_organization_images/image-20260803232147698.png)

根据微操作个数决定采用何种编码方式，以确定微指令的操作控制字段的位数，根据CM中存储的微指令总数，确定微指令的顺序控制字段的位数。最后按照操作控制字段位数和顺序控制字段位数就可以确定微指令字长

![image-20260803234259572](/computer_organization_images/image-20260803234259572.png)

### 指令流水线

一条指令的执行过程可以分为多个阶段，根据计算机的不同，具体的分法也不同。

取指 + 分析 + 执行

取指：根据PC内容访问主存储器，取出一条指令送到IR中

分析：对指令操作码进行译码，按照给定的寻址方式和地址字段中的内容形成操作数的有效地址EA，并从有效地址EA中取出操作数

执行：根据操作码字段，完成指令规定的功能，即把运算结果写到通用寄存器或主存中

特点：每个阶段用到的硬件不一样

#### 顺序执行方式

1、顺序执行方式

![image-20260804193003645](/computer_organization_images/image-20260804193003645.png)

2、一次重叠方式

![image-20260804193058838](/computer_organization_images/image-20260804193058838.png)

3、二次重叠执行方式

![image-20260804193213207](/computer_organization_images/image-20260804193213207.png)

#### 流水线性能指标

![image-20260804193311553](/computer_organization_images/image-20260804193311553.png)

性能指标：

- 吞吐率：单位时间内完成的任务数量
- 加速比：完成同样一批任务，不适用流水线所用的时间与使用流水线所用时间之比
- 效率：流水线的设备利用率称为流水线的效率

吞吐率：

![image-20260804193622066](/computer_organization_images/image-20260804193622066.png)

装入时间：第一条指令的时间

排空时间：最后一条所用的时间

![image-20260804193932410](/computer_organization_images/image-20260804193932410.png)

加速比：

![image-20260804232317764](/computer_organization_images/image-20260804232317764.png)

效率：

在时空图上，流水线的效率定义为完成n个任务占用的时空区有效面积与n个任务所用的时间与k个流水段所围成的时空区总面积之比

![image-20260804232853976](/computer_organization_images/image-20260804232853976.png)

#### 指令流水线影响因素

五段式指令流水线

![image-20260805171025915](/computer_organization_images/image-20260805171025915.png)

每个机器周期时间花销可能不一样

为了方便设计，每个阶段耗时取成一样，以最长耗时为准。即此处应将机器周期设置为100ns

流水线每个功能段部分后面都要有一个缓冲寄存器，或称为锁存器，其作用是保存流水段的执行结果，提供给下一流水段使用

instruction cache：取指阶段大部分情况下都可以从cache中命中

data cache:大部分情况下都能命中数据

registers：通用寄存器

IMM：存储立即数的锁存器

==ALU之后不一定要写到cache或主存，也有可能写到通用寄存器中==

影响因素：

- 结构相关（资源冲突）
- 数据相关（数据冲突）
- 控制相关（控制冲突）

![image-20260805172312486](/computer_organization_images/image-20260805172312486.png)

![image-20260805172514364](/computer_organization_images/image-20260805172514364.png)

方法一：等一会

方法二：增加资源

![image-20260805172640134](/computer_organization_images/image-20260805172640134.png)

同步问题，sub必须要add把数据放到r1里面后才可以

最后一条不会和第一条冲突，但是第二第三四条都会和第一条数据冲突

解决办法：

![image-20260805172819514](/computer_organization_images/image-20260805172819514.png)

阻塞等待

NOP（软件）为空指令，STALL（硬件）是阻塞，都可以实现解决方法

数据旁路技术：

![image-20260805173033065](/computer_organization_images/image-20260805173033065.png)

红笔的数据旁路，直接把第一条指令的ALU结果作为第二条的输入

编译优化：

通过编译器调整命令顺序来解决，也就是先干点别的指令，不需要前置指令的先操作，等不冲突了再进行。

控制相关：当流水线遇到转移指令和其他改变PC值的指令造成断流的时候会引起控制相关。

解决办法：

1.转移指令分支预测，简单预测，动态预测

2.预取专业成功和不成功的两个控制流方向上的指令

3、加快和提前形成条形码

4、提高转移方向的猜准率

#### 指令流水线分类（可能不考）

- 部件功能级，处理机级，处理机间级流水线
- 单功能流水线和多功能流水线
- 动态流水线和静态流水线

#### 流水线的多发技术

![image-20260805180302481](/computer_organization_images/image-20260805180302481.png)

每个时钟周期内可并发多条独立指令

要配置多个功能部件

==不能调整指令的执行顺序==

通过编译优化技术，把可并行执行的指令搭配起来

是一种空分复用技术

![image-20260805181436453](/computer_organization_images/image-20260805181436453.png)

不能调整指令执行顺序

是一种时分复用技术，靠编译程序解决优化问题

流水线速度是原来的三倍

![image-20260805181606842](/computer_organization_images/image-20260805181606842.png)

多条并行指令组成一个超长指令

要提供多个相互独立的部件

![image-20260805181642041](/computer_organization_images/image-20260805181642041.png)

### 五段式流水线

**LOAD指令：**

![image-20260805213614230](/computer_organization_images/image-20260805213614230.png)

EX:运算，将结果存入EX段锁存器

M：空段

WB：将运算结果写回指定寄存器

**store指令：**

![image-20260805220901828](/computer_organization_images/image-20260805220901828.png)

- IF：根据PC从这里Cache取指令至IF段的锁存器
- ID：将基址寄存器的值放到锁存器A，将偏移量的值放到lmm
- EX：运算，得到有效地址
- M：从数据Cache中取数并放入锁存器
- WB：将取出的数写回寄存器

==通常来说，RISC处理器只有LOAD（取数）和STORE（存数）指令才能访问主存==

**条件转移指令的执行过程：**

![image-20260805224529772](/computer_organization_images/image-20260805224529772.png)

- IF：根据PC从指令Cache取指令至IF段的锁存器
- ID：进行比较的两个数放入锁存器AB，偏移量放入lmm
- EX：运算，比较两个数
- M：将目标PC值写回PC

**无条件转移指令的执行过程：**

![image-20260806155408949](/computer_organization_images/image-20260806155408949.png)

- IF：根据PC从指令Cache取指令至IF段的锁存器
- ID：偏移量放入Imm
- EX：将目标PC值写回PC（作图没画全）
- M：空段
- WB：空段

![image-20260806155523822](/computer_organization_images/image-20260806155523822.png)

![image-20260806155921325](/computer_organization_images/image-20260806155921325.png)

![image-20260806160018183](/computer_organization_images/image-20260806160018183.png)

### 多处理器基本概念

- 单指令流单数据流

![image-20260806162014140](/computer_organization_images/image-20260806162014140.png)

![image-20260806161927768](/computer_organization_images/image-20260806161927768.png)

采用多模块交叉可以提升读写效率

- 单指令流多数据流（SIMD）

![image-20260806162150661](/computer_organization_images/image-20260806162150661.png)

![image-20260806162338692](/computer_organization_images/image-20260806162338692.png)

每一个时刻只有一条指令在执行，但是多个存储器可以并行执行同一个指令

- 多指令流单数据流（MISD,现实中不存在）

- 多指令流多数据流系统（MIMD）

![image-20260806162654209](/computer_organization_images/image-20260806162654209.png)

线程/进程型并行

![image-20260806162738647](/computer_organization_images/image-20260806162738647.png)

### 向量处理器

![image-20260806163949039](/computer_organization_images/image-20260806163949039.png)

![image-20260806163958428](/computer_organization_images/image-20260806163958428.png)

![image-20260806164047090](/computer_organization_images/image-20260806164047090.png)

### 硬件多线程

在硬件层面支持多线程的处理器

![image-20260806180158679](/computer_organization_images/image-20260806180158679.png)

- 细粒度多线程：处理器在各个时钟周期切换线程，交替执行不同的线程的指令，切换代价低。
- 粗粒度多线程：只有流水线阻塞的时候再切换线程，切换代价较高。

![image-20260806180358232](/computer_organization_images/image-20260806180358232.png)

## 第六章 总线

![image-20260806180616583](/computer_organization_images/image-20260806180616583.png)

![image-20260806180717924](/computer_organization_images/image-20260806180717924.png)

可并行发送4bit数据，同一时刻只有一个部件发送数据，但是有多个部件接收数据

![image-20260806180914987](/computer_organization_images/image-20260806180914987.png)

==总线是一组能为多个部件分时共享的公共信息传送线路==

![image-20260806181105550](/computer_organization_images/image-20260806181105550.png)

为了更好的的解决IO设备和主机之间连接的灵活性问题，计算机的结构从分散连接发展为总线连接

- 分时性
- 共享性

### 总线的特性

![image-20260806181333175](/computer_organization_images/image-20260806181333175.png)

### 总线分类

- 串行总线：1bit1bit的接收（如USB）

优点：只需要一条传输线，成本低廉，广泛应用于长距离传输，应用于计算机内部时，可以节省布线空间

缺点：在数据发送和接收的时候要进行拆卸和发配，要考虑串行并行转换问题。

- 并行总线：每次可以传多位（如CPU总线）

优点：总线的逻辑时序比较简单，电路实现起来比较容易

缺点：信号线数量很多，占用更多的布线空间，远距离传输成本高，由于工作频率较高的时候，信号线之间的干扰比较大，对每条线等长的要求也很高，所以无法持续提升工作频率

==所以串行不一定比并行慢！！==

![image-20260806181730662](/computer_organization_images/image-20260806181730662.png)

按照传输信息内容不同，分为：

数据总线、地址总线、控制总线

![image-20260806181940954](/computer_organization_images/image-20260806181940954.png)

![image-20260806191058723](/computer_organization_images/image-20260806191058723.png)

![image-20260806191109168](/computer_organization_images/image-20260806191109168.png)

数据通路表示的是数据流经的路径，数据总线是承载的媒介

### 系统总线的结构

- 单总线结构
- 双总线结构
- 三总线结构

1、单总线结构

![image-20260806192129227](/computer_organization_images/image-20260806192129227.png)2、双总线结构

![image-20260806192324958](/computer_organization_images/image-20260806192324958.png)

加了一个通道

优点：将较低速的IO设备从单总线上分离出来，实现存储器总线和IO总线分离
缺点：需要增加通道等硬件设备

3、三总线结构

 ![image-20260806192809326](/computer_organization_images/image-20260806192809326.png)

优点：提高了IO设备的性能，使其更快相响应命令

缺点：系统工作效率较低

![image-20260806193058579](/computer_organization_images/image-20260806193058579.png)

![image-20260806193110984](/computer_organization_images/image-20260806193110984.png)

### 总线的性能指标

![image-20260806194324916](/computer_organization_images/image-20260806194324916.png)

![image-20260806194417373](/computer_organization_images/image-20260806194417373.png)

![image-20260806194613026](/computer_organization_images/image-20260806194613026.png)

总线带宽 = 总线工作频率*总线宽度

![image-20260806194925380](/computer_organization_images/image-20260806194925380.png)

![image-20260806195001757](/computer_organization_images/image-20260806195001757.png)

![image-20260806195156044](/computer_organization_images/image-20260806195156044.png)

![image-20260806195332096](/computer_organization_images/image-20260806195332096.png)

### 总线操作和定时

总线周期四个阶段：

![image-20260807110502800](/computer_organization_images/image-20260807110502800.png)

- 同步定时方式

![image-20260807112851817](/computer_organization_images/image-20260807112851817.png)

同步定时方式是指系统采用一个统一的时钟信号来协调发送和接收双方的传送定时关系

若干个时钟产生相等的时间间隔，每个间隔构成一个数据传送

因为采用统一的时钟，每个部件或设备发送或接收信息都在固定的总线传送周期中，一个总线的传送周期结束，下一个总线传送周期开始

- 优点：传送速度快，具有较高的传输速率；总线控制逻辑简单
- 缺点：主从设备属于强制同步；不能及时进行数据通信的有效性经验，可靠性较差

==同步通信适用于总线长度较短及总线所接部件的存取时间比较接近的系统==

- 异步定时方式：

![image-20260807160856207](/computer_organization_images/image-20260807160856207.png)

![image-20260807161233502](/computer_organization_images/image-20260807161233502.png)

![image-20260807161827634](/computer_organization_images/image-20260807161827634.png)

- 半同步通信

![image-20260807161933636](/computer_organization_images/image-20260807161933636.png)

- 分离式通信

![image-20260807162155920](/computer_organization_images/image-20260807162155920.png)

![image-20260807162413179](/computer_organization_images/image-20260807162413179.png)

## 第七章 输入输出系统

![image-20260807163004721](/computer_organization_images/image-20260807163004721.png)

CPU如何控制键盘IO的完成：

![image-20260807163121119](/computer_organization_images/image-20260807163121119.png)

数据流：

键盘 -> IO接口的数据寄存器 -> 数据总线 -> CPU某寄存器 -> 主存（变量i的对应位置）

DMA控制方式（直接内存访问）

![image-20260807163556025](/computer_organization_images/image-20260807163556025.png)

![image-20260807163650275](/computer_organization_images/image-20260807163650275.png)

DMA控制器与主存每次传送1个字，放传送万一整块数据后才想CPU发出中断请求

通道控制方式：

可以理解为弱鸡版CPU,通道可以识别并执行一系列通道指令，通道指令种类，功能通常比较单一

![image-20260807164005197](/computer_organization_images/image-20260807164005197.png)

执行完成后，向CPU发出中断请求

![image-20260807164210585](/computer_organization_images/image-20260807164210585.png)

在含有通道的计算机中，CPU执行IO指令对通道发出命令，由通道执行一些列通道指令，代替CPU对IO设备进行管理

![image-20260807164334668](/computer_organization_images/image-20260807164334668.png)

### IO接口

作用：

![image-20260807164659524](/computer_organization_images/image-20260807164659524.png)

![image-20260807164814430](/computer_organization_images/image-20260807164814430.png)

![image-20260807165930583](/computer_organization_images/image-20260807165930583.png)

统一编制，独立编制

![image-20260807170652757](/computer_organization_images/image-20260807170652757.png)

![image-20260807171156757](/computer_organization_images/image-20260807171156757.png)

IO接口的分类

按照外设和接口一侧数据传送方式：

- 并行接口：一个字节或一个字所有位同时传送
- 串行接口：一位一位地传送

按照主机访问IO设备的控制方式：

- 程序查询接口
- 中断接口
- DMA接口

按功能选择的灵活性可分为

- 可编程接口
- 不可编程接口

![image-20260807171633311](/computer_organization_images/image-20260807171633311.png)

![image-20260807174924368](/computer_organization_images/image-20260807174924368.png)

![image-20260807175257754](/computer_organization_images/image-20260807175257754.png)

![image-20260807175327197](/computer_organization_images/image-20260807175327197.png)

![image-20260807180609435](/computer_organization_images/image-20260807180609435.png)

![image-20260807180651970](/computer_organization_images/image-20260807180651970.png)

- 独占查询：CPU100%的时间都在查询IO状态，完全串行
- 定时查询：在保证数据不丢失的情况，每隔一段时间CPU就查询一次IO状态。查询的间隔内CPU可以执行其他程序。

![image-20260807180927386](/computer_organization_images/image-20260807180927386.png)

### 程序中断方式

![image-20260807181147176](/computer_organization_images/image-20260807181147176.png)

![image-20260808121206650](/computer_organization_images/image-20260808121206650.png)

- 非屏蔽中断：关中断时也会被响应
- 可屏蔽中断：关中断时不会被响应

![image-20260808134847360](/computer_organization_images/image-20260808134847360.png)

![image-20260808135159168](/computer_organization_images/image-20260808135159168.png)

![image-20260808135756522](/computer_organization_images/image-20260808135756522.png)

![image-20260808140014490](/computer_organization_images/image-20260808140014490.png)

![image-20260808140238074](/computer_organization_images/image-20260808140238074.png)

![image-20260809215155314](/computer_organization_images/image-20260809215155314.png)

![image-20260809215715315](/computer_organization_images/image-20260809215715315.png)

![image-20260809215725370](/computer_organization_images/image-20260809215725370.png)

###  DMA控制器

![image-20260809224417120](/computer_organization_images/image-20260809224417120.png)

CPU向DMA控制器指明要输入还是输出；要传送多少个数据，数据在主存、外设中的地址

- 接收外设发出的DMA请求，并向CPU发出总线请求
- CPU响应词总线请求，发出总线响应信号，接管总线控制权，进入DMA操作周期
- 确定传送数据的主存单元地址及长度，并能主动修改主存地址计数和传送长度计数
- 规定数据在主存和外设间的传送方向，发出读写等控制信号，执行数据传送操作
- 向CPU报告DMA操作的结束

![image-20260809232450506](/computer_organization_images/image-20260809232450506.png)

![image-20260809232549923](/computer_organization_images/image-20260809232549923.png)

![image-20260809232613259](/computer_organization_images/image-20260809232613259.png)

![image-20260809232817736](/computer_organization_images/image-20260809232817736.png)

==IO与主机并行工作，程序和传送并行工作==

DMA和CPU同时访问主存导致冲突怎么办？

- 停止CPU访问
- DMA和CPU交替
- 周期挪用

![image-20260809233518990](/computer_organization_images/image-20260809233518990.png)

同时访存，DMA优先，不然寄存器内的数据会被刷新覆盖

![image-20260809233619590](/computer_organization_images/image-20260809233619590.png)

![image-20260809233755789](/computer_organization_images/image-20260809233755789.png)

