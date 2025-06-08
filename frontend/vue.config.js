const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports={
  devServer:{
    proxy:{ //proxyTable 설정
      '/api':{  //api로 시작하는 소스는 target으로 잡아준다 > 사용할 때 url이 api가 있어야 한다.
        target: "http://localhost:3000",
      }
    }
  }
}