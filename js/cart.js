//创建一个vue实例
new Vue({
  el: '#app',
  data: {
    totalMoney: 0,
    productList: [],
    checkAllFlag: false,
    delFlag: false,
    curProduct: ''
  },
  filters: {
	//局部过滤器
    formatMoney: function(value) {
      return "¥" + value.toFixed(2);
    }

  },
  mounted: function() {
    this.$nextTick(function() {
	  //dom渲染完成时获取购物车数据
      this.cartView();
    })
  },
  methods: {
      cartView: function() {
        var _this = this;
        this.$http.get("data/cartData.json", {"id": 123}).then(function(res) {
          _this.productList = res.body.result.list;
          // _this.totalMoney =  res.body.result.totalMoney;
        });
      },
      changeMoney: function(product, way) {
		//加减按钮
        if (way > 0) {
          product.productQuantity++;
        }
        else {
          product.productQuantity--;
          if (product.productQuantity < 1) {
            product.productQuantity = 1;
          }
        }
        this.calcTotalPrice();

      },
      selectedProduct: function(item) {
		//单选
        if (typeof item.checked == 'undefined') {
		  //设置添加变量
          // Vue.set(item, "checked", true);//全局注册
          this.$set(item, "checked", true);//局部注册
        }
        else {
          item.checked = !item.checked;
        }
        this.calcTotalPrice();
      },
      checkAll: function(flag) {
		//全选和取消
        this.checkAllFlag = flag;
        var _this = this;
        this.productList.forEach(function (item, index) {
          if (typeof item.checked == 'undefined', _this.checkAllFlag) {
            _this.$set(item, "checked", _this.checkAllFlag);
          }
          else {
            item.checked = _this.checkAllFlag;
          }
        });
        this.calcTotalPrice();
      },
      calcTotalPrice: function() {
		//遍历选中项计算总价
        var _this = this;
        this.totalMoney = 0;//累加前清零
        this.productList.forEach(function(item, index) {
          if (item.checked) {
            _this.totalMoney += item.productPrice * item.productQuantity;
          }
        });
      },
      delConfirm: function(item) {
		//点击删除按钮
        this.delFlag = true;
        this.curProduct = item;
      },
      delProduct: function() {
		//删除购物车中的商品
        var index = this.productList.indexOf(this.curProduct);
        this.productList.splice(index, 1);
        this.delFlag = false;
      }
    }
});
// 全局过滤器
Vue.filter('money', function(value, type) {
  return "¥" + value.toFixed(2) + type;
})
