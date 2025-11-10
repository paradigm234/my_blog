---
icon: ri:java-line
date: 2025-11-10
category:
  - 编程
---

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

this是一个变量，可以用在方法中，来拿当前的对象

哪个对象调用这个方法，this就拿到哪个方法，有点像python中的self，

应用场景：解决成员变量与方法内部变量名称冲突的问题

//this.name是对象的name，后面的name是当前函数传入的name

```java
package day05_oop.j20251106;

public class Student {
    String name;
    public void print(){
        System.out.println(this);
        System.out.println(this.name);

    }
    public void printhobby(String name){
        System.out.println(this.name+"的爱好是："+name);
    }
}

```

```java
	package day05_oop.j20251106;

public class Test {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "张三";
        s1.print();
        System.out.println(s1);
        System.out.println("===============");
        Student s2 = new Student();
        s2.name = "李四";
        s2.print();
        System.out.println(s2);
        System.out.println("===============");
        Student s3 = new Student();
        s3.name = "许嵩";
        s3.printhobby("唱歌");
    }
}

```

#### 封装

类就是一种封装，方法也是一种封装

设计思想：==合理隐藏，合理暴露==

如何隐藏：使用private关键字在对象中修饰成员变量，就只能在本类中被访问，外部无法直接访问

如何暴露：使用public修饰get和set方法合理暴露

![image-20251106201812540](/coding_images/image-20251106201812540.png)

需要把成员变量私有起来，通过调用方法get和set变量

#### javabean

是一种特殊类，也叫实体类

1.类中的成员变量必须全部私有，并提供public修饰的getter/setter方法

2.类中需要提供一个无参构造器，有参构造器可选

应用场景：

实体类的对象只负责数据存取，而对数据的业务处理交给其他类的对象来完成，以实现数据和数据业务处理分离。

```java
package day05_oop.j20251106;

public class Test {
    public static void main(String[] args) {
        Student s1 = new Student("18","james","99");
        //创建操作对象，专门对学生对象进行业务处理
        studentservice operate = new studentservice(s1);
        operate.printaveragescore();
        operate.printtotalscore();


    }
}

```

```java
package day05_oop.j20251106;

public class studentservice {
    //提供方法，打印学生总成绩和平均成绩
    private Student s;
    public studentservice(Student s) {
        this.s = s;
    }
    public void printtotalscore(){
        System.out.println(s.getMath());

    }
    public void printaveragescore(){
        System.out.println(s.getAge());

    }

}

```

```java
package day05_oop.j20251106;
//javabean
public class Student {
   //1.私有成员变量
    private String name;
    private String age;
    private String math;


    public Student(String age, String name, String math) {
        this.age = age;
        this.name = name;
        this.math = math;
    }
    //2.提供公开的getter和setter方法

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getMath() {
        return math;
    }

    public void setMath(String math) {
        this.math = math;
    }
}

```



#### static 关键字

静态，可以修饰成员变量和成员方法

静态变量（类的变量）：有static修饰，属于类，在计算机中只有一份，会被类的全部对象共享。

实例变量（对象的变量）：无static修饰，属于每一个对象的

![image-20251106212839973](/coding_images/image-20251106212839973.png)

静态变量应该用类名去.

```java
package day05_oop.j20251106.staticfield;

public class Test {
    //认识static修饰变量
    //1.类名.静态变量
    public static void main(String[] args) {
        student.name = "james";
        System.out.println(student.name);
    //2.对象名.静态变量（）不推荐，不写了
    //3.实例变量 对象名.实例变量(只能这样）
        student s1 = new student();
        s1.age = 19;
        System.out.println(s1.age);
    }


}

```

```java
package day05_oop.j20251106.staticfield;

public class student {
    //静态变量，属于类，只有一份
    static String name;
    //实例变量
    int age;
}

```

如果那类名去访问实例变量，会报错，因为不知道访问那个变量

![image-20251106213834344](/coding_images/image-20251106213834344.png)

应用场景：

- 如果某个数据只需要一份，且希望能够被共享（访问，修改），则数据可以定义为静态变量来记住。比如系统中一共有多少个用户对象
- 若是每个对象都要有一份，数据各不同，则使用实例变量

#### static修饰方法

static 方法是类持有，实例方法属于对象持有

```java
package day05_oop.j20251108;

public class Test {
    public static void main(String[] args) {
        //认识static修饰和不修饰的区别
        Student.printhelloworld();

        Student s1 = new Student();
        s1.printhelloworld();
    }
}

```

```java
package day05_oop.j20251108;

public class Student {
    public static void printhelloworld(){
        System.out.println("Hello,world");
    }
}

```

静态方法用类名和对像都可以访问，实例方法只能用对象访问

如果这个方法只是为了做一个功能，且不需要访问对象的数据，则定义为静态方法。

main方法也是一个静态方法，方便虚拟机直接调用

静态方法的应用场景：创建工具类

工具类中的方法都是一些静态方法，每个方法用来完成一个功能，以便给开发人员直接调用。这样做可以提高代码复用，调用方便，提高效率。

**多学一招：把走早起私有（因为工具类没有创建对象的必要性，私有化不能创建对象）**

#### static注意事项

- 静态方法中可以直接访问静态成员，不可以访问实例成员
- 实例方法中既可以直接访问静态成员，也可以直接访问实例成员
- 实例方法中可以出现this关键字，但是静态方法中不可以出现this关键字

![image-20251108114207278](/coding_images/image-20251108114207278.png)

name不能直接访问，因为是实例变量，如需访问，需要创建对象后.一下，实例方法也一样

![image-20251108114347876](/coding_images/image-20251108114347876.png)

this代表的只能是对象，静态方法无对象，所以不能用this去调用

#### 小项目（电影信息展示）

需求：

- 展示系统重的全部电影信息（每部电影的名称，价格，展示）
- 允许用户用电影编号（id）查询出某个电影的详细信息

目标：

- 使用所学面向对象编程实现以上两个需求

代码：

```java
//test
package day05_oop.j20251108.movie;

public class Test {
    public static void main(String[] args) {
        //1.设置movie类，以便创建电影对象，封装电影数据
        //2、封装系统重的全部电影数据
        movie[] movies = new movie[6];
        movies[0] = new movie(1,"星际穿越",9.6,"安妮海瑟薇");
        movies[1] = new movie(2,"速度与激情8",9.2,"瑞秋费尔南多");
        movies[2] = new movie(3,"夏洛特烦恼",9.5,"沈腾");
        movies[3] = new movie(4,"战狼2",9.1,"吴京");
        movies[4] = new movie(5,"让子弹飞",9.9,"姜文");
        movies[5] = new movie(6,"暗战",9.4,"张家辉");
        //3.定义电影操作对象，专门对电影惊醒业务操作
        movieoperateor mo = new movieoperateor(movies);
        mo.printallmovies();
        mo.searchmoviebyId();




    }
}

```

```java
//movie
package day05_oop.j20251108.movie;

public class movie {
    private int id;
    private String name;
    private double price;
    private String actor;
    //定义有参构造器
    public movie(){

    }
    public movie(int id,String name,double price,String actor){
        this.id = id;
        this.name = name;
        this.price = price;
        this.actor = actor;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }



}

```

```java
//movieoperator
package day05_oop.j20251108.movie;

import java.util.Scanner;

public class movieoperateor {
    private  movie[] movies;//记录一个数组
    public movieoperateor(movie[] movies){
        this.movies = movies;
    }



    //查询电影
    public void searchmoviebyId() {
        System.out.println("请输入要查询的电影id：");
        Scanner sc = new Scanner(System.in);
        for(int i = 0;i < movies.length;i++) {
            movie m = movies[i];
            int id = sc.nextInt();
            if (m.getId() == id) {
                System.out.println(m.getId() + "\t" + m.getName() + "\t" + m.getPrice() + "\t" + m.getActor() + "\t" );
                return;
            }
            System.out.println("没有找到该电影");
        }

    }
    //打印所有电影

    public void printallmovies() {
        for (int i=0; i < movies.length; i++){
            movie m = movies[i];
            System.out.println(m.getId() + "\t" + m.getName() + "\t" + m.getPrice() + "\t" + m.getActor() + "\t" );
        }
    }
}

```

### 面向对象高级

#### 继承

##### 继承概念

- 提高代码重用星，减少重复代码的书写
- java中提供关键字extends，用这个关键字，可以让一个类和另一个类创建父子关系，进行继承

代码：



```java
package day05_oop.j20251108.extendsdemo;

public class Test {
    public static void main(String[] args) {
        //认识继承的好处
        //子类可以继承父类的非私有成员
        //子类对象其实是由子类和父类多张设计图共同创建
        Teacher t = new Teacher();
        t.setName("jhwang");
        t.setSkill("sleep");
        t.setSex('m');
        System.out.println(t.getName());
        System.out.println(t.getSkill());
        System.out.println(t.getSex());


    }
}

```

```java
package day05_oop.j20251108.extendsdemo;

public class People {
    private String name;
    private char sex;

    public char getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}

```

```java
package day05_oop.j20251108.extendsdemo;
//继承父类的子类
public class Teacher extends People {
    private  String skill;

    public   String getSkill(){
        return skill;
    }
    public void setSkill(String skill){
        this.skill = skill;
    }


}

```

```java
package day05_oop.j20251108.extendsdemo;
//咨询师类，子类
public class consultant {
    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    private int number;
}

```

##### 权限修饰符

共四种

- `private`：只能本类
- `缺省`：本类，同一个包中的类
- `protected`:本类，同一个包中的类，子孙类（不同包的子类通过继承关系访问）中
- `public`：任意位置

![image-20251108144209755](/coding_images/image-20251108144209755.png)

成员变量：一般private

方法：一般public

缺省和protected看情况，大部分情况不咋用

##### 继承的特点

- java是单继承模式，一个类只能继承一个直接父类
- java不支持多继承，但是支持多层继承
- java中所有的类都是object类的子类
- 优先访问自己类中，自己类中没有才会访问父类

![image-20251108144650863](/coding_images/image-20251108144650863.png)

![image-20251108145002576](/coding_images/image-20251108145002576.png)

就近原则：

- 子类局部范围找，然后子类成员范围找，然后父类成员范围找，如果父类范围还没有，就报错。
- 如果子父类中出现了重名的成员，会优先使用子类的，如果此时一定要在子类中使用父类的成员方法/变量，可以使用super关键字，用super.父类成员变量/父类成员方法

![image-20251108145931228](/coding_images/image-20251108145931228.png)

##### 方法重写

- 当子类觉得父类中的某个方法不好用时，或者无法满足自己的需求，子类可以重写一个**方法名，参数列表一样**的方法，去覆盖父类的方法。
- 写完后再调，优先调子类（就近原则）
- 可以加上@Override注解
- 子类重写父类方法时，访问权限必须大于或等于父类该方法的权限
- 重写的方法返回值类型，必须与被重写的返回值类型一样，或者范围更小
- 私有方法、静态方法不能被重写，如果重写会报错。
- ==声明不变，重新实现==

方法重写应用场景

- 子类重写Object类的toString方法，以便于返回对象的内容
- 子类构造器可以通过调用父类构造器，把对象中包含父类这部分的数据先进行初始化赋值
- 再回来把对象里包含子类这部分的数据也进行初始化赋值

```java
package day05_oop.j20251108.extendsdemo;
//继承父类的子类
public class Teacher extends People {
    private  String skill;
    public  Teacher(String name,String skill,char sex){
        //子类构造器调用父类构造器的应用场景
        //可以把子类继承自父类这部分的数据也完成初始化赋值
       super(name,sex);//调用父类的有参构造器，初始化
        this.skill = skill;
        
    }

    public   String getSkill(){
        return skill;
    }
    public void setSkill(String skill){
        this.skill = skill;
    }


}
```

```java
package day05_oop.j20251108.extendsdemo;

public class People {
    private String name;
    private char sex;
    public People(){

    }
    public People(String name,char sex){
        this.name = name;
        this.sex = sex;
    }

    public char getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
```

##### this（）调用兄弟构造器

- 在任意累的构造器中，可以通过this(...)去调用该类的其他构造器
- this、super都只能放在构造器第一行，所以有了this就不能写super了

#### 多态

##### 认识多态

- 多态是在继承/实现情况下的一种现象，表现为：对象多态、行为多态

```java
package day05_oop.j20251108.duotai;

public class test {
    //认识多态
    public static void main(String[] args) {
        //1.对象多态
        animal a1 = new Wolf();
        animal a2 = new totoise();
        //2.方法多态
        a1.run();
        a2.run();//编译看左边，运行看右边

    }
}
```

```java
package day05_oop.j20251108.duotai;

public class totoise extends animal{
    @Override
    public void run(){
        System.out.println("乌龟跑的很慢");

    }
}
```

```java
package day05_oop.j20251108.duotai;

public class Wolf extends animal {
    @Override
    public void run(){
        System.out.println("狼跑的很快");
    }

}
```

**多态的前提**：

- 有继承/实现关系
- 存在父类应用子类对象
- 存在方法重写

**注意事项**：

- 多态是对象、行为的多态，java中的成员变量不存在多态的概念

**多态的好处**：

- 在多态形式之下，右边对象是解耦合的，方便扩展和维护。
- 定义方法时，使用父类类型的形参，可以接收一切子类对象，扩展性更强，更加便利。

```java
package day05_oop.j20251108.duotai;

public class test {
    //认识多态
    public static void main(String[] args) {
        //1.对象多态
        animal a1 = new Wolf();
        animal a2 = new totoise();
        //2.方法多态
        a1.run();
        a2.run();//编译看左边，运行看右边
        Wolf w = new Wolf();
        go(w);

        totoise t = new totoise();
        go(t);

    }
    public static void go(animal a){
        System.out.println("+++start+++");
        a.run();

    }
}
```

==因为编译看左边，运行看右边，所以多态无法调用子类独有功能！==

##### 多态的类型转换

- 自动类型转换：父类 变量名 = new 子类()`People p = new Teacher();`
- 强制类型转换：子类  变量名 = （父类）父类变量 `Teacher t = (Teacher)p`
  - 有继承关系就能强制转换，编译阶段不会报错，但是运行阶段会报错

![image-20251109151527836](/coding_images/image-20251109151527836.png)

==强制转换建议：使用instanceof关键字判断当前对象的真实类型，在进行强转==

#### 实战小项目

![image-20251110200546406](/coding_images/image-20251110200546406.png)

```java
package j20251110;

import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        //目标：加油站致富小程序
        //1.创建卡片类，以便创建金卡或者银卡对象，封装车主数据。
        //2.定义卡片父类，Card，定义共同属性方法
        //3。定义金卡类,金卡要重写消费方法
        //4.创建金卡对象，交给独立业务（支付机），存款消费
        goldcard gc = new goldcard("jhwang","123456",5000.0,"123456789");
        pay(gc);
        //5.创建银卡对象，交给独立业务（支付机），存款消费
        slivercard sc = new slivercard("xbzhong","123456",1000.0,"123456789");
        pay(sc);
    }
    //支付机，用一个方法创建
    public static void pay(Card c){
        System.out.println("请刷卡");
        Scanner sc = new Scanner(System.in);
        double money = sc.nextDouble();
        c.consume( money);
    }
}
```

```java
package j20251110;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//lombook技术
@Data // 自动生成getter和setter方法
@AllArgsConstructor // 自动生成全参构造方法
@NoArgsConstructor// 自动生成无参构造方法
public class Card {
    private String carId;
    private String name;
    private double money;
    private String phone;

    //预存金额
    public void deposit(double money) {
        this.money += money;
    }

    // 消费金额
    public void consume(double money) {
        this.money -= money;
    }
}
```

```java
package j20251110;

public class goldcard extends Card {

    public goldcard(String carId, String name, double money, String phone){
        super(carId,name,money,phone);//调用父类构造器
    }

    @Override
    public void consume(double money){
        System.out.println("您当前消费"+money);
        System.out.println("优惠后的价格" + money*0.8);
        if(getMoney()< money * 0.8){
            System.out.println("您的余额是"+getMoney());
            System.out.println("余额不足，请充值");
        }
        setMoney(getMoney()-money*0.8);
        System.out.println("您当前余额是"+getMoney());
        //判断是否大于200，调用独有功能，打印洗车票
        if(money*0.8>=200){
            printwashticket();
        }else{
            System.out.println("您没有洗车票");
        }

    }
    public void printwashticket(){
        System.out.println("您有一张洗车票");
    }


}
```

```java
package j20251110;

public class slivercard extends Card{
    public slivercard(String carId,String name,double money,String phone){
        super(carId,name,money,phone);
    }
    @Override
    public void consume(double money){
        System.out.println("您当前消费"+money);
        System.out.println("优惠后的价格" + money*0.9);
        setMoney(getMoney()-money*0.9);
        System.out.println("您当前还剩"+getMoney());

    }
}
```
