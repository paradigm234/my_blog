# JAVA基础

## 前言

java能做什么：大数据云计算、移动端app开发、桌面引用开发、游戏开发、移动端app开发、企业服务器端软件开发（最主流，90%必用java）

三大技术平台：javaSE（标准版）、javaEE（企业版）、javaME（小型版）

JVM：java虚拟机，真正运行java程序的地方

JRE：java的运行环境

java/javac：编译

## 基础语法

### 数据类型

整型、浮点型、字符型、布尔型

int、double、char、boolen、str用的最多

### 关键字和标识符

关键字：public/class/int/float/void....

标识符：是程序员用来命名程序元素的名称，这些程序元素包括变量、方法、类、包、接口、常量等。组成字符

==规则==：

可以包含字母（A-Z, a-z）
可以包含数字（0-9）
可以包含下划线（_）
可以包含美元符号（$）
首字符限制：
==不能以数字开头==
必须以字母、下划线（_）或美元符号（$）开头
关键字限制：
不能使用Java关键字（如 int、class、public 等）作为标识符
大小写敏感：
Java是大小写敏感的语言，myVariable 和 myvariable 是不同的标识符

### 方法

1.在方法不返回值（void）的方法中写return，则会提前结束方法。

2.强制转换变量类型

```java
int i=20;
byte j=(byte)i
```

**从键盘输入一个值，java程序进行接收**

```java
import java.util.Scanner;
public static void printUserInfo(){
    Scanner sc=new Scanner(System.in);//创建对象
    System.out.println("请输入用户名");
    Sting username=sc.next();
    System.out.println("请输入年龄：");
    int age=sc.nextInt();
    System.out.println("您叫"+username,"您的年龄是"+age);
}
```

### 运算符

“+”在java中有连接符的作用

区分连接符和运算：**能加则加，不能加就是连接符**

扩展赋值运算符自带强制转换类型的功能

## 实战练习

### **BMI_BMR实战代码：**

```java
import java.util.Scanner;

public class BMI_BMR {
    public static void main(String[] args){
        double[] userinfo=getUserInfo();
        double height = (double) userinfo[0];
        double weight = (double) userinfo[1];
        int age = (int) userinfo[2];
        int sex = (int) userinfo[3];

        double BMI=getBMI(height,weight);
        System.out.println("BMI指数为："+BMI);
        if(isNormalBMI(BMI))
            System.out.println("BMI指数正常");
        else
            System.out.println("BMI指数不正常");

        double BMR=getBMR(weight,height,age,sex);
        System.out.println("BMR指数为："+BMR);

    }
    //用户输入身高体重年龄性别
    public static double[] getUserInfo(){
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入身高(单位：米)：");
        double height = sc.nextDouble();
        System.out.println("请输入体重（单位：千克）");
        double weight = sc.nextDouble();
        System.out.println("请输入年龄：");
        int age = sc.nextInt();
        System.out.println("请输入性别（1：男，2：女）：");
        int sex = sc.nextInt();
        return new double[]{height,weight,age,sex};
    }
    //计算BMI指数
    public static double getBMI(double height,double weight){
        double bmi = 10000*weight/(height*height);
        return bmi;
    }
    //判断BMI指数是否正常
    public static boolean isNormalBMI(double bmi){
        if(bmi >= 18.5 && bmi <= 24.9){
            return true;
        }else{
            return false;
        }
    }
    //计算BMR指数
    public static double getBMR(double weight,double height,int age,int sex){
        double bmr;
        if(sex == 1){
            bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
        }else{
            bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
        }
        return bmr;
    }
}

```

### **计算器实战**

```java
import java.util.Scanner;

public class calculater {
    public static void main(String[] args) {
        int[] num = receive();
        int a=num[0];
        int b=num[1];
        System.out.println("请输入您要进行的运算");
        System.out.println("1.加法");
        System.out.println("2.减法");
        System.out.println("3.乘法");
        System.out.println("4.除法");
        //接收用户输入运算符
        Scanner sc = new Scanner(System.in);
        char op = sc.next().charAt(0);
        switch (op){
            case '1':
                System.out.println(add(a,b));
                break;
            case '2':
                System.out.println(sub(a,b));
                break;
            case '3':
                System.out.println(mul(a,b));
                break;
            case '4':
                System.out.println(div(a,b));
                break;
            default:
                System.out.println("输入错误");
                break;
        }
    }
    public static int[] receive(){
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入两个数字：");
        int a = sc.nextInt();
        int b = sc.nextInt();
        return new int[]{a,b};
    }
    public static int add(int a,int b){
        return a+b;
    }
    public static int sub(int a,int b){
        return a-b;
    }
    public static int mul(int a,int b){
        return a*b;
    }
    public static int div(int a,int b){
        return a/b;
    }
}

```

### guess_the_number实战

```java
import java.util.Scanner;

public class guess_the_number {
    public static void main(String[] args) {
        // 生成1-100的随机数
        int number = (int)(Math.random()*100+1);

        Scanner scanner = new Scanner(System.in);
        int guess = 0;  // 初始化guess变量

        // 循环直到猜中为止
        while (guess != number) {
            System.out.println("请输入猜测的数字（1-100）：");
            guess = scanner.nextInt();

            if (guess > number) {
                System.out.println("您输入的数字太大了！");
            } else if (guess < number) {
                System.out.println("您输入的数字太小了！");
            } else {
                System.out.println("恭喜您，猜对了！答案就是：" + number);
            }
        }

        scanner.close();  // 关闭Scanner资源
    }
}

```

## 数组

#### 1.静态数组

```java
String[] names={"张三","李四"....}
```

```java
int index=(int)(Math.random()*name.length)
```

随机点名程序

```java
public class number_group {
    public static void main(String[] args) {
        //我是一个java开发初学者，帮我开发一个随机点名的功能，利用数组，共有15名学生
        String[] students = {"小王","小李","小张","小赵","小钱","小孙","小李","小吴","小汤","小钟","小黄","小吕","小付","小傅"};
        int index = (int)
        //随机生成数组索引    
        (Math.random()*students.length);
        System.out.println(students[index]);
    }
}

```

#### 2.动态初始化数组

 eg：班级8名学生，录入成绩，输出最高分，最低分，平均分

```java
import java.util.Scanner;

public class dynamic_num_group {
    public static void main(String[] args) {
        double[] scores = new double[8];
        //录入学生成绩
        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < scores.length; i++) {
            System.out.println("请输入第" + (i + 1) + "个学生的成绩：");
            scores[i] = sc.nextDouble();

        }
        //遍历数组，求最高分和最低分以及平均分
        double allscore=0.0;
        for (int i = 0; i < scores.length; i++){
            allscore += scores[i];
        }
        System.out.println("平均分是：" + allscore / scores.length);
    }
}


```

**斗地主的案例：**

```java
public class doudizhu {
    public static void main(String[] args) {
        //目标：完成斗地主的做牌和洗牌
        Start();
    }
    public static void Start(){
        //做牌
        String[] poker=new String[54];

        //准备四种花色还有点数，再开始存入数组
        String[] colors={"♠","♥","♣","♦"};
        String[] numbers={"A","2","3","4","5","6","7","8","9","10","J","Q","K"};
        //先遍历点数，再遍历花色
        int index=0;
        for (int i = 0; i < numbers.length; i++){
            for (int j = 0; j < colors.length; j++){
                poker[index]=colors[j]+numbers[i];
                index++;
            }
        }
        poker[index]="🃏";
        poker[index+1]="🃏";
        System.out.println("新牌");
        for (int i = 0; i < poker.length; i++){
            System.out.print(poker[i]+" ");
        }
        System.out.println();
        shuffle(poker);
    }
    public static void shuffle(String[] poker){
        //洗牌
        for (int i = 0; i < poker.length; i++){
            int j=(int)(Math.random()*poker.length);
            //交换i和 j的牌
            String temp=poker[i];
            poker[i]=poker[j];
            poker[j]=temp;
        }
        System.out.println("洗牌后的牌");
        for (int i = 0; i < poker.length; i++){
            System.out.print(poker[i]+" ");
        }
    }
}

```

#### 3.二维数组

定义

```java
String[][] calssroom{
    {}，
    {},
    {},
    ...
}
```

访问：

`a[2][2]`访问的是第二个数组的第二个元素

`a.length`访问的是行数 `a[2].length`访问的是第三个数组的长度

遍历：嵌套两个循环。

## **面相对象编程**

对象：一种特殊的数据结构，可以用来记住一个事物的数据，从而代表该事物（类似于c语言的结构体）

```java
public class Star{
    String names;
    int age;
    double height;
    double weight;
}
```

万物皆对象，谁的数据谁存储

```java
public class 类名{
    1.变量，用来说明对象可以处理说明数据
    2.方法，描述对象有什么功能，也就是可以对数据进行什么处理
}
```

### 类的基本语法

#### 构造器

是一种特殊的方法，不能写返回值类型，名称必须是类名。创建对象时，对象会自动调用构造器

作用：在创建对象时，同时完成对对象的赋值

```java
public class student {
    String name;
    int age;
    char sex;
    public student(){
        System.out.println("无参构造方法");
    }
    public student(String n,int a,char s){
        name = n;
        age = a;
        sex = s;

        System.out.println("有参构造方法");
    }
}
public class test {
    public static void main(String[] args) {
        student s1 = new student();

        System.out.println("**********");
        student t1 = new student();
        t1.name="慎平";
        t1.age=18;
        t1.sex='男';
        System.out.println(t1.name + " " + t1.age + " " + t1.sex);
        student t2 = new student("张三",18,'男');
        System.out.println(t2.name + " " + t2.age + " " + t2.sex);
    }
}
```

创建对象时，对象会自动调用构造器，可以立即做一些通用操作，简化代码。

注意事项：

1.类自带了一个无参构造器

2.如果为类定义了有参构造器，类默认的无参构造器就没有了（会被覆盖），此时如果还想用无参构造器，就必须自己手写一个无参构造器出来。

#### this关键字

