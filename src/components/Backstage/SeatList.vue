<template>
  <div class="Seatlist">
    <el-input
      placeholder="Please enter the content"
      v-model="input2"
      style="width: 350px"
      @change="searchSeatInfoMed"
    >
      <template slot="append">
        <el-button slot="append" icon="el-icon-search"></el-button
      ></template>
    </el-input>
    <!-- <el-button type="text" @click="dialogVisible = true" class="dialog_btn"
      >Add Seats</el-button
    > -->

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :show-close="false"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-input
        v-model="seatName"
        placeholder="Please enter the seat name"
      ></el-input>
      <!-- <el-select
        v-model="etc"
        placeholder="Please set the ETC"
        style="margin: 20px 0 0 0"
        @change="changeEtc"
      >
        <el-option
          v-for="item in etcOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->
      <el-input
        v-model="price"
        placeholder="Please enter the price"
        type="number"
        style="margin: 20px 0 0 0"
      ></el-input>
      <el-select
        v-model="status"
        placeholder="Please set the status"
        style="margin: 20px 0 0 0"
      >
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="seatMed">OK</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData" style="padding-top: 30px" v-show="!notFound">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <!-- <el-table-column prop="etc_name" label="场次名称"> </el-table-column> -->
      <el-table-column prop="price" label="Price"> </el-table-column>
      <el-table-column prop="status" label="Status"></el-table-column>
      <el-table-column align="left" prop="operate" label="Operate">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
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
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="seat_name" label="Name"> </el-table-column>
      <el-table-column prop="etc_name" label="场次名称"> </el-table-column>
      <el-table-column prop="seat_price" label="￥价格"> </el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column align="left" prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import {
//   searchSeatInfo,
// } from "@/requestApi/backstagePage.js";
// import { mapState } from 'vuex'
import { getSeatInfo, alterSeatInfo } from "@/requestApi/seatModule";
export default {
  data() {
    return {
      input2: "",
      seatName: "",
      etc: "",
      etc_id: null,
      price: "",
      dialogVisible: false,
      tableData: [],
      notFound: false,
      statusOptions: [
        {
          value: 0,
          label: "unsold",
        },
        {
          value: 1,
          label: "Sold out",
        },
        {
          value: 2,
          label: "locked",
        },
      ],
      etcOptions: [],
      status: null,
      title: "Seats Modification",
      seatInfo: {},
    };
  },
  mounted() {
    this.getSeatInfoMed();
  },

  methods: {
    closeDialog() {
      this.seatName = "";
      this.etc = "";
      this.price = "";
      this.status = null;
      this.title = "Seats Modification";
    },
    changeEtc(selected) {
      this.etcOptions.forEach((item, index) => {
        if (index === selected) {
          this.etc_id = item.id;
        }
      });
    },
    handleEdit(index, row) {
      // this.$store.dispatch("getSeatInfo", { seat_id: row.id }).then((res) => {
      //   this.title = "修改座位";
      //   this.seatName = this.seatInfo.seat_name;
      //   this.price = this.seatInfo.seat_price;
      //   this.status = this.statusOptions[this.seatInfo.status].label;
      //   this.etcOptions.forEach((item) => {
      //     if (item.id === this.seatInfo.etc_id) {
      //       this.etc = item.label;
      //       this.etc_id = item.id;
      //     }
      //   });
      console.log(row);
      this.seatInfo = { ...row };
      this.seatName = row.name;
      this.price = row.price;
      this.status = row.status;
      this.dialogVisible = true;
      // });
    },
    handleDelete(index, row) {
      this.$confirm(
        "This operation will permanently delete the seat, whether to continue?",
        "Tips",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.$store.dispatch("deleteSeat", row.id).then((res) => {
            this.$message("Delete successfully");
            this.getSeatInfoMed();
          });
        })
        .catch(() => {});
    },
    getSeatInfoMed() {
      getSeatInfo().then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.tableData = res.data.data.seats;
        }
      });
    },
    seatMed() {
      this.editSeatMed();
    },
    addSeatMed() {
      console.log();
      if (
        this.seatName &&
        this.etcOptions[this.etc].id &&
        this.price &&
        this.status !== null
      ) {
        let options = {
          etc_id: this.etcOptions[this.etc].id,
          seat_name: this.seatName,
          seat_price: this.price,
          status: this.status,
        };
        this.$store.dispatch("seatAdd", options).then((res) => {
          this.$message("添加座位成功");
          this.dialogVisible = false;
          this.getSeatInfoMed();
        });
      } else {
        this.$message({
          message: "输入座位名称、场次、价格及状态不能为空",
          type: "warning",
        });
      }
    },
    editSeatMed() {
      let status = 0;
      if (this.status === "未售出" || this.status === 0) {
        status = 0;
      } else if (this.status === "已售出" || this.status === 1) {
        status = 1;
      } else {
        status = 2;
      }

      let options = {
        id: this.seatInfo.id,
        name: this.seatName,
        type: "VVIP",
        price: this.price,
        status: status,
      };
      alterSeatInfo(options)
        .then((res) => {
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.getSeatInfoMed();
            this.$message("Edit Successfully");
          }
        })
        .catch(() => {
          this.$message("Please don't leave anything blank");
        });
      // this.$store.dispatch("seatEdit", options).then((res) => {
      //   this.$message("修改座位成功");
      //   this.dialogVisible = false;
      //   this.getSeatInfoMed();
      // });
    },
    searchSeatInfoMed() {
      if (this.input2 === "") {
        this.getSeatInfoMed();
      } else {
        let option = {
          keyword: this.input2,
        };
        // searchSeatInfo(option).then((res) => {
        //   if (res.data.data.seatList.length > 0) {
        //     res.data.data.seatList.forEach((item) => {
        //       if (item.status === 0) {
        //         item.status = "未售出";
        //       } else if (item.status === 1) {
        //         item.status = "已售出";
        //       } else {
        //         item.status = "已锁定";
        //       }
        //       this.etcList.forEach((etc) => {
        //         if (item.etc_id === etc.id) {
        //           item.etc_name = etc.etc_name;
        //         }
        //       });
        //     });
        //     this.tableData = res.data.data.seatList;
        //     this.notFound = false;
        //   } else {
        //     this.notFound = true;
        //   }
        // });
      }
    },
  },
};
</script>

<style lang="scss">
.Seatlist {
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
