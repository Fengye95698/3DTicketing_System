<template>
  <div class="Etclist">
    <el-input
      placeholder="请输入内容"
      v-model="input2"
      style="width: 350px"
      @change="searchOrderInfoMed"
    >
      <template slot="append">
        <el-button slot="append" icon="el-icon-search"></el-button
      ></template>
    </el-input>

    <el-table :data="tableData" style="padding-top: 30px" v-show="!notFound">
      <el-table-column prop="id" type="index" label="Id" width="150px">
      </el-table-column>
      <el-table-column prop="order_number" width="400px" label="Order Number">
      </el-table-column>
      <!-- <el-table-column prop="username" label="下单用户"> </el-table-column> -->
      <!-- <el-table-column prop="seatList" width="300px" label="订单信息">
        <template slot-scope="scope">
          <div v-for="item in scope.row.seatList" :key="item.id">
            场次：{{ item.etc }}&nbsp;座位名称：{{
              item.seat_name
            }}&nbsp;价格：{{ item.seat_price }}
          </div>
        </template>
      </el-table-column> -->
      <el-table-column prop="total" label="Total Price"></el-table-column>
      <el-table-column prop="status" label="Order Status">
        <template slot-scope="scope">
          <el-select
            v-model="orderStatus"
            placeholder="请选择"
            @change="changeStatus(scope.$index, scope.row)"
          >
            <el-option
              v-for="item in orderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_timestamp"
        :formatter="dateFormat"
        label="Time"
      ></el-table-column>
      <el-table-column align="left" prop="operate" label="Operate">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="[]" style="padding-top: 30px" v-show="notFound">
      <el-table-column prop="id" type="index" label="Id"> </el-table-column>
      <el-table-column prop="orderNum" width="300px" label="订单编号">
      </el-table-column>
      <!-- <el-table-column prop="username" label="下单用户"> </el-table-column> -->
      <!-- <el-table-column prop="seatList" width="300px" label="订单信息">
        <template slot-scope="scope">
          <div v-for="item in scope.row.seatList" :key="item.id">
            场次：{{ item.etc }}&nbsp;座位名称：{{
              item.seat_name
            }}&nbsp;价格：{{ item.seat_price }}
          </div>
        </template>
      </el-table-column> -->
      <el-table-column prop="total" label="总金额"></el-table-column>
      <el-table-column prop="status" label="订单状态">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.status"
            placeholder="请选择"
            @change="changeStatus(scope.$index, scope.row)"
          >
            <el-option
              v-for="item in orderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        :formatter="dateFormat"
        label="下单时间"
      ></el-table-column>
      <el-table-column align="left" prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { searchOrderInfo, addOrder } from "@/requestApi/backstagePage.js";
import moment from "moment";
import {
  orderList,
  deleteOrderList,
  orderEdit,
} from "@/requestApi/OrderModule";
// import { mapState } from "vuex";
export default {
  data() {
    return {
      input2: "",
      etc: "",
      price: "",
      tableData: [],
      notFound: false,
      status: "",
      value: [],
      orderStatus: 0,
      orderOptions: [
        {
          value: 0,
          label: "Not Pay",
        },
        // {
        //   value: 1,
        //   label: "已支付",
        // },
        {
          value: 2,
          label: "Cancel",
        },
      ],
      statusName: "",
      userId: 0,
    };
  },
  mounted() {
    this.userId = localStorage.getItem("userId");
    this.orderListMed();
  },
  computed: {
    // ...mapState({
    //   orderList: (state) => state.admin.orderList,
    // }),
  },
  methods: {
    orderListMed() {
      orderList(this.userId).then((res) => {
        console.log(res);
        this.tableData = res.data.data.orders;
      });
    },
    closeDialog() {
      this.value = [];
    },
    changeStatus(index, row) {
      const options = {
        order_number: row.order_number,
      };
      orderEdit(options).then((res) => {
        if (res.data.code == 200) {
          this.orderStatus = res.data.data.status;
        }
      });
      // this.$store.dispatch("orderEdit", options).then((res) => {
      // this.$message("修改成功");
      // this.getOrderInfoMed();
      // });
    },
    handleDelete(index, row) {
      console.log(row);
      this.$confirm("此操作将永久删除该场次, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // this.getOrderInfoMed();
        let options = {
          order_number: row.order_number,
        };
        deleteOrderList(options).then((res) => {
          console.log("删除", res);
          if (res.data.code == 200) {
            this.$message("删除成功");
            this.orderListMed();
          }
        });
      });
      //   .catch(() => {});
    },
    // getOrderInfoMed() {
    //   this.$store.dispatch("getOrderList").then((res) => {
    //     this.orderList.forEach((item) => {
    //       if (item.status === 0) {
    //         item.status = "未支付";
    //       } else if (item.status === 1) {
    //         item.status = "已支付";
    //       } else {
    //         item.status = "取消";
    //       }
    //     });
    //     this.tableData = this.orderList;
    //   });
    // },
    searchOrderInfoMed() {
      if (this.input2 === "") {
        this.getOrderInfoMed();
      } else {
        let option = {
          keyword: this.input2,
        };
        // searchOrderInfo(option).then((res) => {
        //   if (res.data.data.orderList.length > 0) {
        //     res.data.data.orderList.forEach((item) => {
        //       if (item.status === 0) {
        //         item.status = "未支付";
        //       } else if (item.status === 1) {
        //         item.status = "已支付";
        //       } else {
        //         item.status = "取消";
        //       }
        //     });
        //     this.tableData = res.data.data.orderList;
        //     this.notFound = false;
        //   } else {
        //     this.notFound = true;
        //   }
        // });
      }
    },
    //时间格式化
    dateFormat: function (row, column) {
      var date = row[column.property];

      if (date == undefined) {
        return "";
      }

      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style lang="scss">
.Etclist {
  .dialog_btn {
    width: 90px;
    height: 40px;
    display: inline-block;
    color: white;
    font-size: 15px;
    background-color: rgb(80, 99, 160);
    text-align: center;
    margin-left: 40px;
  }
}
</style>
