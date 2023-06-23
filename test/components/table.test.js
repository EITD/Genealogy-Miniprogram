const simulate = require('miniprogram-simulate')
const path = require('path');

test('components/table', () => {
    const id = simulate.load(path.join(__dirname, '../../components/table/table'))
    const comp = simulate.render(id) // 渲染成自定义组件树实例

    const parent = document.createElement('parent-wrapper') // 创建父亲节点
    comp.attach(parent) // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

    const view = comp.querySelector('.table') // 获取子组件 view
    expect(window.getComputedStyle(view.dom).width).toBe('500px') // 测试渲染结果
})