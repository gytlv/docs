# 线程的创建方式

## 继承Thread类方式

```java
package com.java.thread;

public class ExtThread extends Thread {
    @Override
    public void run() {
        System.out.println(this.getClass().getName() + "_当前线程id:" + Thread.currentThread().getId());
    }
}
//测试
new ExtThread().start();
```

## 实现runnable方式

```java
package com.java.thread;

public class ImpRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println(this.getClass().getName() + "_当前线程id:" + Thread.currentThread().getId());
    }
}
//测试
new Thread(new ImpRunnable()).start();
```

## 实现callable方式(有返回值)

### 返回值对象

```java
package com.java.thread.callable;

import java.io.Serializable;

public class User implements Serializable {
    private String name;
    private String age;

    public User(String name, String age) {
        this.name = name;
        this.age = age;
    }


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

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age='" + age + '\'' +
                '}';
    }
}
```

### 实现callable

````java
package com.java.thread.callable;

import java.util.concurrent.Callable;

public class ImpCallable implements Callable<User> {
    @Override
    public User call() throws Exception {
        System.out.println(this.getClass().getName() + "_当前线程id:" + Thread.currentThread().getId());
        return new User("小明","18");
    }
}
//测试
FutureTask<User> futureTask = new FutureTask<User>(new ImpCallable());
Thread t = new Thread(futureTask);
t.start();
System.out.println("线程id:" + t.getId() + ",_对象:" + futureTask.get().getClass().getName() + ",[futureTask]返回结果:" + futureTask.get().toString());
````

## 线程池工具类-Executors

```java
public static ExecutorService service = Executors.newFixedThreadPool(10);
//测试
service.execute(new ImpRunnable());
```

## 线程池-ThreadPoolExecutor
```java
ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(5,
                10,
                10,
                TimeUnit.SECONDS,
                new LinkedBlockingQueue<Runnable>(100000),
                Executors.defaultThreadFactory(),
                new ThreadPoolExecutor.AbortPolicy()
        );
```

### 参数说明

##### int corePoolSize：
核心线程数 **[5]**,除非设置 **(allowCoreThreadTimeOut-boolean),** 线程池创建,当前 **[5]** 个线程就已经就绪。

##### int maximumPoolSize:
最大线程数量 **[10]**

##### long keepAliveTime:
当线程的数量大于 **(maximumPoolSize-corePoolSize)核心线程[5]** 数量,空闲时间大于**keepAliveTime**,则释放空闲的线程。

##### TimeUnit unit:
指定时间单位。

##### workQueue:
```java
new LinkedBlockingQueue<Runnable>(100000)
```
**阻塞队列**,存放任务数据。当线程超出最大线程数**[10],**这时候不会处理任务**,**等待有空闲的线程再去处理任务。默认**int**最大值**,**最好设置默认值

##### ThreadFactory threadFactory:
线程的创建工厂。

##### RejectedExecutionHandler handler:
如果任务队列已经满了,按照指定的拒绝策略处理任务。

## CompletableFuture异步任务
### 创建异步对象
##### 无返回值
```java
public static ExecutorService service = Executors.newFixedThreadPool(10);

CompletableFuture<Void> voidCompletableFuture = CompletableFuture.runAsync(() -> {
            System.out.println(Thread.currentThread().getName() + "_当前线程id:" + Thread.currentThread().getId());
        }, service);
```

##### 有返回值

```java
CompletableFuture<User> completableFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println(Thread.currentThread().getName() + "_当前线程id:" + Thread.currentThread().getId());
            return new User("小明", "18");
        }, service);
System.out.println(completableFuture.get().toString());
```

## 成功感知-whenComplete
```java
CompletableFuture<User> completableFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println(Thread.currentThread().getName() + "_当前线程id:" + Thread.currentThread().getId());
            return new User("小明", "18");
        }, service).whenComplete((result, exception) -> {
            System.out.println("异步线程结束了:" + result.toString() + "_异常信息:" + exception);
        });
//测试
pool-1-thread-1_当前线程id:12
异步线程结束了:User{name='小明', age='18'}_异常信息:null
```
## 异常感知-exceptionally

```java
//异常情况处理
CompletableFuture<Integer> completableFutureError = CompletableFuture.supplyAsync(() -> {
            System.out.println(Thread.currentThread().getName() + "_当前线程id:" + Thread.currentThread().getId());
            int i = 1 / 0;
            return i;
        }, service).whenComplete((result, exception) -> {
            System.out.println("异步线程结束了:" + result + "_异常信息:" + exception);
        }).exceptionally(exception -> {
            //处理异常返回
            return 8;
        });
System.out.println(completableFutureError.get());
//测试
 	pool-1-thread-1_当前线程id:12
 	异步线程结束了:null_异常信息:java.util.concurrent.CompletionException: java.lang.ArithmeticException: / by zero
	8
```

## 完成处理-handle

```java
CompletableFuture<Integer> completableFutureError = CompletableFuture.supplyAsync(() -> {
            System.out.println(Thread.currentThread().getName() + "_当前线程id:" + Thread.currentThread().getId());
            int i = 1 / 0;
            return i;
        }, service).handle((result, ex) -> {
            if (result != null) {
                return result * 3;
            }
            if (ex != null) {
                return 8;
            }
            return 0;
        });
```

## 线程串行化-thenRunAsync

```java
//任务2不能接收任务1的结果 
CompletableFuture<Void> voidCompletableFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println("执行任务1");
            return 2;
        }, service).thenRunAsync(() -> {
            System.out.println("执行任务2");
        }, service);
```

## 线程串行化-thenRunAsync

```java
 CompletableFuture<Void> voidCompletableFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println("执行任务1");
            return 2;
        }, service).thenAcceptAsync((result) -> {
            System.out.println("任务1的结果:"+result);
            System.out.println("执行任务2");
        }, service);
```

## 线程串行化-thenApplyAsync

```java
CompletableFuture<Object> completableFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println("执行任务1");
            return 2;
        }, service).thenApplyAsync((result) -> {
            System.out.println("任务1的结果:" + result);
            System.out.println("执行任务2");
            return result + 8;
        }, service);

System.out.println(completableFuture.get());
//测试
10
```

### 任务组合-完成后在执行

```java
CompletableFuture<Integer> completableFuture1 = CompletableFuture.supplyAsync(() -> {
            System.out.println("执行任务1:" + 1);
            return 1;
        }, service);

CompletableFuture<Integer> completableFuture2 = CompletableFuture.supplyAsync(() -> {
            System.out.println("执行任务2:" + 2);
            return 2;
        }, service);

//组合完成后执行-无结果
completableFuture1.runAfterBothAsync(completableFuture2, () -> {
            System.out.println("执行任务3");
        }, service);

//组合完成后执行-获取任务1+任务2结果
completableFuture1.thenAcceptBothAsync(completableFuture2, (result1, result2) -> {
            int sum = result1 + result2;
            System.out.println("执行任务3=任务1+任务2:" + sum);
        }, service);

//组合完成后执行-获取任务1+任务2结果,并返回
CompletableFuture<Integer> integerCompletableFuture = completableFuture1.thenCombineAsync(completableFuture2, (result1, result2) -> {
            System.out.println("任务1:"+result1+",任务2:"+result2);
            int sum = result1 + result2 + 10;
            System.out.println("执行任务3_=任务1+任务2:" + sum);
            return sum;
        }, service);

System.out.println(integerCompletableFuture.get());
```

## 任务组合-任意一个完成执行

​		<u>注意线程数</u>

```java
 public static ExecutorService service = Executors.newFixedThreadPool(3);
```

```java
completableFuture1.runAfterEitherAsync(completableFuture2, () -> {
            System.out.println("执行任务3");
        }, service);

completableFuture1.acceptEitherAsync(completableFuture2, (res) -> {
            System.out.println("任务1或者任务2:" + res);
            System.out.println("执行任务3");
        }, service);

CompletableFuture<Integer> completableFuture3 = completableFuture1.applyToEitherAsync(completableFuture2, (res) -> {
            System.out.println("任务1或者任务2:" + res);
            System.out.println("执行任务3");
            return res;
        }, service);

System.out.println(completableFuture3.get());
```

## 多任务组合

```java
CompletableFuture<Integer> completableFuture1 = CompletableFuture.supplyAsync(() -> {
            System.out.println("执行任务1:" + 1);
            return 1;
        }, service);

CompletableFuture<Integer> completableFuture2 = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(5000);
                System.out.println("执行任务2:" + 2);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            return 2;
        }, service);

CompletableFuture<Integer> completableFuture3 = CompletableFuture.supplyAsync(() -> {
            System.out.println("执行任务3:" + 3);
            return 3;
        }, service);
```

## 全部完成执行

```java

CompletableFuture<Void> voidCompletableFuture = CompletableFuture.allOf(completableFuture1, completableFuture2, completableFuture3);
System.out.println("阻塞:" + voidCompletableFuture.get());
System.out.println("任务1:" + completableFuture1.get() + "任务2:" + completableFuture2.get() + "任务3:" + completableFuture3.get());
//测试
执行任务1:1
执行任务3:3
执行任务2:2
阻塞:null
```

## 其中一个完成执行

```java
CompletableFuture<Object> anyOf = CompletableFuture.anyOf(completableFuture1, completableFuture2, completableFuture3);
System.out.println("返回其中一个:" + anyOf.get());
//测试
返回其中一个:1
```



