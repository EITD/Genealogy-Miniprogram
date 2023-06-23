// 云函数多张图片转成pdf 
const cloud = require('wx-server-sdk')
const { PDFDocument } = require('pdf-lib')  

cloud.init({
    env:'cloud1-5g1l0i9w74139e9d'
})

// 云函数入口函数
exports.main = async (event, context) => {
    //接收小程序端传来的图片数组
    let img_arr = event.img_arr
    //arr是用来存储fileContent的数组
    let arr = []
    //pdf的总高度，是等于数组里面的所有图片的高度之和
    let zheight = 0
    //用来存储处理过后的各个图片信息的数组
    let content_arr = []

    const doc = await PDFDocument.create()
    let page = doc.addPage()
    
    //下载图片获取fileContent，并且存入arr数组
    for (let i = 0; i < img_arr.length; i++) {
      let link = img_arr[i].imgurl
      let result = await cloud.downloadFile({
        fileID: link
      })
      arr.push(result.fileContent)          
    }

    //获取所有照片组成的高度和宽度
    for (let j = 0; j < arr.length; j++) {
            let img = await doc.embedJpg(arr[j])
            //计算图片展示的宽高，根据原有的比例和pdf的宽度来算
            let h = (img.height * 700) / img.width
            let obj = {
              img: img,
              width: 700,
              height: h,
            }
            content_arr.push(obj)
            zheight = parseInt(zheight + h)
    }

    //开始设置pdf的高度和宽度
    page.setWidth(800)
    page.setHeight(zheight)

    //prev_height用来存储排在前面的高度
    let prev_height = 0
    for (let i = 0; i < content_arr.length; i++) {
      prev_height = prev_height + content_arr[i].height
      let height = zheight - prev_height
      page.drawImage(content_arr[i].img, {
        x: 50,           //左右各间隔50
        y: height,
        width:content_arr[i].width,
        height:content_arr[i].height,
      });
    }

    const docBase64 = await doc.saveAsBase64()
    const docBuffer = Buffer.from(docBase64, 'base64');
    //表明这个pdf是存放在云存储里面带的tmp文件夹
    let fileName = 'tmp/' + parseInt(new Date().getTime() / 1000) + '.pdf';
    //开始上传到云存储
    let result = await cloud.uploadFile({ cloudPath: fileName, fileContent: docBuffer })
    let fileID = result.fileID
    //转http访问
    const fileList = await cloud.getTempFileURL({
      fileList: [fileID],
    })
    let pdf = fileList.fileList[0].tempFileURL
    return { code: 1, msg: '', data: { fileID: fileID, pdf: pdf } }
}