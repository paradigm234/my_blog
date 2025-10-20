# Data Structure

## 线性表

#### 顺序存储（顺序表）

![image-20250907141908877](/coding_images/image-20250907141908877.png)

##### 初始化/定义顺序表

1.静态分配

```c
#define MaxSize 10
typedef struct{
    ElemType data[MaxSize];
    int length;
}Sqlist;
```

具体代码：

```c
/*对顺序表进行初始化(静态分配）
*/
#include<stdio.h>
#define MaxSize 10
typedef struct{
    int data[MaxSize];
    int length;

}sqlist; 


//初始化一个顺序表
void Initlist(sqlist L){
    for(int i=0;i<MaxSize;i++)
        L.data[i]=0;
    L.length=0;
}d

int main(){
    sqlist L;//声明顺序表，可以吧sqlist当成自己定义的数据类型
    Initlist(L);
    return 0;
}

```

2.动态分配

malloc 函数 动态申请和释放内存空间 申请一整片的存储空间

详细代码：

```c
#include<stdio.h>
#include<stdlib.h>  // 添加这个头文件

#define InitSize 10

typedef struct{
    int *data;
    int MaxSize;
    int length;
} Sqlist;

// 初始化顺序表
void Initlist(Sqlist *L){  // 使用指针传递
    L->data = (int *)malloc(InitSize * sizeof(int));
    if(L->data == NULL) {  // 检查内存分配是否成功
        printf("内存分配失败\n");
        return;
    }
    L->length = 0;
    L->MaxSize = InitSize;
}

// 增加动态数组的长度
void IncreaseSize(Sqlist *L, int len){  // 使用指针传递
    int *p = L->data;
    L->data = (int *)malloc((L->MaxSize + len) * sizeof(int));
    if(L->data == NULL) {  // 检查内存分配是否成功
        printf("内存分配失败\n");
        L->data = p;  // 恢复原来的指针
        return;
    }
    for(int i = 0; i < L->length; i++){
        L->data[i] = p[i];
    }
    L->MaxSize = L->MaxSize + len;  // 修正拼写错误
    free(p);  // 释放原来的内存
}

// 主函数
int main(){
    Sqlist L;
    Initlist(&L);        // 传递地址
    IncreaseSize(&L, 5); // 传递地址
    return 0;
}

```

类型强制转换：malloc返回的必须是（通用指针）所以这里的（int*）是强制转换类型

顺序表的特点：

1.随机访问，可以找到第i个元素

2.存储密度高，每个节点只存储数据元素

3.拓展容量不方便（静态不行，动态麻烦）

4.增删改查不方便

![image-20250907155119201](/coding_images/image-20250907155119201.png)

##### 顺序表的操作（crud）

①插入

```c
/*顺序表的基本操作-插入
*/
#define MaxSize 10
typedef struct{
    int data[MaxSize];
    int length;

}sqlist;
void ListInsert(sqlist *L,int i,int e){
    for(int j=L->length;j>=i;j--)
        L->data[j]=L->data[j-1];
    L->data[i-1]=e;
    L->length++;
}
void Initlist(sqlist *L){
    for(int i=0;i<MaxSize;i++)
        L->data[i]=0;
    L.length=0;
}
int main(){
    sqlist *L;
    Initlist(*L);
    //插入代码
    ListInsert(L,3,3);
    return 0;
}
```

插入成功与否反馈：

![image-20250908183833273](/coding_images/image-20250908183833273.png)

 分析时间复杂度：应该关注最深层循环语句的执行次数与问题规模N的关系

i=1：O（n）i=n+1:O（1）

则平均循环次数（数学期望）=n/2

②删除

```c
#include<stdio.h>
#include<stdbool.h>  // 添加布尔类型支持

#define MaxSize 10

typedef struct{
    int data[MaxSize];
    int length;
} sqlist;

// 删除操作
bool ListDelete(sqlist *L, int i, int *e){
    if(i < 1 || i > L->length) {
        return false;
    }

    *e = L->data[i-1];  // 将删除的元素值存入e

    for(int j = i; j < L->length; j++) {
        L->data[j-1] = L->data[j];
    }
    L->length--;

    return true;
}

// 初始化顺序表
void Initlist(sqlist *L){
    for(int i = 0; i < MaxSize; i++)
        L->data[i] = 0;
    L->length = 0;
}

int main(){
    sqlist L;           // 声明结构体变量
    Initlist(&L);       // 传递地址

    int e;
    if (ListDelete(&L, 5, &e)) {
        printf("删除成功！删除的元素是: %d\n", e);
    } else {
        printf("删除的位置不合法，删除失败\n");
    }

    return 0;
}

```

时间复杂度和插入操作类似 平均：O（n-1/2）

![image-20250908191718826](/coding_images/image-20250908191718826.png)

③查找操作

按位查找

```c
Elemtype GetElem(sqlist *L,int i){
    return L->data[i-1];
}
```

按值查找

```c
#include<stdio.h>
#include<stdlib.h>  // 添加malloc和free函数头文件

#define MaxSize 100  // 定义最大容量

typedef struct {
    int *data;       // 指向动态分配数组的指针
    int MaxSize;     // 顺序表的最大容量
    int length;      // 顺序表的当前长度
} SqList;

// 在顺序表L中查找第一个元素值等于e的元素，并返回其位序
int LocateElem(SqList L, int e) {
    for(int i = 0; i < L.length; i++) {
        if(L.data[i] == e) {
            return i + 1;  // 返回位序（从1开始）
        }
    }
    return 0;  // 未找到，返回0
}

// 初始化顺序表的辅助函数
void InitList(SqList *L) {
    L->data = (int*)malloc(MaxSize * sizeof(int));
    if(L->data == NULL) {
        printf("内存分配失败\n");
        return;
    }
    L->MaxSize = MaxSize;
    L->length = 0;
}

// 主函数示例
int main() {
    SqList L;
    InitList(&L);
    
    // 假设已经插入了一些元素
    L.data[0] = 1;
    L.data[1] = 2;
    L.data[2] = 3;
    L.length = 3;
    
    int result = LocateElem(L, 2);
    if(result != 0) {
        printf("找到元素，位序为: %d\n", result);
    } else {
        printf("未找到元素\n");
    }
    
    free(L.data);  // 释放动态分配的内存
    return 0;
}
```

时间复杂度： 最好O（1）最差O（n）平均（n+1/2) O(n)

#### 单链表

 ![image-20250908195138682](/coding_images/image-20250908195138682.png)

优点：不需要大片连续空间（指针控制）

缺点：不可随机存取，要耗费一定空间存放指针

##### 初始化/定义单链表

typedef：数据类型重命名

![image-20250908200118262](/coding_images/image-20250908200118262.png)

![image-20250908200224580](/coding_images/image-20250908200224580.png)

L：指向头指针的指针（地址A）
*L：头指针本身（地址B）
(*L)->next：第一个数据节点（地址C）

==`typedef` 的作用是**为已有类型定义 “新的名称”**，让代码更简洁。这里给 `struct LNode` 起了两个别名：==

- `LNode`：直接作为 “`struct LNode` 结构体类型” 的别名；
- `*LinkList`：作为 “`struct LNode *`（指向 `LNode` 结构体的指针类型）” 的别名。

LNode*和LinkList本质上是一样的，只是linklist更强调这是一个单链表

前者强调这是一个结点

初始化：

1.不带头结点的单链表

```c
#include<stdio.h>
#include<stdlib.h>  // 添加malloc和free函数头文件

// 定义数据类型（假设ElemType为int）
typedef int ElemType;

// 定义单链表节点结构体
typedef struct LNode{
    ElemType data;           // 存储数据元素
    struct LNode *next;      // 指向下一个节点的指针
}LNode, *LinkList;

// 初始化一个空的单链表
bool InitList(LinkList *L) {
    *L = NULL;  // 将链表头指针置为空
    return true;
}

// 测试函数
void test() {
    LinkList L;  // 声明一个指向单链表的指针
    InitList(&L);  // 初始化链表
    
    // 后续代码...
    
    // 使用完后记得释放内存
    // free(L);  // 注意：这里需要遍历并释放所有节点
}

```

2.带头结点

```c
#include<stdio.h>
#include<stdlib.h>  // 添加malloc和free函数头文件

// 定义数据类型（假设ElemType为int）
typedef int ElemType;

// 定义单链表节点结构体
typedef struct LNode{
    ElemType data;           // 存储数据元素
    struct LNode *next;      // 指向下一个节点的指针
}LNode, *LinkList;

// 初始化一个带头结点的单链表
bool InitList(LinkList *L) {
    // 分配一个头结点
    *L = (LNode*)malloc(sizeof(LNode));
    
    // 检查内存分配是否成功
    if(*L == NULL) {
        printf("内存分配失败\n");
        return false;
    }
    
    // 头结点的next指针指向NULL，表示空表
    (*L)->next = NULL;
    
    return true;
}

// 测试函数
void test() {
    LinkList L;  // 声明一个指向单链表的指针
    InitList(&L);  // 初始化链表
    
    // 后续代码...
    
    // 使用完后记得释放内存
    // free(L);  // 注意：这里需要遍历并释放所有节点
}

```

不带头结点比较麻烦，头结点指向的下一个结点不存放数据

##### 单链表的操作（crud）

①安位序插入

```c
/*单链表按位序插入操作
*/
#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>
bool ListInsert(LinkList &L,int i,ElemType e){
    if(i<1)
        return false;
    LNode *p;
    int j=0;
    p=L;
    while(p!=NULL && j<i-1){
        //找到要插入的地方
        p=p->next;
        j++;
    }
    if(P==NULL)
        return false;
    LNode *s = (LNode*)malloc(sizeof(LNode));
    s->data = e;
    s->next = p->next;
    p->next = s; 
    return true;
}
typedef struct LNode{
    ElemType data;
    struct LNode *next;
}LNode,*Linklist;
```

平均时间复杂度：O（n）

若不带头结点，则要对i=1进行特殊处理（要更改头指针的指向）

```c
bool ListInsert(LinkList &L,int i,ElemType e){
    if(i<1)
        return false;
    if(i==1){//特殊处理
        LNode *s = (LNode*)malloc(sizeof(LNode));
        s->data = e;
        s->next=L;
        L=s;
        return true;
    }
    LNode *p;
    int j=1;//改为1
    p=L;
    while(p!=NULL && j<i-1){
        //找到要插入的地方
        p=p->next;
        j++;
    }
    if(P==NULL)
        return false;
    LNode *s = (LNode*)malloc(sizeof(LNode));
    s->data = e;
    s->next = p->next;
    p->next = s; 
    return true;
}
```

前插：循环查找p的前驱结点q，对q进行后插

![image-20250909105607899](/coding_images/image-20250909105607899.png)

狸猫换太子：申请一个新的节点，将p的数据复制进来，然后后插到p的后面，再将要插入的e数值赋值给p，相当于新节点现在是p节点，p节点现在是插入的前驱节点--妙！

```c
bool InsertPriorNode(LNode *p,LNode *s){
    if(p==NULL||s==NULL)
        return false;
    s->next=p->next;
    p->next=s;
    ElemType temp=p->data;
    p->data=s->data;
    s->data=temp;
    return true;
}

```

②删除

和插入大体类似

```c
/*删除单链表指定节点
*/
#include <stdio.h>
#include <stdlib.h>

// 定义数据类型（假设 ElemType 为 int）
typedef int ElemType;

// 链表结点结构体定义
typedef struct LNode {
    ElemType data;           // 存储数据
    struct LNode *next;      // 指向下一个结点的指针
} LNode, *LinkList;

// 函数：删除单链表中第 i 个结点（i 从 1 开始计数）
bool ListDelete(LinkList &L, int i, ElemType &e) {
    if (i < 1) {
        return false;  // 参数非法
    }

    LNode *p;           // p 指向当前扫描到的结点
    int j = 0;          // 记录当前 p 所在位置（从 0 开始）

    p = L;              // 初始时 p 指向头结点（不存数据）

    // 循环找到第 i-1 个结点
    while (p != NULL && j < i - 1) {
        p = p->next;
        j++;
    }

    // 如果 p 为空，说明 i 值超出范围
    if (p == NULL) {
        return false;
    }

    // 如果 p 的下一个结点为空，说明第 i 个结点不存在
    if (p->next == NULL) {
        return false;
    }

    // 令 q 指向要删除的结点
    LNode *q = p->next;

    // 将 e 返回被删除结点的数据值
    e = q->data;

    // 断开链接
    p->next = q->next;

    // 释放内存
    free(q);

    return true;  // 删除成功
}

```

指定结点的删除：

```c
//删除指定节点
bool DeleteNode(LNode *p){
    if(p==NULL)
        return false;
    LNode *q=p->next;//q是做了一个标记
    p->data=p->next->data;
    p->next=q->next;
    free(q);
    return true;
}
```

③查找

1.按位查找

```c
bool GetElem(LinkList &L,int i,ElemType e){
    if(i<0)
        return false;
    LNode *p;
    int j=0;
    p=L;
    while(p!=NULL && j<i){
        p=p->next;
        j++;
    }
    return p;
}
```

2.按值查找

```c
LNode *LocateElem(Linklist L,ELemType e){
    LNode *p = L->next;
    while(p!=NULL&&p->next!=e)
        p=p->next;
    return p;
}
```

3.求单链表的长度

```c
int Length(Linklist L){
    LNode *p=L;
    while(p->next!=NULL){
        p=p->next;
        len++;
    }
    return len;
}
```

##### 单链表的建立：尾插法和头插法

①尾插法

![image-20250909164031985](/coding_images/image-20250909164031985.png)

```c
/**尾插法头插法建立单链表
*/
//尾插法
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构体
typedef struct LNode {
    int data;           // 数据域
    struct LNode *next; // 指针域
} LNode, *LinkList;

// 尾插法建立单链表
LinkList List_TailInsert(LinkList L) {
    int x;
    L = (LinkList)malloc(sizeof(LNode)); // 创建头结点
    L->next = NULL;                      // 初始化头结点的 next 为空

    LNode *s, *r = L;                    // r 指向当前最后一个节点（初始为头结点）
    scanf("%d", &x);                     // 输入第一个数据

    while (x != 9999) {                  // 输入 9999 表示结束
        s = (LNode *)malloc(sizeof(LNode)); // 分配新节点
        s->data = x;                      // 存储数据
        r->next = s;                      // 将新节点链接到链表末尾
        r = s;                            // 更新 r 指向新的尾节点
        scanf("%d", &x);                  // 继续输入下一个数据
    }
    r->next = NULL;                       // 最后一个节点的 next 置空
    return L;
}

// 打印链表（辅助函数）
void PrintList(LinkList L) {
    LNode *p = L->next; // 跳过头结点
    printf("链表内容: ");
    while (p != NULL) {
        printf("%d ", p->data);
        p = p->next;
    }
    printf("\n");
}

// 主函数测试
int main() {
    LinkList L = NULL;
    printf("请输入数据（输入9999结束）:\n");
    L = List_TailInsert(L);
    PrintList(L);
    return 0;
}

```

尾插法顺序

==指针域的本质：在结构体中存放下一个结点的地址值==

2.头插法

```c
//头插法
LinkList List_HeadInsert(Linklist L){
    LNode *s;
    int x;
    L=(LinkList)malloc(sizeof(LNode));
    L->next=NULL;//必须要，不然就是野指针了
    scanf("%d",&x)
    while(x!=9999){
        s=(LNode*)malloc(sizeof(LNode));
        s->data=x;
        s->next=L->next;
        L->next=s;
        scanf("%d",&x);
    }
    return L;
}
```

头插法逆序插入

==逆置时考虑头插法！！！！==

```c
//逆置链表（完全自己写的！！！）
/**给定单链表，将其数据进行逆置
*/
#include<stdio.h>
#include<stdlib.h>
typedef struct LNode{
    int data;
    struct LNode *next;
}LNode, *LinkList;
// 尾插法建立单链表
LinkList List_TailInsert(LinkList L) {
    int x;
    L = (LinkList)malloc(sizeof(LNode)); // 创建头结点
    L->next = NULL;                      // 初始化头结点的 next 为空

    LNode *s, *r = L;                    // r 指向当前最后一个节点（初始为头结点）
    scanf("%d", &x);                     // 输入第一个数据

    while (x != 9999) {                  // 输入 9999 表示结束
        s = (LNode *)malloc(sizeof(LNode)); // 分配新节点
        s->data = x;                      // 存储数据
        r->next = s;                      // 将新节点链接到链表末尾
        r = s;                            // 更新 r 指向新的尾节点
        scanf("%d", &x);                  // 继续输入下一个数据
    }
    r->next = NULL;                       // 最后一个节点的 next 置空
    return L;
}

// 打印链表（辅助函数）
void PrintList(LinkList L) {
    LNode *p = L->next; // 跳过头结点
    printf("链表内容: ");
    while (p != NULL) {
        printf("%d ", p->data);
        p = p->next;
    }
    printf("\n");
}
LinkList Turn_over(LinkList L){

    LNode *q = L->next;
    LinkList A =NULL;
    LNode *b =A;
    A=(LinkList)malloc(sizeof(LNode));
    A->next=NULL;
    while(q!=NULL){
        b=(LNode *)malloc(sizeof(LNode));
        b->data=q->data;
        b->next=A->next;
        A->next=b;
        q=q->next;

    }
    return A;


}

// 主函数测试
int main() {
    LinkList L = NULL;
    LinkList A =NULL;
    printf("请输入数据（输入9999结束）:\n");
    L = List_TailInsert(L);
    PrintList(L);
    A = Turn_over(L);
    printf("链表逆置！");
    PrintList(A);
    return 0;
}

```

#### 双链表

![image-20250909211447419](/coding_images/image-20250909211447419.png)

![image-20250909211458048](/coding_images/image-20250909211458048.png)

  ![image-20250909212113848](/coding_images/image-20250909212113848.png)

双链表可以实现后向遍历和前向遍历

#### 循环链表

```c
typedef struct LNode{
    ElemType data;
    struct LNode *next;
}LNode,*Linklist;
bool InitList(Linklist L){
    L = (LNode *)malloc(sizeof(LNode));
    if(L==NULL)
        retrun false;
    //构成循环的关键，头结点指向自己
    L->next=L;
    return true
}
```

==循环单链表，可以从头开始遍历任意一个结点，可以往后找来找前置结点==

```c
//初始化循环双链表
bool InitDLinkList(DLinklist L){
    L=(DNode*)malloc(sizeof(DNode));
    if(L==NULL)
        return false;
    //前驱后驱都指向自己
    L->prior=L;
    L->next=L;
}
typedef struct DNode{
    ElemType data;
    struct DNode *prior,*next;
}DNode,*DLinklist;
```

![image-20250909213502059](/coding_images/image-20250909213502059.png)

![image-20250909213529086](/coding_images/image-20250909213529086.png)

这个代码对于双链表是正确的，对于单链表有bug

#### 静态链表

将下一个结点的地址以另一种形式展现出来的顺序表

需要分配一整片连续的内存空间，各个节点集中安置

每个节点包括数据元素和下一个节点的数组下标（游标）

每一个数据元素内存4B，每一个游标4B，所以每一个节点为8B

尾结点的next游标为-1

```c
/*静态链表
*/
//初始化
#define MaxSize 10
struct Node{
    ElemType data;
    int next;
};
//可用SLinklist定义“一个长度为Maxsize的Node型数组
typedef struct Node SLinklist[MaxSize];
 ....
```

优点：crud操作不需要移动大量元素

缺点：不能随机存取，只能从头结点开始以此往后查找；容量固定不变，灵活性差

#### 顺序表vs链表对比

1.都属于线性表，都是线性结构

|                 顺序表                 |                链表                |      |
| :------------------------------------: | :--------------------------------: | :--: |
|        支持随机存取，存储密度高        | 离散的小空间分配方便，改变容量方便 |      |
| 大片连续空间分配不方便，改变容量不方便 |      不可随机存取，存储密度低      |      |
|          插入要整体后移/前移           |               不需要               |      |
|            crud时间代价更高            |          crud时间代价更低          |      |

![image-20250909220333433](/coding_images/image-20250909220333433.png)

![image-20250909220535180](/coding_images/image-20250909220535180.png)

## 栈

只允许在一端进行插入或删除操作的线性表

栈顶 栈底 空栈

特点：Last in First out

#### 顺序栈

操作

```c
//顺序栈的初始化和定义
#define MaxSize 10{
    ElemType data[MaxSize];
    int top;//栈顶
}Sqstack;
void InitStACK(Sqstack s){
    S.top=-1;
}
//进栈
bool Push(Sqsatck S,ElemType x){
    if(S.top==MaxSize-1)
        return false;
    S.top=S.top+1;
    S.data[S.top]=x;
    return true;
}
//出栈
bool Pop(Sqstack S,ElemType x){
    if(S.top==-1)
        return false;
    x=S.data[S.top];
    S.top=S.top-1;
    return true;
    
}
//读取栈顶元素
bool GetTop(Sqstack S,ElemType x){
    if(S.top==-1)
        return false;
    x=S.data[S.top];
    return true;
}

```

缺点：空间有限

共享栈：

![image-20250911205614679](/coding_images/image-20250911205614679.png)

#### 链栈

只能在链头进行删除操作的单链表

同样分带头节点和不带***

各种操作需要动手写

## 队列

定义：只允许在一端进行插入，在另一端进行删除的线性表

插入：入队 删除：出队

特点：FIFO（先进先出，后进后出）

#### 顺序存储

  ==判断队列是否已满不能使用if（rear=Maxsize)，有可能只是队尾到达Maxsieze，而队头仍然有空间==

判断是否已满方法：取余

==计算队列元素个数：(rear+MaxSize-front)%MaxSize==

```c
//顺序话存储队列操作
#include<stdio.h>
typedef struct {
    ElemType data[MaxSize];
    int rear,front;
    
}SqQueue;
void InitQueue(SqQueue *Q){
    Q->rear=Q->front=0;
    
}
void testQueue(){
    SqQueue Q;
    InitQueue(Q);
}
//判断是否为空
bool queueEmpty(SqQueue *Q){
    if(Q->rear==Q->front)
        return true;
    else
        return false;
}
//入队操作
bool EnQueue(SqQueue *Q,ElemType x){
    if((Q->rear+1)%MaxSize==Q->front)
        return false;
    Q->data[Q->rear]=x;
    Q->rear=(Q->rear+1)%MaxSize;//循环队列+防止假空队列，需要牺牲一个空间
    return true;
}
//出队,删除第一个队头元素，并用x返回
bool DeQueue(SqQueue *Q,ElemType *x){
    if(Q->rear==Q->front)
        return false;
    x=Q->data[Q->front];
    Q->front=(Q->front+1)%MaxSize;
    return true;
    
}
//获取队头元素
bool GetHead(SqQueue *Q,ElemType x){
    if(Q->rear==Q->front)
        return false;
    x=Q->data[Q->front];
    return true;
}
//判断队列是否满
bool isFull(SqQueue *Q){
    if((Q->rear+1)%MaxSize==Q->front)
        return true;
    else
        return false;
}

```

其他方案：size，tag

#### 链式存储

```c
//队列的链式存储
#include<stdio.h>
#include<stdbool.h>
//节点定义
typedef struct LinkNode{
    ElemType data;
    struct LinkNode *next;
}LinkNode;
//队列定义
typedef struct{
    LinkNode *front,*rear;
}LinkQueue;
//初始化（带头结点）
void InitQueue_chain(LinkQueue *Q){
    Q->front=Q->rear=(LinkNode*)malloc(sizeof(LinkNode));
    Q->front=Q->rear=NULL;

}
void testLinkQueue(){
    LinkQueue Q;
    InitQueue_chain(Q);
    //...
}
//入队操作(带头结点）
void EnQueue_ishead(LinkQueue *Q,ElemType x){
    LinkNode *s=(LinkNode*)malloc(sizeof(LinkNode))
    s->data=x;
    s->next=NULL;
    Q->raer->next=s;
    Q->raer=s;
}
//入队操作（不带头结点）
void EnQueue_nohead(LinkQueue *Q,ElemType x){
    LinkNode *s=(LinkNode*)malloc(sizeof(LinkNode));
    s->data=x;
    s->next=NULL;
    if(Q->front == NULL){
        Q->front = s;
        Q->rear = s;
    }
    else{
        Q->rear->next=s;
        Q->rear=s;
    }
}
//出队操作(带头结点)
bool DeQueue(LinkQueue *Q,ElemType x){
    if(Q->rear==Q->front)
        return false;
    LinkNode *p=Q->front->next;
    x=p->data;
    Q->front->next=p->next;
    if(Q->rear==p)
        Q->rear=Q->front;
    free(p);
    return true;
}


```

#### 双端队列

允许两端插入，两边删除

输出受限的双端队列：允许两边输入，一边输出

输入受限双端队列：允许两边输出，一边输入

考点：判断输出序列是否合法

卡特兰数：
$$
所有合法的出栈序列：\frac{1}{n + 1} \mathrm{C}_{2n}^{n}
$$

## 栈的应用

### 括号匹配问题

碰到左括号就入栈，碰到右括号就出栈一个左括号，查看出栈的左括号与该右括号是否匹配 

### ![image-20250914145430404](/coding_images/image-20250914145430404.png)**算法实现**

```c
#include<stdbool.h>
#define MaxSize 10

typedef struct{
    char data[MaxSize];
    int top;
}Sqstack;

//初始化
void InitStack(Sqstack *S){
    // 初始化栈顶指针为-1，表示空栈
    S->top = -1;
}

//判断是否为空栈
bool StackEmpty(Sqstack *S){
    // 栈顶指针为-1时栈为空
    return S->top == -1;
}

//新元素入栈
bool Push(Sqstack *S, char x){
    // 检查栈是否已满
    if(S->top == MaxSize - 1){
        return false; // 栈满，入栈失败
    }
    // 栈顶指针加1，并将新元素放入栈顶
    S->data[++(S->top)] = x;
    return true;
}

//栈顶元素出栈，用x返回
bool Pop(Sqstack *S, char *x){
    // 检查栈是否为空
    if(StackEmpty(S)){
        return false; // 栈空，出栈失败
    }
    // 获取栈顶元素，并将栈顶指针减1
    *x = S->data[(S->top)--];
    return true;
}

//括号匹配检查函数
bool bracketCheck(char str[], int length){
    Sqstack S; // 创建栈变量
    InitStack(&S); // 初始化栈
    
    for(int i = 0; i < length; i++){
        // 如果是左括号，则入栈
        if(str[i] == '(' || str[i] == '[' || str[i] == '{'){
            Push(&S, str[i]);
        } else {
            // 如果是右括号，但栈为空，则不匹配
            if(StackEmpty(&S)){
                return false;
            }
            
            char topElem;
            Pop(&S, &topElem); // 弹出栈顶元素
            
            // 检查括号是否匹配
            if(str[i] == ')' && topElem != '('){
                return false;
            }
            if(str[i] == ']' && topElem != '['){
                return false;
            }
            if(str[i] == '}' && topElem != '{'){
                return false;
            }
        }
    }
    
    // 检查栈是否为空，为空则所有括号都匹配成功
    return StackEmpty(&S);
}

// 测试函数
int main(){
    char str1[] = "{[()]}();");
    char str2[] = "{[(])}";
    char str3[] = "{{{{";
    
    printf("测试1: {[()]}() 结果: %s\n", bracketCheck(str1, 7) ? "匹配成功" : "匹配失败");
    printf("测试2: {[(])} 结果: %s\n", bracketCheck(str2, 5) ? "匹配成功" : "匹配失败");
    printf("测试3: {{{{ 结果: %s\n", bracketCheck(str3, 4) ? "匹配成功" : "匹配失败");
    
    return 0;
}```

## 代码说明

1. **数据结构定义**：使用结构体`Sqstack`定义了顺序栈，包含一个字符数组和一个栈顶指针。

2. **修复的问题**：
   - 修复了`Pop`函数的参数类型，将`char x`改为`char *x`以便返回出栈元素
   - 修复了`bracketCheck`函数的语法错误
   - 修复了创建栈的方式，从`Sqstack(S)`改为`Sqstack S`
   - 为`bracketCheck`函数添加了返回值

3. **函数实现**：
   - `InitStack`：初始化栈顶指针为-1
   - `StackEmpty`：通过检查栈顶指针是否为-1判断栈是否为空
   - `Push`：先检查栈是否已满，未满则将元素入栈
   - `Pop`：先检查栈是否为空，非空则弹出栈顶元素
   - `bracketCheck`：遍历字符串，左括号入栈，右括号与栈顶元素比较

4. **测试用例**：提供了3个测试用例来验证括号匹配功能

这个程序可以正确判断各种括号组合是否匹配，包括圆括号()、方括号[]和花括号{}。
```

### 前/后缀表达式

![image-20250914162537903](/coding_images/image-20250914162537903.png)

**中缀转后缀方法：**

1.确定中缀表达式各个运算符的运算顺序

2.选择下一个运算符，按照【左操作数，右操作数，运算符】的方式组合一个新的操作数

3.如果还有运算符没被处理，那就继续第二步

要满足“左优先”原则：只要左边的运算符能先算，就先算左边的,可保证运算顺序唯一

![image-20250914163302448](/coding_images/image-20250914163302448.png)

**用栈实现后缀表达式的计算**：

1.从左到右扫描下一个元素，直到处理完所有元素

2.若扫描到操作数则压入栈，并回到第一步，否则执行第三步

3.若扫描到运算符，则弹出两个栈顶元素，执行相应的运算，运算结果压回栈顶，回到第一步

**中缀转前缀（同理）**

![image-20250914165037272](/coding_images/image-20250914165037272.png)

![image-20250914165136223](/coding_images/image-20250914165136223.png)

**中缀转后缀（用c语言的栈结构实现）**

初始化一个站，用于保存==暂时还不确定运算顺序的运算符==。

从左到右处理各个元素，直到末尾。可能遇到三种情况：

1.遇到操作数。直接加入后缀表达式。

2.遇到界限符。遇到“（”直接入栈，遇到“）”则依次弹出栈内运算符，并加入后缀表达式，直到弹出“（”为止。注意：“（”不加入后缀表达式。

3.遇到运算符。依次弹出栈中优先级高于或等于当前运算符的所有运算符，并加入后缀表达式，若碰到“（”或栈空则停止。之后再把当前运算符入栈。

按照上述方法处理完所有字符，将栈中剩余的运算符依次弹出，并加入后缀表达式。

```c
#include<stdlib.h>
#include<string.h>
#include<ctype.h>

#define MaxSize 100

// 定义栈结构
typedef struct {
    char data[MaxSize];
    int top;
} SqStack;

// 初始化栈
void InitStack(SqStack *S) {
    S->top = -1;
}

// 判断栈是否为空
int StackEmpty(SqStack *S) {
    return S->top == -1;
}

// 判断栈是否已满
int StackFull(SqStack *S) {
    return S->top == MaxSize - 1;
}

// 入栈操作
int Push(SqStack *S, char x) {
    if (StackFull(S)) {
        return 0;
    }
    S->data[++(S->top)] = x;
    return 1;
}

// 出栈操作
int Pop(SqStack *S, char *x) {
    if (StackEmpty(S)) {
        return 0;
    }
    *x = S->data[(S->top)--];
    return 1;
}

// 获取栈顶元素（不弹出）
int GetTop(SqStack *S, char *x) {
    if (StackEmpty(S)) {
        return 0;
    }
    *x = S->data[S->top];
    return 1;
}

// 判断字符是否为运算符
int isOperator(char c) {
    return (c == '+') || (c == '-') || (c == '*') || (c == '/') || (c == '(') || (c == ')');
}

// 获取运算符优先级
int getPriority(char op) {
    switch (op) {
        case '+' :
        case '-' :
            return 1;
        case '*' :
        case '/' :
            return 2;
        case '(' :
            return 0; // 在栈内时，左括号优先级最低
        default :
            return -1; // 非法运算符
    }
}

// 中缀表达式转后缀表达式 infix是栈内数组，postfix是用来接收出栈元素方便打印
void infixToPostfix(char infix[], char postfix[]) {
    SqStack S;
    InitStack(&S);
    int j = 0; // 后缀表达式的索引

    for (int i = 0; infix[i] != '\0'; i++) {
        char ch = infix[i];

        // 情况1：遇到操作数，直接加入后缀表达式
        if (isalnum(ch)) {
            postfix[j++] = ch;
        }
        // 情况2：遇到界限符
        else if (ch == '(') {
            // 遇到左括号，直接入栈
            Push(&S, ch);
        }
        else if (ch == ')') {
            // 遇到右括号，依次弹出栈内运算符，直到弹出左括号
            char temp;
            while (GetTop(&S, &temp) && temp != '(') {
                Pop(&S, &temp);
                postfix[j++] = temp;
            }
            // 弹出并丢弃左括号
            Pop(&S, &temp);
        }
        // 情况3：遇到运算符
        else if (isOperator(ch)) {
            char temp;
            // 依次弹出栈中优先级高于或等于当前运算符的所有运算符
            while (GetTop(&S, &temp) && getPriority(temp) >= getPriority(ch)) {
                Pop(&S, &temp);
                postfix[j++] = temp;
            }
            // 将当前运算符入栈
            Push(&S, ch);
        }
    }

    // 处理完所有字符后，将栈中剩余的运算符依次弹出
    char temp;
    while (Pop(&S, &temp)) {
        postfix[j++] = temp;
    }

    // 添加字符串结束符
    postfix[j] = '\0';
}

// 测试函数
int main() {
    char infix[MaxSize];
    char postfix[MaxSize];

    printf("请输入中缀表达式：");
    scanf("%s", infix);

    infixToPostfix(infix, postfix);

    printf("后缀表达式：%s\n", postfix);

    // 测试几个示例
    char infix1[] = "a+b*c";
    char postfix1[MaxSize];
    infixToPostfix(infix1, postfix1);
    printf("\n示例1：%s -> %s\n", infix1, postfix1);

    char infix2[] = "(a+b)*c";
    char postfix2[MaxSize];
    infixToPostfix(infix2, postfix2);
    printf("示例2：%s -> %s\n", infix2, postfix2);

    char infix3[] = "a+b*(c-d)/(e+f)";
    char postfix3[MaxSize];
    infixToPostfix(infix3, postfix3);
    printf("示例3：%s -> %s\n", infix3, postfix3);

    return 0;
}

```

逻辑有点绕

**后缀表达式的计算**

![image-20250914174225653](/coding_images/image-20250914174225653.png)

每弹出一个运算符就要生效

![image-20250914174629948](/coding_images/image-20250914174629948.png)

### 函数递归调用算法

**函数递归调用特点：最后被调用的函数最现实性结束**（LIFO）

 递归工作栈：

每进入一层递归，就将递归调用所需信息压入栈顶

每退出一层递归，就从栈顶弹出相应的信息 

存储：1.调用返回地址

2.实参

3.局部变量

## 队列的应用

**树的层次遍历**

**图的广度优先遍历**

**队列在操作系统里的应用**

**一维数组的存储结构**

ElemType a[10];

元素a[i]的存放地址=LOC+i*sizeof(ElemType) (0<=i<10)

注意：除非题目特别说明，否则默认下标起始为0

**二维数组的存储结构**

`ElemType b[2][4];`

LOC为起始地址

`b[i][j]`的存储地址=LOC+（i*N+j）**sizeof（ElemType）

### 矩阵的存储

**普通矩阵**：二维数组

**对称矩阵的压缩矩阵**：

策略：只存储主对角线+下三角区

按照行优先原则将各元素存入一维数组中

**矩阵下标到一维数组下标的映射**

方法：

求aij是第几个元素：[1+2+3+....+(i-1)]+j=i(i-1)/2+j

所以：k=i(i-1)/2+j-1

(若列优先也是一回事)

**三角矩阵**

![image-20250914193654442](/coding_images/image-20250914193654442.png)

访问上三角区就放在数组的最后一个位置，因为都是常量

**三对角矩阵**

 ![image-20250914194040925](/coding_images/image-20250914194040925.png)

![image-20250914194314592](/coding_images/image-20250914194314592.png)

**稀疏矩阵**的存储

稀疏矩阵：非零元素远远少于矩阵元素的个数

压缩存储策略：

1.顺序存储--三元组<行列值>（和字典差不多）

2.十字链表法：

![image-20250914194828626](/coding_images/image-20250914194828626.png)

指向同一行下一个非零元素

## 串

### 初始化和定义

定义：字符串，由零个或者多个字符组成的有限序列

S=‘a1a2a3a4...’

子串：串中任意个连续的字符组成的子序列 

主串：包含子串的串

字符在字符串中的位置：字符在串中的序号

子串在主串中的位置：子串的第一个字符在主串中的位置

==串的数据对象限定为字符串（中文字符，英文字符，数字字符，标点字符==

**串的基本操作代码：**

```c
#include<stdio.h>
#include<stdbool.h>
//求子串(用Sub返回串S的第pos个字符起长度为len的子串）
bool SubString(SString *Sub,SString S,int pos,int len){
    //字串范围越界
    if（pos+len-1>S->length)
        return false;
    for(int i=pos;i<pos+len;i++)
        Sub->ch[i-pos+1]=S->ch[i];
    Sub->length=len;
    return true;
}
//字符串比较操作
int StrCompare(SSstring S,SString T){
        for(int i=1;i<=S->lengrh&&i<=T->length;i++){
            if(S->ch[i]!=T->c[i])
                return S->ch[i]-T->ch[i];
        }
        return S->length-L->length;
            
}
//定位操作，从主串S中定位第一次出现的子串T
int Index(SString S,SString T){
    int i=1,n=StrLength(S),m=StrLength(T);
    SString Sub;
    while(i<=n-m+1){
        SubString(sub,S,i,m);
        if(StrCompare(sub,T)!=0) ++i;
        else return i;
      }
      return 0;
}
```

### 模式匹配算法

在主串中找到模式串相同的子串，并返回其所在位置

#### 朴素模式

若主串长度为n，模式串长度为m

则会在主串中查找所有长度为m的子串一一匹配

![image-20250916200739883](/coding_images/image-20250916200739883.png)

回到：i=i-j+2  j=1;

当j>T->length,则匹配成功，返回当前子串的第一个字符的位置--i-T->length

复杂度分析：对于每一个子串都需要对比m个字符，子串一共n-m+1个，所以时间复杂度为O（mn）

```c
//朴素模式的匹配算法
#include<stdio.h>
#include<stdbool.h>
int Index(SString S,SString T){
    int i=1,j=1;
    while(i<S->length && j<=T->length){
        if(S->ch[i]==T->length){
            ++i;++j;
        }
        else{
            i=i-j+2;//往前走一个，继续匹配
            j=1;
        }
    }
    if(j>T->length)//匹配后还会往后走一步
        return i-T->length;//往前走（不需要+1）
    else
        return 0;
}
```

#### kmp算法--朴素模式的优化

 根据技巧跳过一些对比流程，优化算法

![image-20250916202704429](/coding_images/image-20250916202704429.png)

**第五个元素失配**：j=2

**第四个元素失配**：j=2

**第三个元素失配**：j=1

**第二个元素失配**: j=1

**第一个元素失配: j=0,i++,j++**

该算法依赖于模式串的特点

能使主串的指针i不走回头路，不回溯

==创建next指针来管理这个匹配策略==

![image-20250916204606468](/coding_images/image-20250916204606468.png)

```c
//KMP算法
//完整代码待补充
//模式匹配部分
int Index_KMP(SString *S,SString *T,int next[]){
    int i=1.j=1;
    while(i<=S->length&&j<=T->length){
        if(j==0||S->ch[i]=T->ch[j]){
            ++i;
            ++j;
        }
        else
            j=next[j];//KMP算法的精髓
    }
    if(j>T->length)
        return i-T->length;
    else 
        return 0;
}
```

==最核心的东西是next数组==

**时间复杂度：O（m+n） 求next数组O(m)匹配算法本身O（n）**

##### **求next数组（重点）**

eg:

![image-20250918150424822](/coding_images/image-20250918150424822.png)



`next[i]`:当模式串第i个字符匹配失败时，从模式串的第next[i]的继续往后匹配

`next[1]=0`第一个不匹配，往后继续匹配，++i,++j ；（==对于任何字符串都成立==）

``next[2]=1`第二个不匹配，应尝试匹配模式串的第1个字符（==对于任何字符串都成立==）

`next[3]=1`、`next[4]=1`、`next[5]=2`、`next[6]=1`

##### KMP进一步优化

加一个判断标准：第next[j[个若不可能匹配，`nextval[j]=--next[j]`

再用nextval[]替代next[]

准则：

![image-20250918201354492](/coding_images/image-20250918201354492.png)

**next[j]所指的字符和j所指的字符不相等时，则next[j]=nextval[j]**

若相同：`nextval[j]=nextval[next[j]]`

==解释：若第next[j]和第j个字符相同且未匹配，那没有必要再比较next[j]反正肯定一样，所以直接将nextval[j]赋值为nextval[next[j]]作下一步处理==

## 树

### 基本概念

概念：根节点，叶子节点，分支节点，叶子节点，空树（没有任何节点）只有叶子节点无继，只有根无前驱

==除了根节点，任何一个结点都有且仅有一个前驱==

![image-20250918211632112](/coding_images/image-20250918211632112.png)

结点的层次：从上往下数第几层

节点的高度：从下往上数第几层

树的高度：总共多少层

结点的度：有几个孩子

树的度：各结点的度的最大值

有序树：树的结点的子树从左到右是有次序的，不能互换

无序树：树中结点的各子树从左至右无次序，不做区分

森林：互不相交的树的集合

![image-20250920165847273](/coding_images/image-20250920165847273.png)

**1.度为m的树/m叉树第i层至多有m的i-1次方个结点**

**2.高度为h的m叉树至多有m的h次方-1/m-1个结点（等比数列求和公式）**

**3.高度为h的m叉树至少有h个结点**

**4.高度为h，度为m的树至少有h+m-1个结点**

**5.**：![image-20250920170648377](/coding_images/image-20250920170648377.png)

==向上取整==

### 二叉树

满二叉树：高度为h，且含有2的h次方-1个结点的二叉树

完全二叉树：当且仅当其每个节点都与高度为h的满二叉树中编号为1到n的节点一一对应时，此树为完全二叉树

![image-20250920171355656](/coding_images/image-20250920171355656.png)

满二叉树也是特殊的完全二叉树

二叉排序树：

![image-20250920171558934](/coding_images/image-20250920171558934.png)

平衡二叉树：树上任一结点的左子树和右子树的深度之叉不超过1。

![image-20250920171951008](/coding_images/image-20250920171951008.png)

#### 二叉树性质

**1.设非空二叉树中度为0,1,2的结点个数分别为n0，n1，n2，则n0=n1+n2**

证明：![image-20250920172342278](/coding_images/image-20250920172342278.png)

**2.二叉树第i层至多有2的i-1次方个结点，m叉树第i层至多有m的i-1次方个结点**

**3.高度为h的二叉树至多有2的h次方-1个结点（等比数列求和公式）**

**4.**：![image-20250920173018873](/coding_images/image-20250920173018873.png)

5.（很重要）

![image-20250920173351287](/coding_images/image-20250920173351287.png)

#### 二叉树的存储结构

![image-20250921113327199](/coding_images/image-20250921113327199.png)

1.顺序存储

==一定要把二叉树的结点编号与完全二叉树对应起来== 

二叉树顺序存储结构只适合存储完全二叉树，用的很少

2.链式存储

```c
type struct BiTNode{
    ElemType data;
    struct BiTNode *lchild,*rchild;
}BiTNode,*BiTree;
BiTree root=NULL;//定义空树
//插入根节点
root=(BiTree)malloc(sizeof(BiTNode));
root->data={1};
root->lchild=NULL;
root->rchild=NULL;
//插入新节点
BiTNode *p=(BiTNode*)malloc(sizeof(BiTNode));
p->data={2};
p->lchild=NULL;
p->rchild=NULL;
root->lchild=p;

```

总共有2n个指针，只用了n-1个，剩下n+1个闲置（用来做线索二叉树)

三叉链表：加一行 struct BiTNode *parent;方便找父亲节点

#### 二叉树的遍历

遍历：按照某种次序把所有结点都访问一遍

先序遍历：根左右（NLR）

中序遍历：左根右（LNR)

后序遍历：左右根（LRN）

代码：

```c
//先序
void PreOrder(BiTree T){
    if(T!=NULL){
        visit(T);
        PreOrder(T->lchild);
        PreOrder(T->rchild);
    }
}
//中序
void InOrder(BiTree T){
    if(T!=NULL){
        InOrder(T->lchild);
        visit(T);
        InOrder(T->rchild);
    }
}
//后序
void PostOrder(BiTree T){
    if(T!=NULL){
        InOrder(T->lchild);
        InOrder(T->rchild);
        visit(T);
    }
}
```

**利用递归的思想**  空间复杂度：O(h)

-+a*b-cd/ef

a+b*c-d-e/f

abcd-*+ef/-

![image-20250921152907429](/coding_images/image-20250921152907429.png)

#### 二叉树层序遍历

1.初始化一个辅助队列

2.根结点入队

3.若队列为空，则对头结点出队，访问该结点，并将其左右孩子插入队尾（如果有的话）

4.重复步骤3直至队列为空

#### 由遍历序列构造二叉树

给定前序，中序，后序序列，不能确定唯一的二叉树

但是若给出两个遍历序列，则可以确定

![image-20250921160818433](/coding_images/image-20250921160818433.png)

#### 线索二叉树

 ![image-20250921162537816](/coding_images/image-20250921162537816.png)

作用：找结点的前驱后继更加方便

```c
//线索二叉树
#include<stdio.h>
typedef struct BiTNode{
    ElemType data;
    struct BiTNode *lchild,*rchild;

}BiTNode,*BiTree;
typedef struct ThreadNode{
    ElemType data;
    struct ThreadNode *lchild,*rchild;
    int ltao,rtag;
}ThreadNode,*ThreadTree;
```

tag==0表示指针指向孩子，

tag==1，表示指针是线索



![image-20250921164425011](/coding_images/image-20250921164425011.png)

![image-20250921165012754](/coding_images/image-20250921165012754.png)

##### 找线索二叉树的前驱后继

```c
//找到以P为根的子树中，第一个被中序遍历的结点
ThreadNode *Firstnode(ThreadNode *p){
    //循环找到左下节点（不一定是叶子结点）
    while(p->ltag==0) P->lchild;
    return p;
}
//在中序线索二叉树中找到结点p的后继结点
ThreadNode *Nextnode(ThreadNode *p){
    //右子树中最左下的结点
    if(p->rtag==0) return Firstnode(P->rchild);//直接返回第一个被中序遍历的结点的右节点
    else return p->rchild;
}
//对中序线索二叉树进行中序遍历（利用线索实现的非递归算法）
void Inorder(ThreadNode *T){
   for(ThreadNode*p=Firstnode(T);
     p!=NULL;p=Nextnode(p))
        visit(p);
}
```

后序，前序遍历找线索二叉树的方法略

![image-20250923201023740](/coding_images/image-20250923201023740.png)

#### 树的存储

1.双亲表示法

通过数组记录父亲节点的位置来存储树

```c
#define MAX_TREE_SIZE 100
typedef struct{
    ElemType data;
    int parent;
    
}PTNode;
typedef struct{
    PTNode nodes[MAX_TREE_SIZE];
    int n;//总结点数
}PTree;
```

**优缺点：找父节点方便，但是找孩子很不方便，要重新遍历**

2.孩子表示法

通过顺序存储+链式存储结合，用数组顺序存储各个节点，每一个结点中保存数据元素、孩子链表头指针

```c
//孩子表示法
struct CTNode{
    int child;
    struct CTNode *next;
    
};
typedef struct{
    ElemType data;
    struct CTNode *firstChild;
    
}CTBox;
typedef struct{
    CTBox nodes[MAX_TREE_SIZE]；
    int n,r;
}CTree;
```

**优缺点：找孩子方便，找父节点很麻烦，适用于服务流程网**

#### 树和森林的遍历

1.先根遍历

```c
//先根遍历
void PreOrder（TreeNode *R）{
    if(R!=NULL){
        visit(R);
        while()
          PreOrder(T);
            
    }
}
```

若树非空，先访问根结点，再依次对每颗子树进行先根遍历。

2.后根遍历

```c
void PostOrder(TreeNode *R){
    if(R!=NULL){
        while(R还有下一个子树)
            PostOrder(T);
        visit(R);
    }
}
```

若树非空，先依次对每颗子树进行后根遍历，最后再访问根结点。

![image-20250924212553309](/coding_images/image-20250924212553309.png)

3.树的层次遍历（借助队列实现）

①.若树非空，则根结点入队

②.若队列非空，队头元素出队并访问，同时将该元素出队并访问，同时将该元素的孩子依次入队

③.重复步骤2直至队列为空

==处理方法和二叉树相似==

**先/后根遍历又称深度优先遍历**

**层次遍历又称广度优先遍历**

4.森林的先序遍历

若森林为非空，则访问森林中第一颗树的根节点，先序遍历第一棵树中根结点的子树森林，然后先序遍历除去第一棵树之后剩余的树构成的森林（递归）

5.森林的中序遍历

若森林为非空则先中序遍历森林中第一颗树的根节点的子树森林，访问第一棵树的根结点，然后中序遍历出去第一棵树之后剩余的树构成的森林。（递归）

==森林的遍历可以直接转换为树的遍历，再排序在一起==

### 哈夫曼树

概念：结点的权，结点的带权的路径长度，树的带权路径长度

![image-20250924213719328](/coding_images/image-20250924213719328.png)

哈夫曼树：在含有n个带权叶子结点的二叉树中，其中带权路径长度（WPL）最小的二叉树成为哈夫曼树，也称==最优二叉树==

哈夫曼树的构造算法：**给定n个权值分别为wμ，W..w,的结点，构造哈夫曼树的算法描述如下：
1）将这n个结点分别作为n棵仅含一个结点的二叉树，构成森林F。
2）构造一个新结点，从F中选取两棵根结点权值最小的树作为新结点的左、右子树，并且将新结点的权值置为左、右子树上根结点的权值之和。
3）从F中删除刚才选出的两棵树，同时将新得到的树加入F中。
4）重复步骤2）和3），直至F中只剩下一棵树为止。**

![image-20250924214114896](/coding_images/image-20250924214114896.png)

哈夫曼树的特点：

1.每个初始节点都成为叶子节点，且权值越小的结点到根节点的路径长度越大

2.哈夫曼树的结点总数为2n-1

3.哈夫曼树中不存在度（孩子个数）为1的结点

4.哈夫曼树不唯一，但是WPL必须为最小值

哈夫曼编码：

![image-20250924214700155](/coding_images/image-20250924214700155.png)

左孩子结点为0，右孩子为1，给每个节点赋予相应的二进制编码

前缀编码：其中任何一个编码都不是另一个编码的前缀，不会产生解码歧义，例如b-111，则不可能会有其他节点编码为11或1

==应用：压缩数据==

![image-20250924215109357](/coding_images/image-20250924215109357.png)

#### 并查集

```c
//Find 查操作，找x所属集合（返回x所属根结点）
int Find(int S[],int x){
    while(S[x]>=0)
        x=S[x];
    return x;
}
//Union“并”操作，将两个集合合并为一个
void Union(int S[],int Root1,int Root2){
    //要求Root1与Root2是不同的集合
    if(Root1==Root2) return;
    //将根Root2连接到另一根Root1下面
    S[Root2]=Root1;
}

```

并：把一个集合元素的根节点指向另一个集合的根节点

时间复杂度分析：

并：O（1）查：最坏O（n）树越矮越快

优化Union：

1.用根节点的绝对值表示树（集合）的结点总数

2.Union操作，**让小树合并到大树**

```c
void Union(int S[],int Root1 int Root2)
    if(Root1==Root2) return;
    if(S[Root2]>S[Root1]){//root2节点数更少
        S[Root1]+=Root1;//小树合并到大树
    }else{
        S[Root2]+=S[Root1]//累加结点总数
        S[Root1]=Root2;}
```

此方法可以使整个数的高度不超过log2n（向下取整）+1

优化Find操作：

把父亲节点挂到根节点下面

循环往复

```c
int Find(int S[],int x){
    int root=x;
    while(S[root]>=0) root=S[root];
    while(x!=root){//压缩路径
        int t=S[x];
        S[x]=root;
        x=t;
        
    }return root;
}
```

![image-20250926213139771](/coding_images/image-20250926213139771.png)

![image-20250926212508940](/coding_images/image-20250926212508940.png)

## 图

### 图的基本概念

图的定义:![image-20250926215338175](/coding_images/image-20250926215338175.png)

无向图：各个边没有明确的方向（双向）

有向图：各个边有明确的方向

弧尾、弧头(仅有向图有此概念)

顶点的度：对于无向图来说，度是指依附于该顶点的边的条数

入度出度：对于有向图来说，入度是以该顶点为终点的有向边的数目，出度是起点..

由于有一个入度就会有一个出度，所以对于有向图来说，所有顶点的入度和出度个数是相等的

路径：由一个顶点到另一个顶点过程的顶点序列

回路：第一个顶点和最后一个顶点相同的路径称为回路或环

简单路径：在路径序列中，顶点不重复出现的路径称为简单路径

简单回路：除了第一个顶点和最后一个顶点外，其余顶点不重复出现的回路称为简单回路

路径长度：路径上边的数目

点到点的距离：从顶点出发到另一个订单的最短路径若存在，则此路径的长度称为两节点的距离，若不存在，距离为正无穷

连通：无向图中，若两顶点的路径存在，则称两顶点是连通的

强连通：有向图中，若从a顶点到b顶点有路径，从b顶点到a顶点也有路径，则这两个顶点是强连通

连通图：任意两个顶点都连通（对于无向图）

强连通：任何一对顶点都强连通（对于有向图）

==常见考点1：对于n个顶点的无向图：若G是连通图，则最少有n-1条边（环状），若G是非连通图，则最多可能有C（上面是2，下面是n-1的组合数）条边==

==常见考点2：对于n个顶点的有向图G，若G是强连通图，则最少有n条边（形成回路）==
子图：![image-20250927143100867](/coding_images/image-20250927143100867.png)

**子图一定要是图，是研究图的局部**

**连通分量（重要）**：子图必须连通，且包含尽可能多的顶点和边

**强连通分量**：子图必须强连通，且尽可能多的保留边和顶点

生成树：是指连通图中包含图中全部顶点的一个极小连通子图

![image-20250927143455603](/coding_images/image-20250927143455603.png)

生成森林：对于非连通图来说，生成森林是连通分量的生成树所构成的森林

![image-20250927143828917](/coding_images/image-20250927143828917.png)

边的权/带权图：在边上带有权值

带权路径长度：当图是带权图是，一条路径上所有边的权值之和。称为路径的带权路径长度

无向完全图：无向图中任意两个顶点之间都存在边

有向完全图：有向图中任意两个顶点都存在方向相反的两条弧

![image-20250927144348831](/coding_images/image-20250927144348831.png)

稀疏图和稠密图：边很少和边很多的图（没有明确的界限）

**有向树：一个顶点的入度为0，其余顶点的入度均为1的有向图，称为有向树**

![image-20250927144648866](/coding_images/image-20250927144648866.png)

### 图的存储

#### 邻接矩阵法

![image-20250927144953352](/coding_images/image-20250927144953352.png)

```c
#define MaxVertexNum 100
typedef struct{
    char Vex[MaxVertexNum];//顶点表
    int Edge[MaxVertexNum][MaxVertexNum];//邻接矩阵，边表
    int vexnum,arcnum;//图的当前顶点数和边数
    
}MGraph;

```

![image-20250927152857259](/coding_images/image-20250927152857259.png)

第i个结点的入度=第i列的非零元素的个数

第i个结点的出度=第i行的非零元素个数

第i个结点的度=第i列第i行的非零元素个数之和

==若顶点很多，会浪费大量空间，所以邻接矩阵适合稠密图==

![image-20250927155336276](/coding_images/image-20250927155336276.png)

#### 邻接表法

**顺序存储+链式存储**

```c
//创建图
typedef struct{
    AdjList vertices;
    int vernum,arcnum;
}ALGraph;
//顶点
typedef struct VNode{
    VertexType data;
    ArcNode *first;//第一条弧/边
    
}VNode,AdjList[MaxVertexNum];
//边/弧
typedef struct ArcNode{
    int adjtex;//指向的结点
    struct ArcNode *next;//指向下一条弧的指针
    //infoType info；//权值
}ArcNode;

```

![image-20250927160631656](/coding_images/image-20250927160631656.png)

无向图中边的数据有冗余重复

**邻接表的表示方式不唯一，邻接矩阵唯一**

![image-20250927160944219](/coding_images/image-20250927160944219.png)

#### 十字链表

![image-20250927162331790](/coding_images/image-20250927162331790.png)

只能存有向图

ps：这个很抽象，王道讲太烂了.....

#### 邻接多重表

![image-20250927163329508](/coding_images/image-20250927163329508.png)

注意：邻接多重表只能适用于存储无向图

![image-20250927163549606](/coding_images/image-20250927163549606.png)

### 图的基本操作

Adjacent(G,x,y):判断图G 是否存在边<x,y>或（x,y)

Neighbors(G,x):判断图G中与结点x邻接的边

InsertVextex(G，x)：在G中插入顶点x

DeleteVertex(G,x):从图中删除顶点x

AddEdge(G,x,y):若无向边（x，y）或有向边<x,y>不存在，则向图G中添加该边

==FirstNeighbor(G,x):求图G中顶点x的第一个邻接点，若有则返回顶点号，若x没有邻接点或图中不存在x，则返回==

==NextNeighbor(G,x,y):假设图G顶点y是顶点x的一个邻接点，返回除了y之外顶点x的下一个邻接点的顶点号，若y是x的最后一个邻接点，则返回-1==

Get_edge_value(G,x,y):获取图G中边(x,y)或者<x,y>对应的权值

Set_edge_value(G,x,y,v):设置图G中边(x,y)或者<x,y>对应的权值v

Adjacent(G,x,y):判断图G是否存在边<x,y>或者(x,y)

==以上操作王道讲的很笼统，需要结合书本进一步熟悉具体操作和时间or空间复杂度==

### 图的遍历

#### 广度优先遍历（BFS）

```c
//广度优先遍历
void BFS(Graph G,int v){
    visit(v);
    visited[v]=TRUE;//打标记
    Enqueue(Q,v);
    while(!isEmpty(Q)){
        Dequeue(Q,V);
        for(w=FirstNeighbor(G,v); w>=0;w=NextNeighbor(G,v,w))
            //检测v所有的邻接点
        if(!visited[w]){
            visit(w);
            visited[w]=TRUE;
            EnQueue(Q,w);
        }//if
    }//while
}
```

**遍历序列的可变性：用邻接表所产生的BFS遍历序列不唯一，用邻接矩阵所产生的BFS遍历序列是唯一的**

**如果是非连通图，则无法遍历所有节点**

为解决此问题，需要优化代码：

```c
//广度优先遍历
//支持非连通图
void BFSTraverse(Graph G){
    for(i=0;i<G.vexnum;i++)
        visited[i]=FALSE;
    InitQueue(Q);
    for(i=0;i<G.vexnum;i++)
        if(!visited[i])
            BFS(G,i);
}
void BFS(Graph G,int v){
    visit(v);
    visited[v]=TRUE;
    Enqueue(Q,v);
    while(!isEmpty(Q)){
        Dequeue(Q,v);
        for(w=FirstNeighbor(G,v); w>=0;w=NextNeighbor(G,v,w))
            //检测v所有的邻接点
        if(!visited[w]){
            visit(w);
            visited[w]=TRUE;
            EnQueue(Q,w);
        }//if
    }//while
} 
```

复杂度分析：

![image-20250927173730635](/coding_images/image-20250927173730635.png)

#### 广度优先生成树

只保留BFS访问所经过的边，其他边去掉，生成的树

#### 广度优先生成森林

对于非连通图的广度优先遍历，可得到广度优先生成森林（由多个广度优先生成树所构成）

#### 深度优先遍历（DFS）

```c
//深度优先遍历
bool visited[MAX_VERTEX_NUM]=false;
void DFSTraverse(Graph G){
    for(v=0;v<G->vexnum;++v)
        visited[v]=FALSE;
    for(v=0;v<G->vexnum;++v){
        if(!visited[v])
            DFS(G,v);
    }
}
void DFS(Graph G,int v){
    visit(v);
    visited[v]=TRUE;
    for(w=FirstNeighbor(G,v);w>=0;w=NextNeighbor(G,v,w))
      if(!visited[w]){
        DFS(G,w);
    }
}

```

BFS用队列存储节点，DFS用栈

空间复杂度，最好：O(1)最坏：O（V）

### 最小生成树

定义：对于一个带权连通无向图G=（V，E），生成树不同，每棵树的权（即树中所有边上的权值
之和）也可能不同。设R为G的所有生成树的集合，若T为R中边的权值之和最小的生成
树，则T称为G的最小生成树，即MST

==若一个连通图本身就是一棵树，则其最小生成树就是它本身==

#### prim算法：

从某一个顶点开始构建生成树；每将代价最小的新定点纳入生成树，直到所有的顶点都纳入为止。（与结点无关，无论选哪个结点最终的权值和最小值都一样）

实现：创建两个数组，第一个数组isJoin用于打标签，给是否加入生成树打标签(bool型) ，第二个数组lowcost从V0开始，总共需要n-1轮处理，每一轮处理循环遍历所有个结点，找到lowCast最低的，且还没加入树的顶点。

再次遍历循环，更新还没加入的各个顶点的lowcast值

代码（找ai写的）：

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define V 6       // 顶点数量
#define INF 9999  // 表示无穷大

// 打印邻接矩阵
void printMatrix(int graph[V][V]) {
    printf("邻接矩阵:\n");
    printf("    V0  V1  V2  V3  V4  V5\n");
    for (int i = 0; i < V; i++) {
        printf("V%d ", i);
        for (int j = 0; j < V; j++) {
            if (graph[i][j] == INF)
                printf("  ∞ ");
            else
                printf("%4d", graph[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}

// 打印数组状态
void printArrays(int isJoin[V], int lowCost[V], int step) {
    printf("步骤 %d:\n", step);
    printf("isJoin[]: ");
    for (int i = 0; i < V; i++) {
        printf("%d ", isJoin[i]);
    }
    printf("\n");
    
    printf("lowCost[]:");
    for (int i = 0; i < V; i++) {
        if (lowCost[i] == INF)
            printf("  ∞ ");
        else
            printf("%4d", lowCost[i]);
    }
    printf("\n\n");
}

// Prim算法实现
void primMST(int graph[V][V]) {
    int parent[V];    // 存储MST的父节点数组
    int lowCost[V];   // 存储边的权重
    int isJoin[V];    // 标记顶点是否已加入MST
    int step = 0;     // 步骤计数器
    
    // 初始化数组
    for (int i = 0; i < V; i++) {
        lowCost[i] = INF;
        isJoin[i] = false;
    }
    
    // 从顶点V0开始
    lowCost[0] = 0;
    parent[0] = -1; // V0是根节点
    
    printf("Prim算法开始执行:\n");
    printf("从顶点V0开始，总共需要%d轮处理\n\n", V-1);
    
    // 每一步处理
    for (int count = 0; count < V - 1; count++) {
        step++;
        // 找到未加入MST的顶点中lowCost最小的顶点
        int min = INF, min_index;
        
        for (int v = 0; v < V; v++) {
            if (isJoin[v] == false && lowCost[v] < min) {
                min = lowCost[v];
                min_index = v;
            }
        }
        
        // 将找到的顶点加入MST
        int u = min_index;
        isJoin[u] = true;
        
        // 更新相邻顶点的lowCost值
        for (int v = 0; v < V; v++) {
            if (graph[u][v] && isJoin[v] == false && graph[u][v] < lowCost[v]) {
                parent[v] = u;
                lowCost[v] = graph[u][v];
            }
        }
        
        // 打印当前步骤的状态
        printf("第%d轮处理:\n", count+1);
        printf("找到lowCost最小的顶点: V%d\n", u);
        printArrays(isJoin, lowCost, step);
    }
    
    // 打印最终的最小生成树
    printf("最小生成树构建完成:\n");
    printf("边\t权重\n");
    for (int i = 1; i < V; i++) {
        printf("V%d - V%d\t%d\n", parent[i], i, graph[i][parent[i]]);
    }
    
    // 计算总权重
    int totalWeight = 0;
    for (int i = 1; i < V; i++) {
        totalWeight += graph[i][parent[i]];
    }
    printf("总权重: %d\n", totalWeight);
}

int main() {
    // 图的邻接矩阵表示
    int graph[V][V] = {
        {0, 6, 1, 5, INF, INF},
        {6, 0, 5, INF, 3, INF},
        {1, 5, 0, 5, 6, 4},
        {5, INF, 5, 0, INF, 2},
        {INF, 3, 6, INF, 0, 6},
        {INF, INF, 4, 2, 6, 0}
    };
    
    printf("Prim算法的实现思想\n");
    printf("==========================================\n\n");
    
    printMatrix(graph);
    
    primMST(graph);
    
    printf("\n时间复杂度: O(n²) = O(|V|²)\n");
    printf("每轮处理: 循环遍历所有结点，找到lowCost最低且未加入树的顶点\n");
    printf("         再次循环遍历，更新未加入顶点的lowCost值\n");
    printf("每轮时间复杂度: O(2n)\n");
    
    return 0;
}
```

时间复杂度：O(V平方)

#### Kruskal算法（克鲁斯卡尔）：

每次选择一条权值最小的边，使这条边的两头联通（原本已连通的不选），直到所有节点都连通。

实现：先按照权值给边进行排序，然后遍历每一条边，利用并查集判断结点是否连通，若不连通就加入，共执行e轮，需要时间复杂度为O（log2 e）

对比：

![image-20250930003538686](/coding_images/image-20250930003538686.png)

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX 100

// 边的结构体
typedef struct {
    int u, v, weight;
} Edge;

// 并查集结构
typedef struct {
    int parent;
    int rank;
} DisjointSet;

// 比较函数，用于边的排序
int compareEdges(const void* a, const void* b) {
    Edge* edgeA = (Edge*)a;
    Edge* edgeB = (Edge*)b;
    return edgeA->weight - edgeB->weight;
}

// 查找根节点（路径压缩）
int find(DisjointSet sets[], int i) {
    if (sets[i].parent != i)
        sets[i].parent = find(sets, sets[i].parent);
    return sets[i].parent;
}

// 合并两个集合（按秩合并）
void unionSets(DisjointSet sets[], int x, int y) {
    int xroot = find(sets, x);
    int yroot = find(sets, y);
    
    if (sets[xroot].rank < sets[yroot].rank)
        sets[xroot].parent = yroot;
    else if (sets[xroot].rank > sets[yroot].rank)
        sets[yroot].parent = xroot;
    else {
        sets[yroot].parent = xroot;
        sets[xroot].rank++;
    }
}

// Kruskal算法主函数
void kruskalMST(int graph[][MAX], int V) {
    Edge result[V]; // 存储MST的结果
    int e = 0; // 结果数组的索引
    int i = 0; // 排序后边的索引
    
    // 步骤1: 创建所有边的列表
    Edge edges[V*V];
    int edgeCount = 0;
    
    for (int u = 0; u < V; u++) {
        for (int v = u+1; v < V; v++) {
            if (graph[u][v] != 0) {
                edges[edgeCount].u = u;
                edges[edgeCount].v = v;
                edges[edgeCount].weight = graph[u][v];
                edgeCount++;
            }
        }
    }
    
    // 步骤2: 按权重对边进行排序
    qsort(edges, edgeCount, sizeof(Edge), compareEdges);
    
    // 步骤3: 初始化并查集
    DisjointSet* sets = (DisjointSet*)malloc(V * sizeof(DisjointSet));
    for (int v = 0; v < V; v++) {
        sets[v].parent = v;
        sets[v].rank = 0;
    }
    
    // 步骤4: 遍历所有边，构建MST
    i = 0;
    while (e < V - 1 && i < edgeCount) {
        Edge next_edge = edges[i++];
        
        int x = find(sets, next_edge.u);
        int y = find(sets, next_edge.v);
        
        // 如果不形成环，则加入MST
        if (x != y) {
            result[e++] = next_edge;
            unionSets(sets, x, y);
        }
    }
    
    // 打印MST
    printf("Kruskal算法构建的最小生成树:\n");
    printf("边\t权重\n");
    int totalWeight = 0;
    for (i = 0; i < e; i++) {
        printf("%d - %d\t%d\n", result[i].u, result[i].v, result[i].weight);
        totalWeight += result[i].weight;
    }
    printf("总权重: %d\n", totalWeight);
    
    free(sets);
}

// 示例用法
int main() {
    // 示例图的邻接矩阵表示
    int V = 6;
    int graph[MAX][MAX] = {
        {0, 6, 1, 5, 0, 0},
        {6, 0, 5, 0, 3, 0},
        {1, 5, 0, 5, 6, 4},
        {5, 0, 5, 0, 0, 2},
        {0, 3, 6, 0, 0, 6},
        {0, 0, 4, 2, 6, 0}
    };
    
    kruskalMST(graph, V);
    
    return 0;
}
```

### 最短路径问题

G港是一个物流集散中心，经常需要往各个城市运东西，怎么运送距离最短（单元最短路径问题）

各个城市之间也需要互相往来，相互之间怎么走距离最近（每对顶点间的最短路径问题）

#### BFS(无权图)

代码 执行过程：

```c
#include<stdio.h>
//求从顶点u到其他顶点的最短路径
void BFS_MIN_Distance(Graph G,int u){
    //d[i]表示从u到i结点的最短路径
    for(i=0;i<G->vexnum;++i){
        d[i]=∞;//初始化路径长度
        path[i]=-1；
    }
    d[u]=0;
    visited[u]=TRUE;
    EnQueue(Q,u);
    while(!isEmpty(Q)){//BFS算法主过程
        DeQueue(Q,u);//队头元素u出队
        for(w=FirstNeighbor(G,u);w>=0;w=NextNeighbor(G,u,w))
        if(!visited[w]){//w为y的尚未访问的邻接结点
            d[w]=d[u]+1;//路径长度+1
            path[w]=u;//最短路径从u到w
            visited[w]=TRUE;//设已访问标记
            EnQueue(Q,w);//顶点w入队
        }//if
    }//while

}

```

![image-20251009193452230](/coding_images/image-20251009193452230.png)

**个人理解**：首先初始化两个数组，d数组用来装路径长度，path用来装前驱结点（记录路径），然后从下标为u 的结点开始遍历，du标为0，visit数组用来记录是否已访问过，这里的visit【u】标位true，将u入队，然后开始循环，也就是经典的BFS算法，只要队列不为空就继续循环，循环内容为先将队头元素出队，用u接收，然后嵌套for循环，从邻接结点开始遍历，只要w未被访问就将dw在du的基础上加一（因为是邻接，只需要+1即可）再记录到w的路径为u到w，将w标记为已访问，然后w入队，w入队后回到for循环，直到u的所有邻接结点都被标记，被更新最短长度和路径，回到while循环，判定队列是否为空，不为空继续for循环，用u接收，继续来遍历，标记，更新，直到队列里什么都没有了，得到最终的du数组和path数组，完成最短路径的求解

#### Dijkstra（带权图，无权图）

BFS算法不适合带权图

`final[]`:标记各顶点是否已找到最短路径（bool）

`dist[]`:最短路径长度（int）==（注意是总长度）==

`path[]`:路径上的前驱（int）

具体方法：

   循环遍历所有节点，找到还没确定最短路径，且dist最小的顶点Vi，令final[i]=true，检查所有Vi的邻接顶点，若其final值为false，则去找最短路径，更新path和dist信息。

循环往复，直到所有final的值均为true

![image-20251009202705340](/coding_images/image-20251009202705340.png)

==Dijkstra算法无法处理带负权值的图==

Dijkstra 算法在执行时，
 一旦确定一个顶点的最短距离（即从源点到它的最短路径），
 就**认为这个距离不会再被更新**。

但如果存在**负权边**，
 后面经过该负权边可能会让之前“确定”的最短距离变得更短，
 从而使算法的前提失效，导致结果错误。

👉 简言之：
 **Dijkstra 假设最短路径只会越来越长，
 而负权边会让路径变短，破坏这个假设**

**个人理解**：需要三个数组，final用来标记结点是否已经确定了最短路径，path和bfs一样，用来标记路径，dis数组表示最短路径的大小，先从起始节点开始，标记每一个邻接节点的dist，非邻接则为无穷，这是初始化，然后遍历所有结点，找还没有确定最短路径的，且dist最小的结点，检查此节点的邻接结点，假如经过此节点从起始节点到其他的结点路径有更短的路径且final数组为false的，则更新dist和path数组的值，并给此节点final数组标记为true，由此循环，直到所有结点final数组都标记为true，结束，得到三个数组可以表示最短路径的大小和路径本身。

![image-20251009212532391](/coding_images/image-20251009212532391.png)

#### Floyd（带权图，无权图）

==动态规划思想==

一种**动态规划算法**，用于求**任意两点间的最短路径**。

**核心思想：**
 逐步尝试把每个点作为“中转点”，
 如果经过该点能让两点间距离更短，就更新最短路径。

**状态转移公式：**
$$
dist[i][j]=min⁡(dist[i][j], dist[i][k]+dist[k][j])
$$
**算法流程：**

1. 初始化 `dist[i][j]` 为边权（无边则为∞）。
2. 对每个中转点 `k`：
     对所有点对 `(i, j)` 更新最短距离。
3. 经过n轮递推

**时间复杂度：** O(n^3)

![image-20251009204014488](/coding_images/image-20251009204014488.png)

```c
//初始化矩阵A和path矩阵
for(int k=0;k<n;k++){//中转点遍历
    for(int i=0;i<n;i++){//遍历
        for(int j=0;j<n;j++){
            if (A[i][j]>A[i][k]+A[k][j]){ //加入以Vk为中转点可以得到更短的路径
                A[i][j]=A[i][k]+A[k][j]; //更新最短路径长度
                path[i][j]=k;  //记录中转点
            }
        }
    }
}

```

​	

![image-20251009205732447](/coding_images/image-20251009205732447.png)

### 有向无环图

对运算进行合并

![image-20251011112500953](/coding_images/image-20251011112500953.png)

解题方法：

**顶点中不存在重复的操作数**

1.把各个操作数不重复的排成一排

2.标出各个运算符的生效顺序

3.按顺序加入运算符，注意“分层”

4.自底向上逐层检查**同层**的运算符是否可以合体

![image-20251011204848610](/coding_images/image-20251011204848610.png)

### 拓扑排序

AOV网（activity on vertex network）

用DAG图（有向无环图）表示一个工程，顶点表示活动，有向边<Vi,Vj>表示活动Vi必须优先于活动Vj进行

![image-20251011205447077](/coding_images/image-20251011205447077.png)

==不能出现回路==

![image-20251011205628776](/coding_images/image-20251011205628776.png)

拓扑排序：按照先后顺序排序

实现算法：

1.从AOV网中选择一个没有前驱（入度为0）的顶点并输出

2.从网中删除该顶点和所有以它为起点的有向边

3.重复1,2直到当前的AOV网为空或当前网不存在无前驱的顶点为止

```c
#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>
#define MaxVertexNum 100
typedef struct ArcNode{ //边表结点
    int adjvex;          //该弧所指向的顶点位置
    struct ArcNode *nextarc; //指向下一条弧的指针
    //网的边权值
}ArcNode;
typedef struct VNode{ //顶点表结点
    VertexType data;  //顶点信息
    ArcNode *firstarc;//指向第一条依附该顶点的弧的指针
    
}VNode,AdjList[MaxVertexNum];
typedef struct{
    AdjList vertices; //邻接表
    int vexnum,arcnum;//图的顶点数和弧树
}Graph;
bool TopplogicalSort(Graph G){
    InitStack(S); //初始化栈，存储入度为0的顶点
    for(int i=0;i<G->vexnum;i++)
        if(indegree[i]==0)
            Push(S,i);
        int count=0;
        while(!IsEmpty(S)){
            Pop(S,i);
            print[count++]=i;
            for(p=G->vertices[i]->firstarc;p;p=p->nextarc){
                //将所有的i指向的顶点入度减少1，并且将入度减为0的顶点压入栈S，以达到删除该节点的作用
                v=p->adjvex;
                if(!(--indegree[V]))
                    Push(S,v); //入度为0，入栈
            }
        }
        if(count<G->vexnum)
            return false;//排序失败
        else
            return true;//排序成功
              
}
```

**逆拓扑排序**：考量出度为0 的结点来删除

逆拓扑排序不适合用邻接表，需要用邻接矩阵

后续需要自己实现代码

后续还需要自己实现利用DFS算法实现逆拓扑排序

![image-20251011221838627](/coding_images/image-20251011221838627.png)

把DFS访问后的结点输出打印出来，即可实现逆拓扑排序

### 关键路径

AOE网：

![image-20251011223800870](/coding_images/image-20251011223800870.png)



性质：

1.只有在某顶点所代表的时间发生之后，从该顶点出发的各有向边所代表的活动才能开始

2.只有在进入某顶点的各个有向边所代表的活动都已结束时，该顶点所代表的事件才能发生。另外，有些活动可以并行

`开始顶点（源点）`：唯一一个入度为0的开始点

`结束顶点（汇点）`：唯一一个出度为0的点

`关键路径`:从源点到汇点所有路径中，具有最大路径长度的路径，该路径上的活动为**关键活动**

==性质：完成整个工程的最短时间就是关键路径的长度，若关键活动不能按时完成，则整个工程花的时间会延长，缩短关键活动的时间，可以缩短整个工程的工期，当缩短到一定程度，关键活动可能变成非关键活动，关键路径可能有很多条，这个情况下必须缩短多条关键路径的活动的工期才可以缩短工期。==

活动的最早发生时间：决定了所有该事件之前的活动能够开工的最早时间

活动的最早发生时间：该活动的起点所表示的事件的最早发生时间

`时间余量`：表示在不增加完成整个工程所需总时间的情况下，活动ai可以拖延的时间

**若一个活动的时间余量为0，则说明该活动必须要如期完成，即为关键活动。**

![image-20251012005318012](/coding_images/image-20251012005318012.png)

**1、求所有事件的最早发生时间**：

按照拓扑排序序列，依次求各个顶点的最早发生时间

源点：0，其他顶点看情况计算

计算方法：只有所有的指向该事件的活动都已发生以后，v4才能发生，计算指向该事件的活动发生的最早时间（取max）

![image-20251012172458125](/coding_images/image-20251012172458125.png)

**2、求所有事件的最迟发生时间**

按照逆拓扑排序，依次求各个顶点的最迟发生时间

汇点：最迟发生时间等于最早发生时间，直接赋值即可

计算方法：从汇点往前推，剪掉后驱活动所需的最迟发生时间即可

**3、所有活动的最早发生时间**

等于弧尾所连事件的最早发生时间

**4、所有活动的最迟发生时间**

等于这条弧所指向的事件的最晚发生时间剪掉这条弧的权值

**5、时间余量**

用最晚发生时间减去最早发生时间

若时间余量为0，则为关键活动，关键活动组成的路径为关键路径

## 查找

`查找`：在数据集合中寻找满足某种条件的数据元素的过程称为查找

`查找表`：用于查找的数据集合称为查找表，由同一类数据元素组成

`关键字`：数据元素中唯一标识该元素的某个数组项的值，使用关键字的查找，查找结果应该是唯一的。

查找表常见操作：

1.查找符合条件的数据元素

2.插入、删除某个数据元素

`查找长度`：在查找运算中，需要对比关键字的次数称为查找长度

`平均查找长度`：所有查找过程中进行关键字的比较次数的平均值

### 顺序查找

又称为线性查找

```c
//顺序查找算法
typedef struct{
    ElemType *elem;
    int TableLen;//表的长度
    
}SSTable;
//顺序查找
int Search_seq(SSTable ST,ElemType key){
    int i;
    for(i=0;i<ST->TableLen&&ST->elem[i]!=key;++i);
    //查找成功，则返回元素下标，查找失败返回-1
    return i==ST->TableLen? -1:i;
}
```

改进：

哨兵算法：把数组第1个（下标为0）放查找目标，从后往前找，有点是不需要判断是否成功，不需要判断i是否越界

效率分析：

![image-20251012195956898](/coding_images/image-20251012195956898.png)

每一次可能都认为是1/n

进一步优化（有序表）

![image-20251012200352437](/coding_images/image-20251012200352437.png)

构造查找判定树，紫色为失败结点，圆形为成功结点，共n+1个失败结点，加两个n是因为最底下的两个失败节点查找次数都为n

### 折半查找

**适用于有序的顺序表，每次通过计算查找范围中点，判断查找位置在哪一半来减少查找范围，直到low和high重合，找到/找不到最终查找结果**

```c
//折半查找算法
int binary_search(SSTable L,ElemType key){
    int low=0,high=L->TableLen-1,mid;
    while(low<=high){
        mid = (low+high)/2；
        if(L->elem[mid]==key)
            return mid;
        else if(L->elem[mid]>key)
            high=mid-1;
        else 
            low=mid+1;
    }
    return -1;
}
```

==折半查找直适用于有序的顺序表==

![image-20251012201935371](/coding_images/image-20251012201935371.png)

构造查找判定树，方法同顺序查找 **n个成功结点就有n+1个失败结点**

![image-20251012202318641](/coding_images/image-20251012202318641.png)

==注意：右子树结点树-左子树节点数=0或1==

![image-20251012202458315](/coding_images/image-20251012202458315.png)

### 分块查找

基本思想：快内无序，快间有序

![image-20251012235805890](/coding_images/image-20251012235805890.png)

 算法过程如下：

1.在索引表中确定待查记录所属的分块

2.在块内顺序查找 

3.采用折半查找在索引表中找，这半查找失败后从low所指的小块中查找

==若索引表中不包含目标关键字，则折半查找索引最终停在low>high，要在low所指分块中查找（low所指的索引表内容比目标关键字大）==

==若low所指的索引超过范围，则直接查找失败==

![image-20251013105229877](/coding_images/image-20251013105229877.png)

折半查找：找27需要四次

第一次mid=30 27<30  high=mid-1

第二次mid=10  10<27  low=mid+1

第三次mid=20 20<27 low=mid+1 此时low>mid

第四次块内查找，找到27

**ASL效率分析**

![image-20251013111410428](/coding_images/image-20251013111410428.png)

ASL计算式子是由于n=sb，将b用1/s替换可得此式子

**ASL最小值为根号n+1**

折半查找ASL不会考查

优化：使用**链式存储**，在插入数据时就不需要移动后面所有数据

### 二叉排序树

又称二叉查找树（BST）一棵二叉树或者空二叉树或者是具有如下性质的二叉树：

左子树上所有结点的关键字均小于根节点的关键字

右子树上所有结点的关键字均大于根节点的关键字

左子树和右子树又各是一棵二叉排序树

左子树<根节点<右子树

==中序遍历可以得到升序==

#### 查找算法：

若树为非空，目标值与根节点的值进行比较，若相等，则查找成功，若小于根节点，则在左子树上找，否则在右子树上找，进行循环，若查找成功，返回结点指针，查找失败返回NULL

```c
//二叉排序树的查找
typedef struct BSTNode{
    int key;
    struct BSTNode *lchild,*rchild;
}BSTNode,*BSTree;
//在二叉排序树中查找值为key的结点
BSTNode *BST_Search(BSTree T,int key){
    while(T!=NULL&&KEY!=T->key){
        if(key<T->key) T=T->lchild;
        else T=T->rchild;
    }
    return T;
}
```

#### 二叉排序树的插入

```c
//二叉树排序树的插入(递归实现)
Int BST_Insert(BSTree &T,int k){
    if(T==NULL){   //树为空，新插入的结点为根结点
        T=(BSTree)malloc(sizeof(BSTNode));
        T->key=k;
        T->lchild=T->rchild=NULL;
        return 1; //返回1，插入成功
    }
    else if(k==T->key)//树中存在相同关键字的结点，插入失败
        return 0;
    else if(k<T->key)//插入到T的左子树
        return BST_Insert(T->lchild,k);
    else //插入到T的右子树
        return BST_Insert(T->rchild,k);
}
```

最坏空间复杂度O(h) h是树高度

![image-20251013190011149](/coding_images/image-20251013190011149.png)

#### 二叉排序树的删除

1.若删除对象为叶子结点，直接删除

2.若删除对象只有一颗左子树或者右子树，则让z的子树称为z父节点的子树，替代z的位置

3.

![image-20251013190456655](/coding_images/image-20251013190456655.png)

用中序遍历右子树的第一个替代

![image-20251013190554921](/coding_images/image-20251013190554921.png)

也可以用中序遍历整棵树序列z的前驱替代

#### ASL分析

![image-20251013190820735](/coding_images/image-20251013190820735.png)

树高度越小，效率越高

失败ASL分析：

![image-20251013191037369](/coding_images/image-20251013191037369.png)

### 平衡二叉树

定义：简称平衡树（AVL树）--树上任一结点的左子树和右子树的高度之差不超过1。也是二叉排序树

结点平衡因子=左子树高-右子树高

故平衡因子只有可能为-1,1,0

#### 插入

插入结点后，平衡性会改变，需要从插入点往回找到第一个不平衡结点，调整以该节点为根的子树

![image-20251014115803410](/coding_images/image-20251014115803410.png)

1.LL（左孩子左子树插入导致不平衡）

![image-20251014124619362](/coding_images/image-20251014124619362.png)

2.RR

![image-20251014140526478](/coding_images/image-20251014140526478.png)

代码：

![image-20251014140840641](/coding_images/image-20251014140840641.png)

3.LR

![image-20251014141006900](/coding_images/image-20251014141006900.png)

4.RL

![image-20251014141116456](/coding_images/image-20251014141116456.png)

只有左孩子才会进行右旋操作，只有右孩子才会进行左旋操作

![image-20251014141234364](/coding_images/image-20251014141234364.png)

进行调整以后，树的高度会恢复成原来的样子

查找效率分析

时间复杂度不超过O（h）

假设以Nh表示深度为h的平衡二叉树中含有的最少结点数

则有N0=0，N1=1，N2=2，并且有Nh=Nh-1+Nh-2+1 解释：根节点+左子树的最少节点数+右子树的最少节点数

![image-20251014142528695](/coding_images/image-20251014142528695.png)

==平衡二叉树是难点和重点==

插入操作：

插入新结点后，要保持二叉排序树的特性不变（左<中<右）

若插入新结点导致不平衡，需要调整平衡

这一块王道讲的不咋地

**左旋：冲突的左孩子变右孩子**

**右旋：冲突的右孩子变左孩子**

**`LL`（插入节点在失衡结点的左孩子的左子树上）：失衡结点右旋**

**`RR`（插入节点在失衡结点的右孩子的右子树上）：失衡结点左旋**

**`LR`（插入节点在失衡结点的左孩子的右子树上）：左孩子左旋，失衡节点右旋**

**`RL`（插入节点在失衡节点的右孩子的左子树上）：右孩子右旋，左旋失衡结点**

若有多个节点失衡，只要调整距离插入节点最近的即可

#### 删除

也可能不平衡，需要重新调整最小不平衡子树

![image-20251014172601778](/coding_images/image-20251014172601778.png)

删除操作步骤

1.删除结点

若删除的结点是叶子，直接删

若删除结点只有一个子树，用子树顶替删除位置

若删除的结点有两颗子树，用前驱的结点顶替，并转换为对前驱结点的删除

![image-20251014173904839](/coding_images/image-20251014173904839.png)

![image-20251014173937023](/coding_images/image-20251014173937023.png)

![image-20251017210417218](/coding_images/image-20251017210417218.png)

只要删除完以后调整失衡结点使其保持性质即可

### 红黑树

平衡二叉树的插入和删除时平衡特性很容易被破坏，且插入和删除时间开销大

而红黑树在插入和删除时不会破坏“红黑特性”，无需频繁调整树的形态，即便需要调整，一般都可以在常数级时间内完成

**二叉树适合查，但插入删除很少的场景；红黑树适合频繁插入删除的场景，实用性更强**

红黑树大概咋考：

选择题：定义和性质

手绘插入过程，不会考查代码

#### 定义

1.首先红黑树是二叉排序树  左<根<右

2.要求：

1.每个节点要么是红色要么是黑色

2.根节点是黑色的

3.叶子结点一定是黑色（外部节点，失败结点，空节点）

4.不存在两个相邻（指父子结点，兄弟节点允许）的红节点，红节点的孩子一定不是红，而是黑

5.从一个结点出发，到达下面任何一个叶子结点，所经过的黑节点数量相同。

口诀：左根右 根叶黑 不红红 黑路同

![image-20251017185758814](/coding_images/image-20251017185758814.png)

#### 性质

1.从根节点到叶子节点的最长路径不大于最短路径的两倍

2.从n个内部节点的红黑树高度h<=log2(n+1)

![image-20251017190952565](/coding_images/image-20251017190952565.png)

#### 插入

1.先查找，确定插入位置，插入新节点

`新节点是根`--染为黑色（其他情况默认插入红色）

`插入结点的叔叔是红色`--叔父爷变色，爷爷变插入结点，根据爷爷的叔叔的颜色重新判定（递归）

`插入节点的叔叔为黑色`--（LL,RR,LR,RL)旋转，然后变色

#### 删除（很复杂）

`只有左子树or右子树的情况`：红色结点不可能只有左子树或右子树，直接让孩子代替后，变黑色

`没有孩子`：

如果是红节点：删除后无需任何操作，但是如果是黑节点（不包括空节点），肯定会破坏黑路同，此时引入双黑结点，用双黑节点替代经过它的所有路径都会少一个黑节点。在完成处理后变回单黑

此时需要考虑该节点的兄弟结点的情况

![image-20251017212732621](/coding_images/image-20251017212732621.png)

![image-20251017212936707](/coding_images/image-20251017212936707.png)

![image-20251017213527920](/coding_images/image-20251017213527920.png)

![image-20251017213858455](/coding_images/image-20251017213858455.png)

单黑就是空节点

待补充





重要考点：

![image-20251018170756021](/coding_images/image-20251018170756021.png)

考的可能性比较小

**红黑树注意力放在定义，性质，插入，删除不会考**

### B树

 五叉查找树：

![image-20251018171725702](/coding_images/image-20251018171725702.png)

定义：

`平衡`：所有叶子结点都在同一层

`有序`：结点内有序，任一元素的左子树都小于它，右子树都大于它

`多路`：![image-20251018173432841](/coding_images/image-20251018173432841.png)

==注意是上取整==

示例：

![image-20251018173515425](/coding_images/image-20251018173515425.png)

依次往后比，大的往后走，比该节点小的就往下走，一直走到目标节点/失败结点

#### 插入

利用查找算法，找到插入的位置，插入位置在叶子节点那一层，若无上溢出，则无事发生，若超过了个数（上溢出），则中间元素（m/2取整）上移，两边分裂

分裂过程：

![image-20251018174013696](/coding_images/image-20251018174013696.png)

![image-20251018174024392](/coding_images/image-20251018174024392.png)

若父结点也上溢出，继续上移，然后分裂，直到不会再上溢出为止，若一直到根节点继续上溢出，则继续上移+分裂，但是树高会增加

#### 定义性质

**如果是4个，则中间元素是第二个**

B树中所有结点的孩子个数最大值称为B树的阶，用m表示，B树所满足的特性：

1）树中每个结点至多有m棵子树，即至多含有m-1个关键字。

2）若根结点不是终端结点，则至少有两棵子树。

3）除根结点外的所有非叶结点至少有[m/2]（上取整）棵子树，即至少含有m/2]-1个关键字。

4）需要时二叉排序树

5）所有的叶结点都出现在同一层次上，并且不带信息（可以视为外部结点或类似于折半查找判定树的查找失败结点，实际上这些结点不存在，指向这些结点的指针为空）。

问：n个关键字的m阶b树，最小高度和最大高度是多少？

最小：

![image-20251018202743334](/coding_images/image-20251018202743334.png)

最大：

![image-20251018203607215](/coding_images/image-20251018203607215.png)

解不等式可以得到h的范围![image-20251018203157820](/coding_images/image-20251018203157820.png)

==n个关键字的B树必有n+1个叶子结点==

#### 删除

1.若删除关键字在终端结点，则直接删除该关键字（要注意节点关键字个数是否低于下限[m/2]-1)

如果低于下限：

①看看右兄弟够不够借，如果很宽裕，可以用当前节点的后继、后继的后继来填补空缺，后继的后继顶替后继，后继顶替删除元素

②右兄弟不够，就看看左兄弟，左兄弟宽裕的话，用当前节点的前驱、前驱的前驱来填补空缺，具体同上

③如果左右兄弟都不够借，若被删除关键字所在结点删除前的关键字个数低于下限，且此时与该节点相邻的左右兄弟节点的关键字个数均=`[m/2](上取整)-1`,则将关键字删除后与左或右兄弟节点及其双亲节点中的关键字进行合并（注意双亲如果违法也要合并),这样可能会将树的高度-1

2.若删除关键字是非终端节点，则用直接前驱（左子树中最大的）或直接后继（右子树中最小的）来顶替被删除的关键字

![image-20251018205445462](/coding_images/image-20251018205445462.png)

### B+树

#### 定义

对于一个m阶的B+树：

1.每个分支最多有m棵子树（孩子结点）

2.非叶根节点至少有两颗子树，其他每个分支结点至少有`[m/2](上取整)`棵子树。

3.==结点的子树个数与关键字个数相等==（B树和B+树的明显区别）

4.所有叶子节点包含全部关键字及指向响应记录的指针，叶子节点中将关键字按大小顺序排列，并且相邻叶子结点按大小顺序相互链接起来。

5.所有分支结点中仅包含它的各个子节点中关键字的最大值及指向其子节点的指针。

![image-20251019140951020](/coding_images/image-20251019140951020.png)

#### 查找

==B+树中，无论查找成功与否，最终一定都要走到最下面一层结点因为分支节点并不能反应结点关键字的具体情况==

![image-20251019142446850](/coding_images/image-20251019142446850.png)