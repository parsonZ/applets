Page({
  data: {
    texts: '0123456789abcdefghijklmnopqrstuvwxyz'.split(''),
    fontSize: 16,
    width: 414,
    height: 500,
    columns: null,
    drops: [],
    ctx: null
  },
  onReady(){
    this.data.ctx = wx.createCanvasContext('myCanvas', this)
    this.data.columns = Math.floor(this.data.width / this.data.fontSize)
    for (let i = 0; i < this.data.columns; i++) {
      this.data.drops[i] = i * this.data.fontSize
    }

    setInterval(() =>{
      this.drawText();
      this.data.ctx.setFillStyle('rgba(0,0,0,0.1)')
      this.data.ctx.fillRect(0,0,this.data.ctx.width, this.data.ctx.height)
    }, 100)
  },
  drawText(){
    const data = this.data;
    data.ctx.setFillStyle('#33ff33')
    data.ctx.setFontSize(data.fontSize)
    for (let i = 0; i < data.drops.length; i++) {
      let text = data.texts[Math.floor(Math.random()*data.texts.length)];
      data.ctx.fillText(text, i*data.fontSize, data.drops[i]*data.fontSize)
      if(data.drops[i] * data.fontSize > data.height && Math.random() > 0.98){
        data.drops[i] = 1
      }
      data.drops[i]++
    }
    data.ctx.draw()
  }
})