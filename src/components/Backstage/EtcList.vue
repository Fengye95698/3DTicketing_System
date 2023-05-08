<template>
  <div class="Etclist">
    <!-- <el-input placeholder="请输入内容" v-model="input2" style="width: 350px">
      <template slot="append">
        <el-button slot="append" icon="el-icon-search"></el-button
      ></template>
    </el-input> -->
    <el-button type="text" @click="dialogVisible = true" class="dialog_btn"
      >Add session</el-button
    >

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :show-close="false"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-input v-model="etcName" placeholder="Enter etc name"></el-input>
      <el-input
        v-model="etcDesc"
        placeholder="Enter etc description"
        style="margin-top: 15px"
      ></el-input>
      <el-date-picker
        v-model="value"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        style="margin: 20px 0 0 0"
      >
      </el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="etcMed">OK</el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      :title="title"
      :visible.sync="editDialogVisible"
      width="50%"
      :show-close="false"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-input v-model="etcName" placeholder="Enter etc name"></el-input>
      <el-input
        v-model="etcDesc"
        placeholder="Enter etc description"
        style="margin-top: 15px"
      ></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateEtcInfoMed">OK</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData" style="padding-top: 30px" v-show="!notFound">
      <el-table-column prop="id" label="Id"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="description" label="Description">
      </el-table-column>
      <el-table-column
        prop="begin_timestamp"
        :formatter="dateFormat"
        label="beginTime"
      >
      </el-table-column>
      <el-table-column
        prop="end_timestamp"
        :formatter="dateFormat"
        label="endTime"
      ></el-table-column>
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
      <el-table-column prop="etc_name" label="场次名称"> </el-table-column>
      <el-table-column
        prop="start_time"
        :formatter="dateFormat"
        label="开始时间"
      >
      </el-table-column>
      <el-table-column
        prop="end_time"
        :formatter="dateFormat"
        label="结束时间"
      ></el-table-column>
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
import {
  getEtcInfo,
  addEtcInfo,
  updateEtcInfo,
  deleteEtcInfo,
} from "@/requestApi/etcModule";
import moment from "moment";
// import { mapState } from "vuex";
export default {
  data() {
    return {
      input2: "",
      etcName: "",
      etcDesc: "",
      etc: "",
      price: "",
      dialogVisible: false,
      editDialogVisible: false,
      tableData: [],
      notFound: false,
      status: "",
      value: [],
      title: "Add Session",
    };
  },
  mounted() {
    this.getEtcInfoMed();
  },

  methods: {
    etcMed() {
      let options = {
        name: this.etcName,
        description: this.etcDesc,
        begin_timestamp: "2023-04-29 20:00:00",
        end_timestamp: "2023-04-29 23:00:00",
      };
      addEtcInfo(options).then((res) => {
        console.log(res);
      });
    },
    getEtcInfoMed() {
      getEtcInfo().then((res) => {
        this.tableData = res.data.data.etcs;
      });
    },
    closeDialog() {
      this.etcName = "";
      this.password = "";
      this.again_password = "";
      this.value = "";
      this.title = "新增场次";
    },
    handleEdit(index, row) {
      this.editDialogVisible = true;
    },
    updateEtcInfoMed(row) {
      let options = {
        id: row.id,
        name: row.name,
        description: row.description,
        begin_timestamp: "2023-04-29 20:00:00",
        end_timestamp: "2023-04-29 23:00:00",
      };
      updateEtcInfo(options).then((res) => {
        console.log(res);
      });
    },
    handleDelete(index, row) {
      console.log(row);
      this.$confirm("此操作将永久删除该场次, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let options = {
            id: row.id,
          };
          deleteEtcInfo(options).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message("删除成功");
              this.getEtcInfoMed();
            }
          });
        })
        .catch(() => {});
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
