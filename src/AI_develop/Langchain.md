# Langchain（dark horse）

## OpenAI调用大模型

```python
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage

load_dotenv()

import os 
from openai from OpenAI

api_key = os.getenv("DEEPSEEK_API_KEY")

client = OpenAI(
   api_key = api_key,
   base_url = "https://api.deepseek"
)
```

  ![image-20260921214653332](/Langchain_images/image-20260921214653332.png)

大模型应用：把大模型的能力和传统编程能力结合起来

任务规划 - 查询天气 - 搜索景点 

![image-20260922143325064](/Langchain_images/image-20260922143325064.png)

其中，分析工具返回结果和调用函数的过程由langchain框架执行

![image-20260922143913949](/Langchain_images/image-20260922143913949.png)

## langchain使用模型

1、引入依赖（uv）

2、配置环境（apikey）

3、初始化模型

```python
from langchain.chat_models import init_chat_model
model = init_chat_model(model="deepseeek-chat")

```

invoke:阻塞式调用

每次花的时间多一些，但是一起出结果

stream：流式响应

每次只传回一个片段，流式传数据回来

## 消息

![image-20260922204319411](/Langchain_images/image-20260922204319411.png)

在langchain中，已经归好了四类消息子类，不用写字典，直接调子类就好

![image-20260922204531543](/Langchain_images/image-20260922204531543.png)

`for message in response['messages']`

``message.pretty_print()`这个很方便，从繁琐的json中筛选的message

## prompt

系统提示词在创建只能提到时候就直接传入，这样不用反复在message的时候传入了

```python
from langchain.agents import create_agent
from langchain.messages import HumanMessage

# 创建智能体
agent = create_agent(
    model = "deepseek-chat",
    system_prompt="你以海盗的口吻来回答用户问题。"
)

# 调用智能体
for token, metadata in agent.stream(
    {"messages": [HumanMessage(content="你是谁？")]},
    stream_mode="messages"
):
    print(token.content, end="", flush=True)
```

# 2.提示词工程

所谓**提示词工程（Prompt Engineering）**，就是通过优化提示词使模型输出的结果更符合业务需要的过程。

一般来说，系统提示词（System Prompt)会包含以下几个部分，通常按此顺序排列：

- **身份角色（Identity）**：描述AI的职责、沟通风格和总体目标。
- **指令说明（Instructions）**：请指导模型如何生成所需的响应。它应该遵循哪些规则？模型应该做什么，以及模型绝对不能做什么？
- **对话示例（Examples）**：提供可能的输入示例，以及模型期望的输出。
- **背景信息（Context）**：向模型提供生成响应所需的任何额外信息，例如RAG的额外知识库数据，或您认为特别相关的任何其他数据。

在编写System Prompt时，您可以使用Markdown格式和XML 标签的组合来帮助模型理解提示和上下文数据的逻辑边界。

- **Markdown** 的标题和列表有助于标记提示的不同部分，并向模型传达层级结构。它们还可以提高开发过程中提示的可读性。
- **XML** 标签可以帮助明确区分一段内容（例如用作参考的辅助文档）的起始和结束位置。

==要尽可能的下达更清晰的指令==

身份/指令/示例（效果最好，可以规定输出内容限制，也可以规定输出内容的格式，如json）

### 基于Model的结构化输出

- 定义一个数据类型
- 创建智能体，设置输出格式

```python
from pydantic import BaseModel

# 首先，我们定义一个类，用来封装模型要输出的数据：
class CapitalInfo(BaseModel):
    name: str
    location: str
    vibe: str
    economy: str
# 我们可以创建智能体时设置结构化输出的格式，LangChain会自动帮我们完成提示词改造和响应结果解析。
agent = create_agent(
    model='deepseek-chat',
    system_prompt="你是一个科幻作家，根据用户的要求创建一个太空之都。",
    response_format=CapitalInfo # 设置结构化输出的格式
)

response = agent.invoke(
    {"messages": [HumanMessage(content="月球的首都是什么?")]}
)
# 输出结果
print(response)
```

==这样写模型会返回一个结构化输出字段，获取这个字段就可以得到结构化输出了==

## 工具（tools）

智能体吧工具信息做组装，然后发给模型

![image-20260923163236053](/Langchain_images/image-20260923163236053.png)

### Tool没描述工具

利用tool装饰器，来定义工具名和工具作用

```python
from langchain_core.tools import tool

@tool("square_root", description="Calculate the square root of a number")
def tool1(x: float) -> float:
    return x ** 0.5


from langchain_core.tools import tool

def shared_func(x):
    return x*2

# 实例1
tool_a = tool(name="double1", description="乘2版本1")(shared_func)
# 实例2
tool_b = tool(name="double2", description="乘2版本2")(shared_func)
```

创建tool实例，多个实例可以同时用一个底层函数，但是一个实例只能用一个底层函数

注意区分真实函数名和工具注册名的区别

```python
# 定义一个查询天气的tool
@tool
def get_weather(location: str, units: str = "celsius", include_forecast: bool = False) -> str:
    """
    Get current weather and optional forecast.
    Args:
        location: city name or coordinates
        units: unit of degrees
        include_forecast: does it include the weather forecast
    """
    temp = 22 if units == "celsius" else 72
    result = f"Current weather in {location}: {temp} degrees {units[0].upper()}"
    if include_forecast:
        result += "\nNext 5 days: Sunny"
    return result
```

![image-20260923170443932](/Langchain_images/image-20260923170443932.png)

![image-20260923170455905](/Langchain_images/image-20260923170455905.png)

### Web搜索

langchian中很多已经集成过的工具eg:

tavily:用来做web搜索的工具

用法：

- 注册账号，创建apikey
- 配置环境变量：TAVILY_API_KEY
- 安装依赖：`uv add langchain-tavily`

```python
from langchain_tavily import TavilySearch

search_tool = TavilySearch(
    max_results=5,
    topic="general", # general, news, finance
    # include_answer=False,
    # include_raw_content=False,
    # include_images=False,
    # include_image_descriptions=False,
    # search_depth="basic",
    # time_range="day",
    # include_domains=None,
    # exclude_domains=None
)
#直接调用即可
search_tool.inoke("帮我检索一下上海好吃的火锅")
# 创建智能体，使用预定义工具
agent = create_agent(
    model = "deepseek-chat",
    tools = [search_tool],
    system_prompt = "你是一个智能助手..."

)

response = agent.invoke(
    {"messages":[HumanMessages(conten = "找好吃的火锅")]},
 )
for meesage in response['message']:
    message.pretty_print()
```

### 搜索优化

问题：

- 官方默认的tavily工具比较复杂
- 结果中不包含网页数据源，可信度低

解决：

- 自定义tavily工具
- 结构化输出

```python
tavily = TavilySearch(
    max_results = 5,
    topic = "general"
)
#利用tool装饰器封装为工具
@tool
def web_search(query: str):
    """Search the web for information"""
    return tabily.invoke(query)

```

定义结构化输出实体：

```python
from pydantic import BaseModel,Field

# Agent回答内容引用的网页信息
class AnserInfo(BaseModel):
    title: str = Field(description = "")
```

## 短时记忆

没记忆：

```python
from langchain.agents import create_agent
#第一次
agent = create_agent(model = "deepseek-chat")
from langchian.message import HumanMessage
resonse = agent.invoke(
    {
        "message":[HumanMessage(content="你好，我叫虎哥，我最喜欢猫猫")]
    })

print(response)

# 第二次
response = agent.invoke(
    {"message":[HumanMessage(content="我最喜欢什么动物")]}
)
print(response)
#模型不知道，无记忆
```

添加记忆：

- 导入并初始化Checkpointer
- 创建Agent，指定Checkpointer
- 调用Agent，指定thread_id

记忆分类：

- 短期记忆：当前任务或会话的上下文
- 长期记忆：跨任务或会话的经验与知识 

==长期记忆需要使用向量数据库，langchain只能实现短期记忆==

使用**agentstate**的状态机

- langchain提供了Checkpointer对象来保存AgentState，每一次用户与AI的交互都会生成一个快照，记录为一个checkpoint（快照，生成记忆，方便回滚）

- 同一个会话的多个checkpoint形成一个组，用同一个thread_id来标记

```python
from langchain.agents import create_agent
from langgraph.checkpoint.memory import InMemorySever

agent = create_agent(
    "gpt-5",
    tools = [get_user_info],
    checkpointer = InMemorySever(),
    
)
agent.invoke(
    {"message":[{"role":"user","content":"..."}]},
    {"configurable":["thread_id":"1"]},
)
```

长期记忆（数据库存储）

![image-20261005001009246](/Langchain_images/image-20261005001009246.png)

导入 -> 初始化建表 -> 使用智能体

- 导入依赖
- 初始化checkpointer
- 自动建表
- 创建Agent，指定checkpointer

![image-20261006011240759](/Langchain_images/image-20261006011240759.png)

check_same_thread检测线程的，取false，避免报错

调用后会在resource文件夹中生成一个数据库文件

### 记忆管理策略

为了解决大模型上下文限制导致历史记忆丢失的问题

- 修剪（trim）：想一出前N条或后N条消息，再调用模型，能解决上下文简直，但是记忆不完整了，记忆丢失风险很大
- 删除（delete）：永久删除AgentState的快照，不是删除历史记忆的一部分，而是直接删除快照，无法回滚。
- 总结摘要（summarize）：先总结历史消息中的早期消息，得到消息摘要。然后用消息摘要和最近的消息形成消息列表，然后再调用模型。（推荐使用）
- 自定义：自己用比较合适的方案

 ![image-20261006014257566](/Langchain_images/image-20261006014257566.png)

总结使用summarize中间件

