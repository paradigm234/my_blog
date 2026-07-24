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

