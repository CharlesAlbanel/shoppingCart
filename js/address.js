new Vue({
  el: '.container',
  data: {
    limitNum: 3,
    addressList: [],
    currentIndex: 0,
    shippingMethod: 1
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getAddressList();
    });
  },
  computed: {
    filterAddress: function() {
	  //^*v-for中数据过滤显示方法
      return this.addressList.slice(0, this.limitNum);
    }
  },
  methods: {
    getAddressList: function() {
	  //获取地址列表数据
      var _this = this;
      this.$http.get("data/address.json").then(function(response) {
        var res = response.data;
        if (res.status = "0") {
          _this.addressList = res.result;
        }
      });
    },
    loadMore: function() {
	  //显示更多地址选项卡
      this.limitNum = this.addressList.length;
    },
    setDefault: function(addressId) {
	  //选中地址设为默认，其余取消默认
      this.addressList.forEach(function (address, index) {
        if (address.addressId == addressId) {
          address.isDefault = true;
        }
        else {
          address.isDefault = false;
        }
      });
    }
  }
});
