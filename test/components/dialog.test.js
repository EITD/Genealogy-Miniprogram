const simulate = require('miniprogram-simulate')
const path = require('path');

test('components/dialog', async() => {
    const id = simulate.load(path.join(__dirname, '../../components/dialog/dialog'))
    const comp = simulate.render(id, { showDialog: true }) // 渲染成自定义组件树实例

    const parent = document.createElement('parent-wrapper') // 创建父亲节点
    comp.attach(parent) // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

    const view = comp.querySelector('.dialog') // 获取子组件 view
    expect(window.getComputedStyle(view.dom).width).toBe('600px') // 测试渲染结果

    const spyClose = jest.spyOn(comp.instance,"closeDialog") //监控closeDialog的函数
    const close = comp.querySelector('.close')
    close.dispatchEvent('tap') //触发关闭按钮的tap事件
    await simulate.sleep(200) // 模拟异步回调
    expect(spyClose).toHaveBeenCalled() // 断言监控到的结果
})