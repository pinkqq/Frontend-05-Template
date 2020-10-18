###地图编辑器

- 功能分析

  1. 绘制画板
  2. 鼠标按下左键时绘制：mousedown\e.which===1
  3. 鼠标按下右键时清除（禁止菜单弹出）：window.oncontextmenu
  4. 可以保存（localstorage）
  5. 广度优先搜索：使用队列先进先出的特点，逐层寻找目标点。
  6. 路径：一张记录 pre 的表格
  7. 寻找最优路径：启发式搜索 A\*
  8. 优化 A\*：修改读取 queue 逻辑

#####拓展知识点

- 数组实现栈和队列

  1. stack 栈（后进先出）：push+pop，unshift+shift(性能低)
  2. queue 队列（先进先出）：push+shift，unshift+pop
     <br>

- 寻路

  1. 广度优先搜索：队列
  2. 深度优先搜索：栈
  3. 启发式寻路：A\*
     <br>

- 数组的浅拷贝与深拷贝

  - 浅拷贝：“=”赋值
  - 深拷贝
    1. arr2 = arr1.slice()
    2. arr2 = arr1.concat()
    3. [...arr2] = arr1
    4. 扩展运算符、slice 和 concat 的局限性：仅适用于不包含对象的一维数组的深拷贝。
    5. arr2 = JSON.parse(JSON.stringify(arr1))

  <br>

- 乘方运算符：x\*\*2 ( x 的 2 次方 )
  <be>
- 二叉堆：todo
