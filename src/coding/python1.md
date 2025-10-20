# python

```python
content_and_topic_info = rapidjson.loads(params['contentAndTopicInfo'])
```

- `params['contentAndTopicInfo']`是一个 JSON 格式的字符串，包含题目内容（如题干、选项）和答案信息（如标准答案、用户答案）。

- 通过`rapidjson.loads`将 JSON 字符串解析为 Python 字典，便于后续提取数据。`rapidjson`是一个高效的 JSON 解析库，类似`json`模块但性能更优。

  ```python
  protocol = params['protocol']
  
   appId = params['appId'] 
  
  categoryCode = params['categoryCode']
  ```

  - `protocol`：引擎协议版本（如 “5.0”），确保数据格式符合引擎的版本要求。

  - `appId`：应用标识，用于引擎识别请求来源（类似 API 密钥的作用）。

  - `categoryCode`：题型编码（如 “05” 可能代表判断题，其他可能代表选择题），用于区分题型。

    ```python
    content_info = content_and_topic_info.get('contentInfo', {})
    
     topic_answer_info = content_and_topic_info.get('topicAnswerInfo', {})
    
     topicDetail = content_info.get('topicDetail', {})
    ```

    - `content_info`：从解析后的字典中提取 “题目基本信息”（如题目 ID、题型名称），默认空字典避免键不存在报错。
    - `topic_answer_info`：提取 “答案相关信息”（如用户手写答案、答案区域坐标）。
    - `topicDetail`：从`content_info`中提取 “题目详情”（如题干文本、选项列表、子题信息）。

## 基础知识补充：数据容器

`name_list=['','','']`

类型：列表，元组，字符串，集合，字典

#### 列表

##### 基本语法

`[元素1，元素2，元素3，元素4....]`

eg:`name_list=[...]`

print(name_list) 数据类型为：list  嵌套：列表中再进列表  `my_list = [[1,2,3],[4,5,6]]`

元素类型不受限

##### 下标索引

0，1，2，3，4：正向 

-5，-4，-3，-2，-1：反向

##### 嵌套列表索引 

eg：`mylist\[1][0]`

##### 列表的常用操作

列表方法：

1.查询 找不到：报错valueerror

列表.index(元素)

`mylist=[...]`

`index = mylist.index("itheima")`

`print(..)`返回值是正向索引的下标

修改下标：

`mylist[0]="..."`（取下表索引，直接赋值即可）

插入元素：

`mylist.insert(1,"best")`在第一个和第二个空格里插入“best”

追加元素：

`mylist.append(元素)`（在列表最后追加单个元素）

`mylist.extend(列表)`（在列表后追加列表）

元素删除：

`del mylist[2]` (删除了第三个元素)

`mylist.pop(2)`(同上，但是可以得到返回值)

`mylist.remove(元素)`（指定删除元素的内容，从左到右找到的第一个删除）

`mylist.clear()`（清空列表)

统计数量

`my_list.count(元素)`（返回值为列表中此元素数量）

`len（mylist）`（返回值为列表的元素总数量）

##### 列表的遍历

while循环：
```python
index=0

while index<len(列表)：

  元素=列表[index]

index+=1

for循环遍历：

for 临时变量 in 数据容器：

对临时变量进行处理

for element in mylist

print({element})(功能同上)
```
#### 元组

元组一旦定义完成，就不可能修改（只读）

定义：

（元素，元素，元素。。。）

t1=（1，“hello”，“Ture”）类型为：turple

元组嵌套：

t5=（（1，2，3）（4，5，6））

下标索引取元素（同列表）

方法： 

t1.index（）查找

len(t8):统计t8元组的元素一共有多少个

遍历：

index = 0

while index<len(t8)

print(..index..)

index+=1

truple不支持元素的修改 重新分配

#### 字符串

my_str="itheima and itcast"

`value=my_str[2]`

`value2=my_str[16]`

无法修改，只读

搜索：index 

替换：字符串.replace(字符串1，字符串2) 返回一个新的字符串 用1换了2 

切分：my_strlist=my_str.split(" ")括号里是“按什么切分”

规整操作： 字符串.strip()

my_str = "..."

#不传入参数就是去除空格，传入参数是要去除的东西。

统计：

某字符串出现的次数：my_str = "itheima and itcast "

 count = my_str.count("it")

print({count})

统计长度：len（字符串）

#### 序列

内容连续，有序，可使用下标索引的一类数据容器

操作

切片：从一个序列中取出一个子序列

序列`[起始下标：结束下标：步长]` 返回值仍然是序列（不写表示从头到尾，步长为1）

#### 集合

定义：不支持重复元素，且不有序 自带去重功能，。

`{元素1，元素2，元素3。。}`

不支持下表索引访问

操作：

添加：my_set.add("python")

my_set.add("...")

移除元素：my_set.remove

随机取出元素 集合.pop

清空：my_set.clear()

清除连个集合的相同元素：difference_update

合并集合：my_set.union

统计集合的元素数量：len（set）

集合不支持下标索引，只能用for循环进行遍历

#### 字典

通过key找到value

`{key：value,key:value,......,key:vlaue}`键值对

my_dict = { }(空字典)

字典也不允许元素重复 若重复，保留后面的（覆盖）

不可以使用下标索引

从key中获取value

`score = my_dict["wanglihong"]`

(输出就是wanglihong的value)

key和value 可以是任意类型 但是key不能是字典 可以嵌套

 新增/更新

my_dict = {...}

新增：`my[新key]=新元素`

 更新：`my_dict[已有key]=新元素 `（直接覆盖）

删除：score= my_dict.pop("zhou")(直接删除key)（有返回值，是删除的值）

清空：my_dict.clear

遍历：for key in my_dict:  不能用while循环，无下标索引

统计字典元素数量：`len(my_dict)`


#### 通用操作

max：找最大的元素

len：返回长度

list/str/tuple/set

#### json

轻量级数据交互格式 可以按照JSON指定格式去组织和封装数据

JSON本质上是一个带有特定格式的字符串 负责不同编程语言的数据传输和交互

是python列表嵌套字典/字典

json转字符串 json.dump(data,ensure_ascii=false)

JSON字符串转python格式(data.loads(s))

#### 正则表达式

re模块 match search findall 三个基础方法

match从头部匹配

search：被匹配字符串，搜索整个字符串，找出匹配的。从前向后，找到第一个后，就停止，不会继续向后

findall：可以找出全部的匹配项

re.match（“要找的”，查找对象）




```python

```



#### 捕获异常

##### 常规异常

```python
try：可能发生错误的代码
except：如果出现异常执行的代码
try:
    f = open("D/abc.txt","r",encoding="UTF-8")
except:
    print("出现异常，因为文件不存在，我将open模式，改为w模式去打开")
    f = open("D/abc.txt","w",encodin="UTF-8")
```

##### 捕获指定异常

只接收特定异常

```python
try:
    print(name)
except NameError as e:
    print("name变量名称未定义")
```

##### 捕获多个异常

```python
try:
    
except (NameError,ZeroDivision) as e:
    print("出现了变量未定义 或者 除以0的错误")
```

##### 捕获所有异常

exception 是顶级异常，可以捕获所有异常

```python
try:
    f = open("D/:123.txt","r")
except Exception as e:
    print("出现异常了")
else:
    print("好高兴，没有异常")
```

```python
try:
    f = open("D/:123.txt","r")
except Exception as e:
    print("出现异常了")
else:
    print("好高兴，没有异常")
finally:
    f.close()
```

finally——无论如何（无论有无异常）都要执行这行代码

#### 异常的传递

异常可以通过函数传递报错

#### python模块

一个py文件，模块定义了函数，类，变量等，相当于一个工具包

```python
from 模块名 import 模块or变量or类or函数or*（全部内容）  as 别名
form time import *
```

自定义模块并导入

创建一个python文件，在里面写代码，在另一个文件里import该文件即可

__main__变量

__all__变量（控制导入变量）

#### python包

文件夹，里面有一堆python模块 还有一个 _init_.py的文件——》package包

```python
import my_package.my_module1
my_package.my_module1.info_print1()
my_package.my_module2.info_print2()##调用函数语法
或者
from my_package.my_module1 import my_module1
```

#### json格式

在不同语之间互相通用的传递数据，json是一种非常良好的中转数据

```python
import json
#准备列表，列表内每一个元素都是字典，将其转换为JSON
data = [{"name":"张大山","age":11},{"name":"王大锤","age":13},{"name":"赵小虎","age":16}]
json_str=json.dumps(data,ensure_ascii=False)
print(type(type_str))
print(json_str)
#将JSON字符串转换未Python数据类型[{k:v,k:v}{k:v,k:v}]（列表）
s ='[{"name":"张大山","age":11},{"name":"王大锤","age":13},{"name":"赵小虎","age":16}]'
l = json.loads(s)
print(type(l))
print(l)
```

json要么是字典要么是列表（字符串形式）

### 面向对象编程

#### 类的定义和使用

class 类名称： class是关键字，表示要定义类了

​                          类的属性，即定义在类中的变量（成员变量）

​                          类的行为，即定义为类中的函数（成员方法）

对象 = 类名称（）

```python
def 方法名（self,形参1，形参2.。。）
    方法体
```

```python
class Student:
    name = None
    age = None
    def say_hi(self):
        print(f"Hi大家好，我是{self.name}")
```

传参的时候，self是透明的，可以不理会

```python
##定义类
Class Student:
    name = None
    def say_hi(self):
        print(f"大家好，我是{self.name}")
    def say_hi2(self，msg):
        print(f"大家好，我是{self.name},{msg})
##调用类
stu=Student()
##给类里面的变量赋值
stu.name = "周杰伦"
##调用类里面的函数            
stu.say_hi1()
              
stu2=Student()
stu2.name="vae"
stu2.say_hi2("么么叽")
              
              
```

类：属性+行为

面向对象编程：类相当于设计图纸  

对象相当于生产出来的具体实体

#### 构造方法

```python
##python类可以使用_init_()方法，称之为构造方法。
##在创建类对象的时候，会自动执行，不论diao；也会将传入参数自动传递给_init_方法使用
class Student():
    name = None
    age = None
    tel = None
##自动执行
    def _init_(self,name,age,tel):
        self.name = name
        self.age =age 
        self tel = tel
        print("Student类创建了一个对象")
stu = Student("周杰伦"，31，"12312")##自动传参，减少代码量，更方便
```

#### 魔术方法

_init_ _str_ _lt_ _le_ _eq_

str:直接打印对象的话显示的是内存地址，使用str魔术方法可以打印出内容

lt:数值比较功能

le:加一个等于的比较功能

eq:判断是否相等

```python
class Student:
    def __int__(self,name,age):
       self.name = name
       self.age = age
    def __str__(self):
       return f"Student类对象，name：{self.name},age:{self.age}"
    def __lt__(self)
       return self.age <other.age
    def __le__(self)
       return self.age <=other.age
    def __le__(self)
       return self.age =other.age
stu = Studen()
print(stu)
print(stu1<stu2)##返回bool型
print(stu1<=stu2)

```

#### 封装

##### 私有成员 

​     /__stu 不能被用户直接使用  且类对象无法获取这些变量/方法

#### 继承

##### 单继承

```python
class 类名（父亲类）:
    类内容体
eg:
class phone:
    IMET = None
    producer = "apple"
    
    def call_by_4g(self):
        print("4g通话")
class phone2022(phone):##继承上面那个类
    face_id = "11001"
    def call_by_5g(self):
        print(""2022新功能，5g通话)
```

##### 多继承

```python
class 类名（继承类名1，继承类名2，继承类名3）:
     .... 
eg:
class 类名（类1，类2，类3）:
    pass##表示不添加新功能，直接继承
```

输出同名的成员，先继承的类优先，谁先继承谁的优先级更高

##### 复写

子类中重新定义父类的数据，在子类中对父类继承的数据进行覆盖

调用父类同名成员

父类名.成员变量/父类名.成员方法

super().成员变量/super().成员方法

##### 类型注解

....

```python
##很重要的代码
class Animal:
    def speak(self):
        pass
class Dog(Animal):
    def speak(self):
        print("汪汪汪")
class Cat(Aniaml):
    def speak(self):
        print("喵喵喵")
def make_noise(animal:Animal):##类型提示，要传入animal的子类才行
    animal.speak()
 dog = Dog()
 cat = Cat()
make_noise(dog)
make_noise(cat)
      
```

```python
class AC:
    def cool_wind(self):
        pass
    def hot_wind(self):
        pass
    def swing_l_r(self):
        pass
class Midea_ac(AC):
    def cool_wind(self):
        print("美的空调制冷")
    def hot_wind(self):
        print("美的空调制热")
    def swing_l_r(self):
        print("美的空调扫风")
class Gree_ac(AC):
     def cool_wind(self):
        print("格力空调制冷")
    def hot_wind(self):
        print("格力空调制热")
    def swing_l_r(self):
        print("格力空调扫风")
 class make_cool(ac:AC):
    ac.cool_wind()
 
midea_ac=Midea_ac()
gree_ac=gree_ac()

make_cool(midea_ac)
make_cool(gree_ac)
```

#### SQL

..........download mysql............

mysql -uroot -p:进入命令行

show databases；：查看有哪些数据库

use+数据库名：使用某一个数据库

show tables ：查看数据库内有哪些表

exit：退出Mysql数据库的命令行环境

sql：structured query language访问处理数据库专用语言

sql语言大小写不敏感

```sql
show databases;##结尾加分号，大小写不敏感
```

-- 注释内容（单行）

#注释内容（单行）

/*多行注释*/

##### SQL-DDL

show databases;use 数据库名称；create database 创建数据库；drop database 删除数据库；select database()；查看当前使用的数据库

```sql
create database test charset utf8;
show databases;
drop database test;
```

表维度：

```sql
SHOW tables;
drop table 表名称；
drop table if exists 表名称
create table 表名称（
  列名称 列类型，
  列名称，列类型，
  。。。。
  ），
```

int --整数

float--浮点

varchat（长度） --文本，长度为数字，做最大长度限制

date --日期类型

timestamp --时间戳类型

##### SQL-DML

```sql
##基础语法
INSERT INTO表[(列1，列2，列3，....,列n)]VALUES(值1，值2，值3........值N)（）（）

create table student(
    id int,
    name varchar(10),
    age int
);
insert into student(id) value(1),(2),(3);
insert into student(id,name,age） value(4,'zhoujielun',31),(5,'xusong',31)；
```

删除数据

```sql
DELETE  FROM 表名称 [WHERE 条件判断]
eg：
DELETE  FROM student[WHERE id>7]
```

数据更新

```sql
UPDATE 表名 SET 列=值 [WHERE 条件判断]
eg:
UPDATE student SET name = 'wangjunhao'[WHERE id=1]
```

##### SQL-DQL

数据查询

```sql
SELECT id,name FROM student//如果全部字段都查询，select *
SELECT 字段列表/* FROM 表 WHERE 条件判断
```

分组聚合

```sql
SELECT 字段/聚合函数 FROM 表[WHERE 条件]GROUP BY 列
聚合函数：
- SUM(列) 求和
- AVG(列) 求平均值
- MIN(列) 求最小值
- MAX(列) 求最大值
- COUNT(列/*) 求数量
##对于非聚合函数，group by里面出现啥，select里面才能写啥
```

排序分页

```sql
SELECT 字段/聚合函数 FROM 表[WHERE 条件]GROUP BY 列 ORDER BY ....[ASC/DESC] LIMIT n,m
##ASC是升序，DESC是降序，对查询结果进行排序,不写的话默认升序
##LIMIT 代表从第n个开始选，往后m个，不写m表示限制前n条

```

select和from必须出现

执行顺序：FROM->WHERE->GROUP BY和聚合函数->SELECT->ORDER BY->LIMIT

#### pyspark

全球顶级的分布式计算框架

.....回头在学喵........

#### 闭包

为了防止全局变量被篡改

```python
def outer(logo):
    def inner(msg):
        print(f"{logo},{msg},{logo}")
        return inner##返回的是函数
 fn1 = outer("123")##123作为logo传入inner函数中
 fn1("234")##调用上一行接收的fn1函数
 ##输出结果为：123
```

可以在内部函数钟修改外部函数中的变量

```python
def outer(num1):
    def inner(num2):
       nonlocal num1
       num1 +=num2
        print(num1)
        
        return inner
fn = outer(14)
fn(14)
```

```python
def account_create(initial_amount=0):
    def atm(num,deposit=True):
        nonlocal initial_amount
        if deposit:
            initial_amount+=num
            print(f"存款为+{num},余额为{initial_amount} - pyj_zwrs_doubao.py:6")
        else:
            initial_amount-=num
            print(f"取款为{num},余额为{initial_amount} - pyj_zwrs_doubao.py:9")
            
    return atm
atm1=account_create()
atm1(100)
atm1(300)
atm1(400,False)
```

#### 装饰器

不改变函数的情况下，增加新功能

```python
def sleep():
    import random
    import time
    print("睡眠中")
    time.sleep(random.randint(1,5))
def outer(func):
    def inner():
        print("我睡觉了")
        func()
        print("我起床了")
        
     return inner
fn = outer(sleep)
fn()
```

本质上还是闭包

写法二：

```python
@outer
def sleep():
    import random
    import time
    print("睡眠中")
    time.sleep(random.randint(1,5))
def outer(func):
    def inner():
        print("我睡觉了")
        func()
        print("我起床了")
        
     return inner
sleep()##装饰器写法，将sleep作为一个参数传入outer里面，变相扩展了sleep的功能
```

