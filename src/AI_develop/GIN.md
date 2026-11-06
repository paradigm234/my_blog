# GIN

## 0.0 Web本质

关于web开发：

- web是基于HTTP协议进行交互的应用网络
- web是通过使用浏览器/app访问的各种资源

request / response

网络编程demo：

```go
package main

import (
	"fmt"
	"net/http"
)

func sayHello(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hello,golang")

}
func main() {
	//访问hello，就执行sayHello
	http.HandleFunc("/hello", sayHello)
	//指定访问端口
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("http listen err:", err)
		return
	}

}
```

## 1.1 GIN框架简介

框架中文文档链接：

[gin框架中文文档](https://gin-gonic.com/zh-cn/docs/)

gin是一个Go语言编写的web框架，它是一个类似于martini但是有更好的性能的api框架，使用了httprouter，提高速度，有极致的性能和效率，是当今世界最流行的goweb框架

```shell
go get -u github.com/gin-gonic/gin
```

gin框架：简单路由实现

```go
package main

import "github.com/gin-gonic/gin"

func sayhello(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "hello world",
	}) //gin.H()是空接口
}

func main() {
	//创建路由引擎，返回默认路由引擎
	r := gin.Default()

	//访问时执行sayhello这个函数
	r.GET("/hello", sayhello)

	//启动服务我
	r.Run("localhost:8080")
}

```

http请求的四个动作:

- GET:用来获取资源
- PUT：用来新建资源
- DELETE：用来更新资源
- POST：用来删除资源

gin的工作流程：

- 创建Web服务`gin.Default`
- 路由注册
- 接收和处理请求：`gin.Context`,`Query()`,`ShouldBindJSON()`
- 返回响应：`JSON()`,`String()`,`XML()`
- 启动服务:`Run()`

![image-20261102153659731](/gin_images/image-20261102153659731.png)

## 2.1 获取参数

获取querystring参数：

`querystring`指的是URL中`?`后面携带的参数，例如：`/user/search?username=小王子&address=沙河`。 获取请求的querystring参数的方法如下：

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
    //
	r := gin.Default()
    //注册一个GET请求接口
	r.GET("/user/search", func(c *gin.Context) {
        //username是参数名，mike是默认名
		username := c.DefaultQuery("username", "mike")

		address := c.Query("address")
		//输出json结果给调用方
		c.JSON(http.StatusOK, gin.H{
		"username": username,
		"address":  address,
		"message":  "ok",

	})
	})

	r.Run(":8080")
}
```

![image-20261104160052500](/gin_images/image-20261104160052500.png)

- `c.JSON()`是gin.context提供的方法，用于向客户端返回JSON格式中的HTTP响应

- c.JSON(http状态码，JSON数据)

- gin.h()就是gin框架中创建一个map字典，然后由字典转成json键值对
- `r.Run()就是启动Gin服务`

获取form参数：

当前端请求的数据通过form表单提交时，例如向`/user/search`发送一个POST请求，获取请求数据的方式如下：

```go
package main

import "github.com/gin-gonic/gin"
func main() {
r := gin.Default()
r.POST("/user/search",func(c *gin.Context) {
	username := c.PostForm("username")
	address := c.PostForm("address")
	//输出json结果给调用方
	c.JSON(200, gin.H{
		"username": username,
		"address":  address,
		"message": "ok",
	})
	
})
r.Run()
}
```

- 这个是从客户端传给服务器的post请求中获得信息，然后写响应逻辑

获取JSON参数：

当前端请求的数据通过JSON提交，例如向`/json`发送一个JSON格式的POST，则获取请求参数的方式如下：

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)
func main() {
r := gin.Default()
r.POST("/json", func(c *gin.Context) {
	//下面忽略了错误处理
	b,_ := c.GetRawData()//从c.request.body读取请求数据
	//定义map或结构
	var m map[string]interface{}
	//反序列化
	_ = json.Unmarshal(b, &m)
    //返回JSON
	c.JSON(http.StatusOK, m)
	
})

}
```

- `c.GetRawData()`:读取请求体原始数据，得到原始字节数据[]byte类型
- `json.Unmarshal()`:将JSON数据进行反序列化成GO数据，接收两个参数（JSON字节数据，接收解析结果的变量地址）
- `map[string]interface{}`:Go中用于存储键值对的map，string是key的类型，interface{}表示value可以存储不同类型的数据，所以是空接口

获取path参数：

请求的参数通过URL路径传递，例如：/user/search/小王子/沙河。获取请求URL路径中参数的方式如下

```go
func main() {
	//Default返回一个默认的路由引擎
	r := gin.Default()
	r.GET("/user/search/:username/:address", func(c *gin.Context) {
		username := c.Param("username")
		address := c.Param("address")
		//输出json结果给调用方
		c.JSON(http.StatusOK, gin.H{
			"message":  "ok",
			"username": username,
			"address":  address,
		})
	})

	r.Run(":8080")
}
```

- `c.Param()`:从URL路径本身获取参数

参数绑定：

为了能够更方便的获取请求相关参数，提高开发效率，我们可以基于请求的`Content-Type`识别请求数据类型并利用反射机制自动提取请求中`QueryString`、`form表单`、`JSON`、`XML`等参数到结构体中。 下面的示例代码演示了`.ShouldBind()`强大的功能，它能够基于请求自动提取`JSON`、`form表单`和`QueryString`类型的数据，并把值绑定到指定的结构体对象。

**客户端提交数据 → Gin 自动解析 → 填充到 Login 结构体 → 验证数据 → 返回响应。**

```go
// Binding from JSON
type Login struct {
	User     string `form:"user" json:"user" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

func main() {
	router := gin.Default()

	// 绑定JSON的示例 ({"user": "q1mi", "password": "123456"})
	router.POST("/loginJSON", func(c *gin.Context) {
		var login Login

		if err := c.ShouldBind(&login); err == nil {
			fmt.Printf("login info:%#v\n", login)
			c.JSON(http.StatusOK, gin.H{
				"user":     login.User,
				"password": login.Password,
			})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	})

	// 绑定form表单示例 (user=q1mi&password=123456)
	router.POST("/loginForm", func(c *gin.Context) {
		var login Login
		// ShouldBind()会根据请求的Content-Type自行选择绑定器
		if err := c.ShouldBind(&login); err == nil {
			c.JSON(http.StatusOK, gin.H{
				"user":     login.User,
				"password": login.Password,
			})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	})

	// 绑定QueryString示例 (/loginQuery?user=q1mi&password=123456)
	router.GET("/loginForm", func(c *gin.Context) {
		var login Login
		// ShouldBind()会根据请求的Content-Type自行选择绑定器
		if err := c.ShouldBind(&login); err == nil {
			c.JSON(http.StatusOK, gin.H{
				"user":     login.User,
				"password": login.Password,
			})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	})

	// Listen and serve on 0.0.0.0:8080
	router.Run(":8080")
}
```

`shouldbind`会按照下面的顺序解析请求中的数据完成绑定：

- 如果是GET请求，只是用Form绑定引擎
- 如果是POST请求，首先检查`content-type`是否为`json`或者`XML`，然后再使用Form（form-data）

备注：

- `login`结构体：一个数据接收模版，相当于创建了专门用来存储登录信息的变量
- `shouldbind`先根据数据类型，自动选择绑定器，然后填充login结构体，最后返回是否成功

## 2.2 文件上传

后端gin框架部分代码：

```go
func main() {
	router := gin.Default()
	// 处理multipart forms提交文件时默认的内存限制是32 MiB
	// 可以通过下面的方式修改
	// router.MaxMultipartMemory = 8 << 20  // 8 MiB
	router.POST("/upload", func(c *gin.Context) {
		// 单个文件
		file, err := c.FormFile("f1")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": err.Error(),
			})
			return
		}

		log.Println(file.Filename)
		dst := fmt.Sprintf("C:/tmp/%s", file.Filename)
		// 上传文件到指定的目录
		c.SaveUploadedFile(file, dst)
		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("'%s' uploaded!", file.Filename),
		})
	})
	router.Run()
}
```

多个文件上传：

```go
func main() {
	router := gin.Default()
	// 处理multipart forms提交文件时默认的内存限制是32 MiB
	// 可以通过下面的方式修改
	// router.MaxMultipartMemory = 8 << 20  // 8 MiB
	router.POST("/upload", func(c *gin.Context) {
		// Multipart form
		form, _ := c.MultipartForm()
		files := form.File["file"]

		for index, file := range files {
			log.Println(file.Filename)
			dst := fmt.Sprintf("C:/tmp/%s_%d", file.Filename, index)
			// 上传文件到指定的目录
			c.SaveUploadedFile(file, dst)
		}
		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("%d files uploaded!", len(files)),
		})
	})
	router.Run()
}
```

## 3 重定向

HTTP重定向，内部外部都支持

简单来说：服务器高速可不换，原来要访问的地址不能用了，需要去另一个地址

返回状态码：302

eg:

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()

    r.GET("/old", func(c *gin.Context) {
        //核心代码
        c.Redirect(http.StatusMovedPermanently, "/new")
    })

    r.GET("/new", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "这是新的页面",
        })
    })

    r.Run(":8080")
}
```

- 注册旧地址
- 执行重定向
- 访问新地址

路由重定向：

**不让客户端重新发送HTTP请求，而是再服务器内部修改当前请求的路径，绕过Gin重新匹配路由**

```go
r.GET("/test", func(c *gin.Context) {
    // 指定重定向的URL
    c.Request.URL.Path = "/test2"
    r.HandleContext(c)
})
r.GET("/test2", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"hello": "world"})
})
```

- `c.Request.URL.Path` :改变请求对象的路径，但是只是修改服务器内存的请求对象，不改浏览器地址栏，也没有通知客户端跳转

- `r.HandleContext(c)`:用来使用当前上下文重新处理请求，重新匹配到重定向后的路由地址

![image-20261105145815052](/gin_images/image-20261105145815052.png)

## 4 Gin路由

普通路由：

```go
r.GET("/index", func(c *gin.Context) {...})
r.GET("/login", func(c *gin.Context) {...})
r.POST("/login", func(c *gin.Context) {...})
```

any方法：

```go
r.Any("/test", func(c *gin.Context) {...})
```

- any可以让同一个路由同时处理多种HTTP的请求方法
- 用于需要让同一个URL接受多种请求方法的场景，通常还是区分方法

为没有配置处理函数的路由添加处理程序，默认情况下返回404代码，下面的代码为没有匹配到路由的请求都返回`"views/404.html"`页面

```go
r.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusNotFound, "views/404.html", nil)
	})
```

- `r.NoRoute()`:处理未匹配路由的情况
- 当客户端请求的URL没有匹配到任何已经注册的路由的时候，就执行这个Handler

## 5 路由组

我们可以将拥有共同URL前缀的路由划分为一个路由组。习惯性一对`{}`包裹同组的路由，这只是为了看着清晰，用不用`{}`包裹功能上没什么区别。

```go
func main() {
	r := gin.Default()
	userGroup := r.Group("/user")
	{
		userGroup.GET("/index", func(c *gin.Context) {...})
		userGroup.GET("/login", func(c *gin.Context) {...})
		userGroup.POST("/login", func(c *gin.Context) {...})

	}
	shopGroup := r.Group("/shop")
	{
		shopGroup.GET("/index", func(c *gin.Context) {...})
		shopGroup.GET("/cart", func(c *gin.Context) {...})
		shopGroup.POST("/checkout", func(c *gin.Context) {...})
	}
	r.Run()
}
```

路由组的括号嵌套：

```go
shopGroup := r.Group("/shop")
	{
		shopGroup.GET("/index", func(c *gin.Context) {...})
		shopGroup.GET("/cart", func(c *gin.Context) {...})
		shopGroup.POST("/checkout", func(c *gin.Context) {...})
		// 嵌套路由组
		xx := shopGroup.Group("xx")
		xx.GET("/oo", func(c *gin.Context) {...})
	}
```

原理：调用httprouter这个库，原理是框架内构造一个路由地址的前缀树

## 6 中间件

**中间件可以理解为请求处理过程中的一个拦截器，可以再业务代码执行前后做一些事情**

- 为了解决代码重复，维护困难的问题
- 为了解决业务逻辑和公共逻辑混在一起的问题

![image-20261105152838349](/gin_images/image-20261105152838349.png)

eg：

```go
func MyMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        fmt.Println("请求开始")

        c.Next()

        fmt.Println("请求结束")
    }
}
```

- `gin.HandleFunc`:是Gin定义的一种函数类型，本质上是接受`*gin.context()`参数，没有返回值的函数
- 下面跟一个返回匿名函数，然后在匿名函数中写中间件的处理逻辑
- `c.Next()`:暂停当前中间件，继续执行请求处理链中，后续的Handler或中间件，后续处理完成后，再回到`c.Next()`之后继续执行

main函数示例：

```go
package main

import (
    "fmt"
    "net/http"

    "github.com/gin-gonic/gin"
)

func MyMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        fmt.Println("中间件：请求开始")

        c.Next()

        fmt.Println("中间件：请求结束")
    }
}

func main() {
    r := gin.Default()
//使用中间件的代码
    r.Use(MyMiddleware())

    r.GET("/test", func(c *gin.Context) {
        fmt.Println("Handler：处理业务")

        c.JSON(http.StatusOK, gin.H{
            "message": "hello",
        })
    })

    r.Run(":8080")
}
```

- `r.Use()`:将中间件注册到当前Gin路由引擎

==Gin也支持全局中间件，也就是作用于路由组的中间件==

中间件的中断请求：

```go
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")

        if token == "" {
            c.JSON(http.StatusUnauthorized, gin.H{
                "message": "请先登录",
            })

            c.Abort()
            return
        }

        c.Next()
    }
}
```

- `c.Abort()`:中止当前请求处理链，不再执行后面的中间件和业务逻辑

示例：记录接口耗时的中间件 

```go
// StatCost 是一个统计耗时请求耗时的中间件
func StatCost() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Set("name", "小王子") // 可以通过c.Set在请求上下文中设置值，后续的处理函数能够取到该值
		// 调用该请求的剩余处理程序
		c.Next()
		// 不调用该请求的剩余处理程序
		// c.Abort()
		// 计算耗时
		cost := time.Since(start)
		log.Println(cost)
	}
}
```

- `c.Set()`:再当前请求的上下文`gin.Context`中存储数据，方便后续的中间件或Handler读取和使用
- 这里相当于注册了name和小王子的键值对关系，后面可以用`c.Get()`把小王子取出来

**跨域中间件cors：**

因为浏览器有一个安全机制：同源策略（Same-Origin Policy）

浏览器判断两个 URL 是否同源，主要看三个部分：协议，域名，端口，有一个不同就是不同源。因此，前端向后端发起请求时，浏览器会执行跨域安全检查。

注意：跨域限制主要是浏览器实施的，不是 Go 后端本身不允许访问。Postman、curl 等工具通常不会受到浏览器同源策略的限制。

CORS:跨域资源共享

eg：

```go
package main

import (
    "net/http"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    // 配置跨域中间件
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
    }))

    r.GET("/test", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "hello",
        })
    })

    r.Run(":8080")
}
```

## 7 优雅停止（Graceful Shutdown）

核心思想：停止接收新的请求，等待正在处理的请求完成，然后再关闭服务器

![image-20261106182320233](/gin_images/image-20261106182320233.png)

实现：

```go
package main

import (
    "context"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"

    "github.com/gin-gonic/gin"
)

func main() {
    // 创建 Gin 引擎
    r := gin.Default()

    r.GET("/test", func(c *gin.Context) {
        time.Sleep(10 * time.Second)

        c.JSON(http.StatusOK, gin.H{
            "message": "请求处理完成",
        })
    })

    // 创建 HTTP Server
    server := &http.Server{
        Addr:    ":8080",
        Handler: r,
    }

    // 启动服务器
    go func() {
        if err := server.ListenAndServe(); err != nil &&
            err != http.ErrServerClosed {
            log.Fatalf("服务器启动失败: %v", err)
        }
    }()

    // 创建信号监听通道
    quit := make(chan os.Signal, 1)

    // 监听系统终止信号
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

    // 阻塞等待信号
    <-quit

    log.Println("正在关闭服务器...")

    // 创建 5 秒超时时间
    ctx, cancel := context.WithTimeout(
        context.Background(),
        5*time.Second,
    )
    defer cancel()

    // 执行优雅停机
    if err := server.Shutdown(ctx); err != nil {
        log.Fatal("服务器强制关闭:", err)
    }

    log.Println("服务器已退出")
}
```

- 创建HTTP Server，Addr和Handler
- 启动服务器`ser.ListenAndSever()`,监听指定端口，接收并处理请求
- `make(chan os.Singal,1)`创建一个信道监听操作系统的信号
- `signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)`监听这两个终止和中断信号
- `<-quit`从quit通道中接收数据，如果通道中没有数据，就一直阻塞等待

- 创建超时上下文，`context.Backgroud()`:上下文的起点，创建一个context

- 执行优雅停机

`server.Shutdown(ctx)` 会：

1. 关闭监听器，不再接受新的连接。
2. 关闭空闲连接。
3. 等待正在处理的请求完成。
4. 如果请求全部完成，则正常返回。
5. 如果超过 Context 设置的 5 秒期限，则返回错误。