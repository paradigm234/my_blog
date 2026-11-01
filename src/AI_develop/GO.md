# GO基础

## 0.1Go语言的介绍

golang是由google2009年发布的语言，被誉为“21世纪的语言”

特点：

- 简洁高效
- 并发支持
- 跨平台支持
- 标准库强大
- 静态类型

用go语言写的项目：

- docker
- nq
- prometheus
- cockroachDB

## 1.1变量的声明和定义

```go
func main() {
	//先声明
	var name string
	//再赋值
	name = "jhw"
	fmt.Println(name)

	//声明并赋值
	var name1 string = "zz"
	fmt.Println(name1)
	//省略类型
	var name2 = "jjw"
	fmt.Println(name2)
	//声明并赋值，短声明符号
	name3 := "jj"
	fmt.Println(name3)
}
```

- 局部变量：函数内声明，只能函数内用，而且必须要用，不然报错
- 全局变量：函数外声明，要用var声明，可以不用

```go
var  a1,a2 = 1,2
```

上面那样会把1赋值给a1，2赋值给a2

定义常量：

```go
const version string = “2.0.1”
```

**命名规范**：==首字母大写的变量，函数，方法，属性可以再包外访问，不大写不行==

## 1.2输入输出

```go
package main

import "fmt"

func main() {
  fmt.Printf("%v\n", "你好")          // 可以作为任何值的占位符输出
  fmt.Printf("%v %T\n", "枫枫", "枫枫") // 打印类型
  fmt.Printf("%d\n", 3)             // 整数
  fmt.Printf("%.2f\n", 1.25)        // 小数
  fmt.Printf("%s\n", "哈哈哈")         // 字符串
  fmt.Printf("%#v\n", "")           // 用go的语法格式输出，很适合打印空字符串
    var f = fmt.Sprintf("%.2f",3.1415926)
    fmt.println(f)
}

```

输入：

```go
package main

import "fmt"

func main() {
  fmt.Println("输入您的名字：")
  var name string
  fmt.Scan(&name)  // 这里记住，要在变量的前面加个&, 后面讲指针会提到
  fmt.Println("你输入的名字是", name)
}
```

==go语言中定义变量后，没有赋值会有一个默认的0值==

## 1.3数据结构

### 整数型

go的语言细分较多

- 默认的数字定义类型是int
- 带个u就是无符号，只能存在正整数
- 后面的数字就是2进制的位数
- unit8还有一个别名就是byte，一个字节 = 8个bit位
- int类型的大小取决于所使用的平台

```go
var n1 uint8 = 2 
var n2 uint16 = 2 
var n3 uint32 = 2 
var n4 uint64 = 2 
var n5 uint = 2 
var n6 int8 = 2 
var n7 int16 = 2 
var n8 int32 = 2 
var n9 int64 = 2 
var n10 int = 2 
```

例如uint8，那就是8个二进制位，都用来存储数据，那最小就是0，最大就是2的八次方-1=255

### 浮点型

float32和float64

1. float32 的浮点数的最大范围约为3.4e38，可以使用常量定义：`math.MaxFloat32`
2. float64 的浮点数的最大范围约为 1.8e308，可以使用一个常量定义：`math.MaxFloat64`

如果没有显式声明，则默认是float64

### 字节

```go
package main

import "fmt"

func main() {
  var c1 = 'a'
  var c2 = 97
  fmt.Println(c1) // 直接打印都是数字
  fmt.Println(c2)

  fmt.Printf("%c %c\n", c1, c2) // 以字符的格式打印
//单字节
  var r1 rune = '中'
  fmt.Printf("%c\n", r1)
}
```

转义字符

```go
fmt.Println("枫枫\t知道")              // 制表符
fmt.Println("枫枫\n知道")              // 回车
fmt.Println("\"枫枫\"知道")            // 双引号
fmt.Println("枫枫\r知道")              // 回到行首
fmt.Println("C:\\pprof\\main.exe") // 反斜杠
```

多行字符串

```go
package main

import "fmt"

func main() {
  var s = `今天
天气
真好
`
  fmt.Println(s)
}
```

### 布尔类型

true和false

- 布尔类型变量的默认值为false
- go语言中不允许将整数型强制转换为布尔型
- 布尔型无法参与数值运算，也无法与其他类型进行转换

### 数组/切片

```go
package main

import "fmt"

func main() {
  var array [3]int = [3]int{1, 2, 3}
  fmt.Println(array)
  var array1 = [3]int{1, 2, 3}
  fmt.Println(array1)
  var array2 = [...]int{1, 2, 3}
  fmt.Println(array2)
}
```

切片

```go
package main

import "fmt"

func main() {
  // 定义一个字符串切片
  var list []string

  list = append(list, "枫枫")
  list = append(list, "知道")
  fmt.Println(list)
  fmt.Println(len(list)) // 切片长度
  // 修改第二个元素
  list[1] = "不知道"
  fmt.Println(list)
}
```

make函数：

```go
make([]type, length, capacity)
```

- type：切片里面元素的类型，比如int,string
- length：切片当前可见元素个数，初试这些位置会自动置零
- capacity：底层数组的总容量，也就是最多能存多少个元素，不扩容的前提下

sort函数：

```go
sort.Ints()//默认升序
//sort.元素数据类型（第一个字母大写）()
//降序
sort.Sort(sort.Reverse(sort.IntSlice(ints)))

```

### map

```go
func main(){
    var userMap map[int]string = map[int]string{
        1:"james"
        2:"mike"
        3:"john"
    }
    fmt.Println(userMap)
    fmt.Println(userMap[1])
    fmt.Println("%#v\n",userMap[3])
    value := userMap[4]
    value,ok := userMap[4]
}
// 声明并赋值
var m1 = map[string]string{}//这个{}一定要有，不然报错
var m2 = make(map[string]string)
package main

import "fmt"

func main() {
  // 声明并赋值
  var m1 = map[string]int{
    "age": 21,
  }
  age1 := m1["age1"] // 取一个不存在的
  fmt.Println(age1)
  age2, ok := m1["age1"]
  fmt.Println(age2, ok)
}
```

map取值：

```go
package main

import "fmt"

func main() {
  // 声明并赋值
  var m1 = map[string]int{
    "age": 21,
  }
  age1 := m1["age1"] // 取一个不存在的
  fmt.Println(age1)
  age2, ok := m1["age1"]
  fmt.Println(age2, ok)
}
```

map删除：

```go
delete(userMap,key)
```

对于复杂数据类型的初始化：

``` go
var aMap = make(map[string]string)
aMap["name"] == "ball"
```

## 2.1判断语句

### if语句

以年龄为例，输入的年龄在某一个区间，就输出对应的提示信息

```go
func main(){
    var age int
    fmt.Printf("请输入你的年龄")
// 中断式 卫语句
    if age <= 0{
        fmt.Println("未出生")
        return
    }
    if age <= 18 {
        fmt.Println("未成年")
        return   
    }
    if age <= 35 {
        fmt.Println("青年")
        return
    }
    fmt.Println("中年")
}
//还有一个嵌套式写法，很容易，略
```

### switch语句

```go
switch {
    case age <= 0:
    case age <= 18:
    fallthrough//满足了还要往下写
    case age <= 35
    default:    
}
//另一种写法
var week int
fmt.Printf("请输入星期：")
fmt.Scan(&week)
switch week{
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6,7:
default:
}

```

==go语言的switch写法不需要加break，会自动退出判断，如果还要往下走的话可以加一个fallthrough==

## 2.2For循环

```go
func main(){
    for i :=0;i < ; i++{
        sum += i
    }
    fmt.Println(sum)
}
```

whilex循环：

```go
//go里面无while循环，可以用for循环替代
var i int = 1
for i <= 100 {
    sum += i
    i++
}
```

```go
for index,item := range list{
    fmt.Println(index,item)
}//打印切片
var userMap = map[string]string{"name":"凤凤"}
for key,value := range userMap {
    fmt.Println(key,value)
}

```

```go
//九九乘法表
for i:=1;i <= 9; i++ {
    for j := 1; j <= i; j++ {
        fmt.Printf("%d*%d=%d\t",i,j,i*j)
        fmt.Println()
    }
}

```

## 3.1 函数（指针）

```go
func sayHello() {
    fmt.Println("nihao")
}

func param1(id string) {
    fmt.Println(id)
}
func param2(id,useName string) {
    fmt.Println(id)
}
func add(numberList ...int) {
    var sum int
    for _, i2 := range numberList {
        sum += i2
    }
    fmt.Println(sum)
}
func main() {
    sayHello()
}

```

有返回值：

```go
func r2() bool{
    return false
}
//或者
func r3() {
    var ok bool
    return ok
}
//返回多类型
func r3()(string,bool) {
    return "aaa",true
}
//或者
func r4() (val string,ok bool) {
    if i>2 {
        val = "12"
        return
    }
    return
}
```

**值传递**：

```go
var funMap = map[int]func() {
    1:login,
    2:register,
    3:userCenter,
}
//取两个值，额外告诉你这个键存不存在
fun, ok := funMap[index]
if ok {
    fun()
}
```

 闭包：

```go
func awaitAdd(awaitsecond int) func(...int) int{
    time.Sleep(time.Duration(awaitSecond) * time.Second)
    return func(numberList ...int)(sum int) {
        for _,i2 := range numberList {
            sum += i2
        }
        return sum
      
    } 
}
//实现先延迟一秒，然后计算123之和
var sum int
sum = awaitAdd(1)(1,2,3)
```

值传递和引用传递：和C一致，略

##   3.2 init函数和defer函数

`init()`:一个特殊的函数

- 不能被其他函数调用，而是在main函数  
- 不能作为参数传入
- 不能有传入参数和返回值
- 一个go文件可以有多个init函数，谁在前面谁执行

`defer()`:延迟调用函数

- dfer函数用于注册延迟调用
- 这些调用知道return才被执行，可以用来做资源清理
- 多个defer语句，按照先进后出的方式执行，谁离return近谁先执行
- defer语句中的变量，在defer声明前就决定了

```go
func main() {
    var age int
    defer fmt.Println("defer2")
    defer func() {
        fmt.Println(age)
    }()
    
    return
}
```

 

```go
package main

import "fmt"

func main() {
	a := 1
	a++
	defer fmt.Printf("%d \n", a)
	defer func() {
		fmt.Printf("%d \n", a)
	}()
	a++
	defer func() {
		fmt.Printf("%d \n", a)
	}()

}
//输出是 3 3 2 原因是如果是func函数形式的defer需要读取变量，单独的一行代码不需要读取a
```

## 3.3 结构体

```go
func main()package main

import "fmt"

type Student struct {
	Name string
}

func (s Student) Study() {
	fmt.Printf("%s 正在学习", s.Name)
}

func main() {
	s1 := Student{Name: "wjh"}
	s1.Study()

}
//面向对象
```

## 3.4 组合（继承）

```go
package main

import "fmt"

type Class struct {
	Name string
}

type Student struct {
	Class
	Name string
}

func (s Student) Study() {
	fmt.Printf("%s 正在学习", s.Name)
}
func (s Student) info() {
	fmt.Printf("name : %s, class :%s\n", s.Name, s.Class.Name)
}

func main() {
	c1 := Class{
		Name: "三年一班",
	}

	s1 := Student{Class: c1, Name: "wjh"}
	s1.Study()
	s1.info()

}
//和java很像
```

## 3.4 接口

```go
package main

import "fmt"

// 定义接口：要求有 Sing() 方法
type SingInterface interface {
	Sing()
}

type Chicken struct {
	Name string
}

type Cat struct {
	Name string
}

// Chicken 绑定注册 Sing
func (c Chicken) Sing() {
	fmt.Println(c.Name, "在唱歌")
}

// Cat 绑定注册 Sing
func (c Cat) Sing() {
	fmt.Println(c.Name, "在唱歌")
}

// 参数接收这个接口类型
func Sing(s SingInterface) {
	fmt.Println("===== 表演开始 =====")
	s.Sing()
	fmt.Println("===== 表演结束 =====")
}

func main() {
	c := Chicken{Name: "IKUN"}
	ca := Cat{Name: "mimi"}
	Sing(ca)
	Sing(c)
}

```

- 要先绑定结构体和函数，然后才能用接口
- 每个绑定的函数可以不一样，但是名字一样，接口先进行统一处理再调自己的函数
- 接口是值类型，不能绑定方法

类型断言：

```go
//在接口函数里指定传入的类型
func sing(c SinginInterface) {
    //只有chicken类型才可以调用，不然返回fase
    ch,ok := c.(Chicken)
    fmt.Println(ch,ok)
    c.sing()
}
//多个类型
func sing(c SinginInterface) {
    switch server := c.(type) {
        case Chicken:
        fmt.Println("鸡")
    case Cat:
        fmt.Println("猫")
    }
}
```

空接口：

- 空接口可以接受任何类型

```go
//空接口
func Print(val any) {
    fmt.Println("...")
}
```

## 3.5 协程

 

```go
package main

import (
	"fmt"
	"time"
)
//定义信号量，是一种简陋的写法
var wait int

func shopping(name string) {
	fmt.Printf("%s 开始买东西\n", name)
	time.Sleep(1 * time.Second)
	fmt.Printf("%s 买完了\n", name)
	wait--
}

// 协程
func main() {
	startTime := time.Now()
	//购物接力，不是并发
	//shopping("张三")
	//shopping("王五")
	//shopping("李四")

	//主线程结束，协程会跟着结束
	wait = 3
	go shopping("张三")
	go shopping("王五")
	go shopping("李四")
	for {
		if wait == 0 {
			break
		}
	}
	fmt.Println("购买完成", time.Since(startTime))

}
```

协程写法：

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// 定义信号量，是一种简陋的写法
var wait sync.WaitGroup

func shopping(name string) {
	fmt.Printf("%s 开始买东西\n", name)
	time.Sleep(1 * time.Second)
	fmt.Printf("%s 买完了\n", name)
	//表示协程结束
	wait.Done()

}

// 协程
func main() {
	startTime := time.Now()
	//购物接力，不是并发
	//shopping("张三")
	//shopping("王五")
	//shopping("李四")

	//主线程结束，协程会跟着结束
	//告诉又多少个协程函数需要等待
	wait.Add(3)
	go shopping("张三")
	go shopping("王五")
	go shopping("李四")
	wait.Wait()

	fmt.Println("购买完成", time.Since(startTime))

}

```

最标准写法（不用全局变量）：

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func shopping(name string, wait *sync.WaitGroup) {
	fmt.Printf("%s 开始买东西\n", name)
	time.Sleep(1 * time.Second)
	fmt.Printf("%s 买完了\n", name)
	//表示协程结束
	wait.Done()

}

// 协程
func main() {
	var wait sync.WaitGroup
	startTime := time.Now()
	//购物接力，不是并发
	//shopping("张三")
	//shopping("王五")
	//shopping("李四")

	//主线程结束，协程会跟着结束
	//告诉又多少个协程函数需要等待
	wait.Add(3)
	go shopping("张三", &wait)
	go shopping("王五", &wait)
	go shopping("李四", &wait)
	wait.Wait()

	fmt.Println("购买完成", time.Since(startTime))

}

```

## 3.6 channel 信道

channel 是 goroutine 之间**通信管道**，遵循：**不要通过共享内存通信，通过通信共享内存** 语法：`chan 类型`，分：**无缓冲、有缓冲**

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

var moneyChan = make(chan int) // 无缓冲channel

func pay(name string, money int, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Printf("%s 开始买东西,%d 元\n", name, money)
	time.Sleep(1 * time.Second)
	moneyChan <- money // 把金额送入通道
	fmt.Printf("%s 买完了\n", name)
}

func main() {
	var wg sync.WaitGroup
	startTime := time.Now()
	wg.Add(3)

	go pay("张三", 2, &wg)
	go pay("王五", 3, &wg)
	go pay("李四", 4, &wg)

	// 等所有协程跑完再关channel
	go func() {
		wg.Wait()
		close(moneyChan)
	}()

	// range 读取通道里的钱，如果moneychan信道关闭就自动结束循环
	total := 0
	for v := range moneyChan {
		total += v
		fmt.Println("收到金额：", v)
	}

	fmt.Println("总金额：", total)
	fmt.Println("购买完成", time.Since(startTime))
}

```

 select与协程超时处理：

适用于一个协程多个信道的情况

select就是监听多个信道：

```go
var moneyList []int
var nameList []string

select {
    case money := <-moneychan1:
    moneyList = append(moneyList,money)
    case name :=<- nameChan1:
    nameList = append(nameList,name)
}
```

超时处理：

```go
package main

import (
	"fmt"
	"time"
)

var done = make(chan bool)

func see() {
	fmt.Println("see开始执行")
	time.Sleep(3 * time.Second)
	fmt.Println("see执行完成")
	done <- true
}
func main() {
	go see()
	select {
	case <-done:
		fmt.Println("协程执行完成")
	case <-time.After(4 * time.Second):
		fmt.Println("timeout")
	}
}

```

解释：这里`time.After(d)`返回的是一个`<- chan Time`的只读通道类型，可以直接放在select的case里，创建一个定时器，4秒后往这个通道里发送一个当前时间，通道用完之后会自动关闭

## 4.1 线程安全和sync.Map

并发异常代码（输出为很大的一个数，且每次都不一样）：CPU会吃操作

```go
package main

import (
	"fmt"
	"sync"
)

var sum int

var wait sync.WaitGroup //同步等待

func add() {
	for i := 0; i < 100000; i++ {
		sum++
	}
	wait.Done()
}

func sub() {
	for i := 0; i < 100000; i++ {
		sum--
	}
	wait.Done()
}

func main() {
	wait.Add(2)
	go add()
	go sub()
	wait.Wait()

	fmt.Println(sum)

}

```

此处wait的作用：

- `wg.add(n)`:设置要等待的协程数量
- `wg.Done()`:协程执行完，计数减一
- `wg.Wait()`:主线程阻塞，知道计数为0才往下走

协程安全的写法（上锁）:

```go
package main

import (
	"fmt"
	"sync"
)

var sum int

var wait sync.WaitGroup //同步等待
var lock sync.Mutex

//加锁保证线程安全

func add() {
	lock.Lock()
	for i := 0; i < 100000; i++ {
		sum++
	}
	lock.Unlock()
	wait.Done()
}

func sub() {
	lock.Lock()
	for i := 0; i < 100000; i++ {
		sum--
	}
	lock.Unlock()
	wait.Done()
}

func main() {
	wait.Add(2)
	go add()
	go sub()
	wait.Wait()

	fmt.Println(sum)

}

```

- `lock.lock()`：上锁
- `lock.unlock()`:解锁
- `lock.Trylock()`:返回锁是上了还是没上

## 4.2 异常处理

error是go的一等公民

1 向上抛，将错误交给上级处理

2 中断程序，一般用于初始化，直接终端

3 恢复程序

```go
//向上抛
package main

import (
	"errors"
	"fmt"
)

func div(a, b int) (res int, err error) {
	if b == 0 {
		err = errors.New("divide by zero")
		return
	}
	res = a / b
	return
}

func server() (res int, err error) {
	res, err = div(2, 1)
	if err != nil {
		//把错误向上传递
		return
	}

	//执行其他的逻辑
	res++
	res += 2
	return
}

func main() {
	res, err := server()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res)

}

```

中断程序（只用于初始化异常）：

```go
package main

import (
	"fmt"
	"log"
	"os"
)

func init() {
	//读一个不存在的文件
	_, err := os.ReadFile("1234")
	if err != nil {
		log.Fatal("错误了")
	}
}
func main() {
	fmt.Println("main")
}

```

或者：

```go
package main

import (
	"fmt"
	"os"
)

func init() {
	//读一个不存在的文件
	_, err := os.ReadFile("1234")
	if err != nil {
		panic("错误了")
	}
}
func main() {
	fmt.Println("main")
}

```

异常捕获（捕获我们拿不到的错误）：

```go
package main

import (
	"fmt"
	"runtime/debug"
)
//以下写法正常逻辑仍然会走
//这样写可以找到错误在哪
func read() {
	defer func() {
		err := recover()
		if err != nil {
			fmt.Println(err)
			fmt.Println(string(debug.Stack()))
		}
		
	}()
	var list []int = []int{1,2}
	fmt.Println(list[2])
}



func main() {
	read()
	//下面是正常逻辑

	fmt.Println("正常逻辑")

}

```

```go
//以下代码正常逻辑不会走
package main
import (
	"fmt"
	"runtime/debug"
)

func read() (err any) {
	defer func() {
		err = recover()
		if err != nil {
			fmt.Println(err)
			fmt.Println(string(debug.Stack()))
		}
	}()
	var list []int = []int{1,2}
	fmt.Println(list[2])
	return 
}

func main() {
	e := read()
	if e != nil {
		return // 直接退出main，后面逻辑不走
	}
	fmt.Println("正常逻辑")
}

```

## 5.1泛型

泛型让你写一个函数，支持多种类型，不用重复写 int 版、string 版...

```go
package main

import "fmt"

func plus[T int | uint](n1, n2 T) T {
	return n1 + n2
}
func main() {
	plus(1, 2)
	fmt.Println(plus(1, 2))
	var u1, u2 = uint(1), uint(2)
	fmt.Println(plus(u1, u2))
}

```

如果类型比较多：

可以定义一个接口：

```go
package main

imp

type Number interface {
	uint | uint8 | uint16 | uint32 | uint64
}

func plus[T Number](n1, n2 T) T {
	return n1 + n2
}
func main() {
	plus(1, 2)
	fmt.Println(plus(1, 2))
	var u1, u2 = uint(1), uint(2)
	fmt.Println(plus(u1, u2))
}

```

## 5.2 反射

判断一个变量是不是结构体，切片，map

业务上用不到，但是开发底层框架需要用

```go
package main

import (
	"fmt"
	"reflect"
)

func getType(obj any) {
	t := reflect.TypeOf(obj)
	switch t.Kind() {
	case reflect.String:
		fmt.Println("string")
	case reflect.Struct:
		fmt.Println("struct")
	case reflect.Slice:
		fmt.Println("slice")
	case reflect.Map:
		fmt.Println("map")
	case reflect.Int:
		fmt.Println("int")

	}
}
func main() {
	var a int
	a = 2
	getType(a)
}

```

## 6.1 tcp网络编程

TCP，传输控制协议，面向连接的，可靠的，基于字节流的传输层通信协议

- 三次握手
- 四次挥手

```go
package main

import (
	"fmt"
	"net"
	"time"
)

func main() {
	addr, _ := net.ResolveTCPAddr("tcp", "127.0.0.1:81")

	listen, err := net.ListenTCP("ip4:tcp", addr)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("tcp server bind addr :", addr.String())
	for {
		conn, err := listen.Accept()
		if err != nil {
			break
		}
		fmt.Println(conn.RemoteAddr())
		conn.Write([]byte("hello world"))
		time.Sleep(2 * time.Second)
		conn.Close()

	}

}
```

```go
package main

import (
	"fmt"
	"io"
	"net"
)

func main() {
	conn, err := net.Dial("tcp", "127.0.0.1:8000")
	if err != nil {
		fmt.Println(err)
		return
	}
	for {
		var byteDate = make([]byte, 1024)
		n, err := conn.Read(byteDate)
		if err == io.EOF {
			break
		}
		fmt.Println(string(byteDate[:n]))
	}
}

```

```go
package main

import (
	"fmt"
	"net"
)

func main() {
	conn, err := net.Dial("tcp", "127.0.0.1:8000")
	if err != nil {
		fmt.Println(err)
		return
	}
	for {
		var text string
		fmt.Printf("Enter text: ")
		fmt.Scanln(&text)
		if text == "q" {
			conn.Close()
			break
		}
		conn.Write([]byte(text))

	}
}

```

## 6.2 http网络编程

```go
package main
//服务端
import (
	"fmt"
	"net/http"
)

// 处理器函数：签名固定 func(w http.ResponseWriter, r *http.Request)
func helloHandler(w http.ResponseWriter, r *http.Request) {
	// w：往客户端写响应
	// r：客户端发来的请求信息
	if r.URL.Path != "/hello" {
		http.NotFound(w, r) // 404
		return
	}
	// 写入返回内容
	fmt.Fprintln(w, "hello go http")
}

func main() {
	// 注册路由：访问 /hello 交给 helloHandler 处理
	http.HandleFunc("/hello", helloHandler)

	fmt.Println("server start at :8080")
	// 启动服务，监听 8080，nil 代表使用默认多路复用器 ServeMux
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("listen error:", err)
	}
}

```

```go
//客户端
package main

import (
	"fmt"
	"io"
	"net/http"
)

// 创建服务端
func main() {
	response, err := http.Get("http://www.baidu.com")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer response.Body.Close()
	byteData, _ := io.ReadAll(response.Body)
	fmt.Println(string(byteData))

}

```

或者：

```go
package main

import (
	"fmt"
	"io"
	"net/http"
)

// 客户端
func main() {
	//实例化一个http客户端
	client := new(http.Client)
	//构造请求对象
	req, _ := http.NewRequest("GET", "http://baidu.com", nil)
	//发请求
	res, _ := client.Do(req)
	//获取响应
	b,_ = io.ReadAll(res.Body)
	fmt.Println(string(b))
}

```

## 7.1 项目部署

go的部署很简单，编写完成后，只需要执行go build即可打包为可执行文件

windows下打包就是exe文件，linux下打包就是二进制文件

例如：将hello.go编译为二进制文件：

```cmd
go build hello.go
```

//如果直接go build 就自动编译当前文件夹下的main包，如果有多个main的话就会报错

如果要改名为main.exe

```shell
go build -o main.exe hello.go
```

交叉编译：略，用的时候问ai

