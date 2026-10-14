# Python Web

![image-20261010112430835](/Pythonweb_images/image-20261010112430835.png)

## 0.0 python异步编程

async：

- 对于async定义的函数，返回的是协程对象，然后将协程对象放入时间循环中

- 协程对象是一个未开始执行的任务，要执行这个任务，必须通过事件循环来调度
- asyncio.run(协程名称),创建时间循环并开启
- Python中异步编程的时候，之所以需要协程而不是普通函数，主要是因为协程能支持暂停的恢复执行，普通的函数无法中断。

await：

- 任务挂起使用await关键字，暂停执行协程，直到异步操作完成，继续恢复执行后续代码流程
-  await 后面可以跟协程对象和future对象，其他类型会报错
- 一般情况下，await是一个协程函数的话，时间循环不会直接切换其他任务去执行。而是继续执行后面的协程函数

举例理解：

![image-20261011212407150](/Pythonweb_images/image-20261011212407150.png)

**每一个async def都定义一个coroutine，asyncio.run先把main变成task，然后放到事件循环中，执行main函数内部代码，打印开始时间，然后await say_after做两件事：先把main挂起，再将该coroutine挂在main的task中，这里开始执行say_after的函数内容，say_after函数中还有一个sleep的任务，于是又把say_after挂起，执行sleep，执行完毕后继续执行say_after，打印出what，然后第一个say_after执行完毕，继续执行第二个say_after，执行完毕后，将main函数唤醒，print结束时间，时间循环结束，总共用时3秒钟。**

![image-20261011220307412](/Pythonweb_images/image-20261011220307412.png)

**`await` 一个 Task = 等一个已经在跑的东西;`await` 一个协程 = 现在、就地把它跑起来。**

以上只用两秒，gather也可以先把coroutine变成task

总结：时间循环在最上层，然后下层可以异步并发执行多个Task，而coroutine都是挂在task上的，在main的task获得控制权的时候将task1、task2放入事件循环，然后将await gather控制权还给时间循环，再异步将控制权给各个task并发执行。

## 0.1 FastApi简介

 ![image-20261012110652485](/Pythonweb_images/image-20261012110652485.png)

fastapi优点：

- 支持异步，性能高，速度很快
- 类型提示验证：Pytdantic类型提示与验证，减少手动校验代码
- 可交互式文档：自动生成可交互式文档，浏览器中直接调用和测试API

## 1.1 第一个fastapi程序

```python
##主入口文件
from fastapi import FastAPI

#创建fastapi的实例
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
```

运行终端命令行：

` uvicorn main:app --reload`

- main是主文件
- app是实例
- reload表示热更新

然后浏览器访问该端口，若需要测试可加/docs进入测试文档页面

![image-20261013003529970](/Pythonweb_images/image-20261013003529970.png)

## 1.2 路由

FastAPI的路由定义基于Python的装饰器模式

```python
@app.get("/")
async def root():
    return{"ok"}
```

![image-20261013010150807](/Pythonweb_images/image-20261013010150807.png)

## 1.3 参数简介和路径

参数分类：

1、路径参数（定资源）：

- 位置：URL路径的一部分
- 作用：指向唯一的特定资源
- 方法：GET

![image-20261013010551443](/Pythonweb_images/image-20261013010551443.png)

- 类型注解：path函数，可以给参数声明额外的类型限制

![image-20261013011243115](/Pythonweb_images/image-20261013011243115.png)

![image-20261013011249982](/Pythonweb_images/image-20261013011249982.png)

```python
@app.get("/book/{id}")
async def get_book(id: int = Path(...,gt=0,lt=100)):
    return {"id": id, "message": f"这是第{id}本书"}
```

2、查询参数

声明的参数不是路径参数，路径操作函数会把该参数自动解释为查询参数

- 位置：URL
- 作用：对资源集合进行过滤，排序，分页等操作
- 方法：GET
- 会拼接到url

![image-20261013115842009](/Pythonweb_images/image-20261013115842009.png)

```python
@app.get("/news/list")
async  def get_new_list(
        skip : int = Query(0,description="跳过的记录数 "),
        limit : int  = 10

):
    return {"skip" : skip, "limit" : limit}
```

3、请求体参数

用于创建更新资源

在http协议中，一个完整的请求由三部分组成：

- 请求行：包含方法，URL，协议版本
- 请求头：元数据信息
- 请求体：实际要发送的数据

请求体：

- 位置：HTTP请求的消息体重
- 作用：创建、更新资源携带大量数据
- 方法：POST/PUT

写法：

![image-20261014002421937](/Pythonweb_images/image-20261014002421937.png)

![image-20261014011605862](/Pythonweb_images/image-20261014011605862.png)

注解;

Field函数注解

![image-20261014011723030](/Pythonweb_images/image-20261014011723030.png)

## 1.4 响应类型

- JSON
- FILE
- HTML
- 异常处理响应
- 自定义响应

默认情况下，FastAPI会自动将路径操作函数返回的Python对象，由jsonable_encoder转换为JSON兼容格式，并包装为JSONResponse返回，这省去了手动序列化的步骤，专注业务逻辑就好，如果需要返回非JSON，FastAPI也提供了不同的数据

 ![image-20261014012417529](/Pythonweb_images/image-20261014012417529.png)

响应类型设置方式：

- 装饰器中指定响应类
- 返回响应对象

![image-20261014134945268](/Pythonweb_images/image-20261014134945268.png)

HTML格式：

```python
@app.get("/html",response_class=HTMLResponse)
async def get_html():
    return "<h1>这是一级标题</h1>"
```

文件格式（file）：

```python
@app.get("/file")
async def get_file():
    path = "./files/1.png"
    return FileResponse(path)
```

自定义响应格式：

![image-20261014150335714](/Pythonweb_images/image-20261014150335714.png)

异常响应：

```python
@app.get("/news/{id}")
async def get_news(id:int):
    id_list = [1,2,3,4,5,6,7,8,9,10,11,12,13]
    if id not in id_list:
        raise HTTPException(status_code = 404,detail = "您查找的新闻不存在")
    return {"id":id}

```

## 2.1 中间件

对于多个接口，都有需求的情况，可以使用中间件为每个请求进行前后添加统一的处理逻辑

![image-20261014203900706](/Pythonweb_images/image-20261014203900706.png)

中间件：函数的顶部使用装饰器`@app.middleware("http")`

```python
@app.middleware("http")
async def middleware(request,call_next):
    print('中间件开始处理 -- start')
    response = await call_next(request)
    print('中间件处理完成--end')
    return response
```

==多个中间件自底向上执行==

## 2.2 依赖注入

**使用依赖注入系统来共享通用逻辑，减少代码重复**

![image-20261014210127178](/Pythonweb_images/image-20261014210127178.png)

在注入形参中输入commons = Depends（注入函数名）

简单来说注入就是函数调用，只不过更方便 

创建依赖项 -> 导入Depends -> 声明依赖项

## 2.3 ORM简介

**ORM（Object - RelationalMapping，对象关系映射）是一种编程技术，用于在面向对象编程语言和关系型数据库之间建立映射。允许开发者通过操作对象的方式与数据库进行交互，而无需直接写复杂的SQL语句。**

- 减少重复的SQL代码
- 代码更简洁易读
- 自动处理数据库连接和事务
- 自动防止SQL注入攻击

![image-20261015003907375](/Pythonweb_images/image-20261015003907375.png)

安装 -> 建库、建标 -> 操作数据





